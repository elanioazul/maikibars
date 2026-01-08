import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { SCREEN_SIZE } from '../enums/screensize.enum';
import { fromEvent,  merge, pipe } from "rxjs";
import { debounceTime, map,  tap } from "rxjs/operators";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';

export interface ScreenState {
  size: SCREEN_SIZE;
  innerHeight: string;
  innerWidth: string;
}

const initialState: ScreenState = {
  size: SCREEN_SIZE.Desktop,
  innerHeight: '0px',
  innerWidth: '0px',
};

export const ScreenSizeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  // 1. Selectors (Computed Signals)
  withComputed(({ size, innerWidth }) => ({
    isMobile: computed(() => size() === SCREEN_SIZE.Mobile),
    isTablet: computed(() => size() === SCREEN_SIZE.Tablet),
    isDesktop: computed(() => size() === SCREEN_SIZE.Desktop),
  })),

  // 2. Methods & Side Effects
  withMethods((store) => {
    // Helper to calculate size logic
    const calculateScreenSize = (): ScreenState => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let size = SCREEN_SIZE.Desktop;

      if (width < 640) size = SCREEN_SIZE.Mobile;
      else if (width < 768) size = SCREEN_SIZE.Tablet;
      else if (width < 1024) size = SCREEN_SIZE.Laptop;

      return {
        size,
        innerWidth: `${width}px`,
        innerHeight: `${height}px`,
      };
    };

    return {
      // rxMethod bridges RxJS streams to the Signal Store
      _listenToResize: rxMethod<unknown>(
        pipe(
          debounceTime(200),
          map(() => calculateScreenSize()),
          tap((newState) => patchState(store, newState))
        )
      ),
      // Manual update if ever needed
      updateSize: () => patchState(store, calculateScreenSize())
    };
  }),

  // 3. Lifecycle Hooks
  withHooks({
    onInit(store) {
      const platformId = inject(PLATFORM_ID);

      // Only run on the browser to avoid SSR errors
      if (isPlatformBrowser(platformId)) {
        // Initial calculation
        store.updateSize();

        // Connect the window events to our rxMethod
        const resize$ = fromEvent(window, 'resize');
        const load$ = fromEvent(window, 'load');

        store._listenToResize(merge(resize$, load$));
      }
    },
  })
)
