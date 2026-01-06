import { httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { FeatureCollection, Position } from 'geojson';


@Injectable({
  providedIn: 'root',
})
export class LocationService {

  private readonly geojsonPath = 'assets/data/maikibars.geojson';
  //Resource signal
  readonly maikibarsResource = httpResource<FeatureCollection>(() => this.geojsonPath);

  readonly bars = this.maikibarsResource.value;
  readonly isLoading = this.maikibarsResource.isLoading;
  readonly error = this.maikibarsResource.error;
  readonly barsFeatures = computed(() => this.bars()?.features ?? []);

  // readonly mapTarget = signal<[number, number] | null>(null);
  // setTarget(coords: [number, number]) {
  //   this.mapTarget.set(coords);
  // }
}
