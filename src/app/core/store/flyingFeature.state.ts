import { inject, computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { LocationService } from './../services/location.service';
import { Feature, Point, Position } from 'geojson';

export const FlayingFeatureStore = signalStore(
  { providedIn: 'root' },
  withState({
    currentIndex: -1,
  }),
  withComputed((state) => {
    const locationService = inject(LocationService);
    const bars = locationService.barsFeatures;

    return {
      selectedBar: computed(() => {
        const idx = state.currentIndex();
        return idx !== -1 ? bars()[idx] : null;
      }),
      hasPrevious: computed(() => state.currentIndex() > 0),
      hasNext: computed(() => state.currentIndex() < bars().length - 1),
    };
  }),
  withMethods((state) => {
    const locationService = inject(LocationService);

    return {
      // index determined by coords coincidence in the original geojson array
      handleFeatureClick(clickedFeature: Feature<Point>) {
        const allBars = locationService.barsFeatures();

        const index = allBars.findIndex((bar: any) =>
          bar.properties.name === clickedFeature.properties?.['name']
        );

        if (index !== -1) {
          patchState(state, { currentIndex: index });
        }
      },
      next() {
        if (state.currentIndex() < locationService.barsFeatures().length - 1) {
          patchState(state, { currentIndex: state.currentIndex() + 1 });
        }
      },
      previous() {
        if (state.currentIndex() > 0) {
          patchState(state, { currentIndex: state.currentIndex() - 1 });
        }
      },
      close() {
        patchState(state, { currentIndex: -1 });
      }
    };
  })
);
