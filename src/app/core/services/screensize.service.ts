import { computed, Injectable, signal } from '@angular/core';
import { IDeviceSize } from '../interfaces/device.size';
import { SCREEN_SIZE } from '../enums/screensize.enum';
import { fromEvent, Observable, merge, Subject } from "rxjs";
import { debounceTime, map, startWith, tap } from "rxjs/operators";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ScreensizeService {
    //state
  private state = signal<IDeviceSize>({
      size: '',
      innerHeight: '',
      innerWidth: ''
  });

  //selector
  size = computed(() => this.state().size);
  innerHeight = computed(() => this.state().innerHeight);
  innerWidth = computed(() => this.state().innerWidth);

  //sources
  setScreenSizeState$ = new Subject<IDeviceSize>();

  constructor() {
    //reducers
    this.setScreenSizeState$.pipe(takeUntilDestroyed()).subscribe((data: IDeviceSize) => {
      this.state.update((state) => ({
        ...state,
        size: data.size,
        innerHeight: data.innerHeight,
        innerWidth: data.innerWidth
      }))
    })
  }

	public getDeviceSize(): void {
		let screenDetailsResizing$: Observable<IDeviceSize> =
			this.getScreenSizeWhenResizing();
		let screenDetailsLoading$: Observable<IDeviceSize> =
			this.getScreenSizeWhenLoaded();
		merge(screenDetailsResizing$, screenDetailsLoading$).subscribe(
			(data: IDeviceSize) => {
        //console.log(data);
				this.setScreenSizeState$.next(data)
			}
		);
	}

	private getScreenSizeWhenLoaded(): Observable<IDeviceSize> {
		return fromEvent(window, "load").pipe(
			debounceTime(200),
			startWith(null),
			map(() => this.calculateScreenSize())
		);
	}

	private getScreenSizeWhenResizing(): Observable<IDeviceSize> {
		return fromEvent(window, "resize").pipe(
			debounceTime(200),
			startWith(null),
			map(() => this.calculateScreenSize())
		);
	}

  // Small devices such as large phones (640px and up)
  // @media only screen and (min-width: 640px) {...}

  // Medium devices such as tablets (768px and up)
  // @media only screen and (min-width: 768px) {...}

  // Large devices such as laptops (1024px and up)
  // @media only screen and (min-width: 1024px) {...}

  // Largest devices such as desktops (1280px and up)
  // @media only screen and (min-width: 1280px) {...}

	private calculateScreenSize(): IDeviceSize {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;
		if (screenWidth < 640) {
			return {
					size: SCREEN_SIZE.Mobile,
					innerWidth: screenWidth + "px",
					innerHeight: screenHeight + "px",
			};
		} else if (screenWidth < 768) {
			return {
					size: SCREEN_SIZE.Tablet,
					innerWidth: screenWidth + "px",
					innerHeight: screenHeight + "px",
			};
		} else if (screenWidth < 1024) {
			return {
					size: SCREEN_SIZE.Laptop,
					innerWidth: screenWidth + "px",
					innerHeight: screenHeight + "px",
			};
		} else {
			return {
					size: SCREEN_SIZE.Desktop,
					innerWidth: screenWidth + "px",
					innerHeight: screenHeight + "px",
			};
		}
	}
}
