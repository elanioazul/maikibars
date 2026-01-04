import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureCollection } from 'geojson';


@Injectable({
  providedIn: 'root',
})
export class LocationService {

  private readonly geojsonPath = 'assets/data/maikibars.geojson';


  // This creates a Resource signal
  readonly maikibarsResource = httpResource<FeatureCollection>(() => this.geojsonPath);

  readonly bars = this.maikibarsResource.value;
  readonly isLoading = this.maikibarsResource.isLoading;
  readonly error = this.maikibarsResource.error;
}
