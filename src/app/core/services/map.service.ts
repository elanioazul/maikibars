import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import maplibregl, {
  GeoJSONSource,
  Map,
  MapOptions,
  StyleSpecification,
  VideoSource,
} from 'maplibre-gl';
import { Feature, Point, Position } from 'geojson';
import { FlayingFeatureStore } from '../store/flyingFeature.state';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  readonly flyingFeatureStore = inject(FlayingFeatureStore);
  //public map: WritableSignal<Map | null> = signal<Map | null>(null);
  public map: null | Map = null;

  constructor() {}

  createMap(container: HTMLElement, options?: Partial<MapOptions>): Map {
    if (!container) {
      throw new Error('MapService.create: container HTMLElement is required');
    }

    const existing = this.map;;
    if (existing) return existing;

    const mapOptions: MapOptions = {
      container,
      style: options?.style ?? 'https://demotiles.maplibre.org/style.json',
      center: (options?.center as [number, number]) ?? [0, 0],
      zoom: (options?.zoom as number) ?? 2,
      ...options,
    };

    this.map = new Map(mapOptions);

    return this.map;
  }

  pointerManagement(): void {
    this.map!.on('mouseenter', 'maikibars-layer', () => {
      this.map!.getCanvas().style.cursor = 'pointer';
    });
    this.map!.on('mouseleave', 'maikibars-layer', () => {
      this.map!.getCanvas().style.cursor = '';
    });
  }

  clickManagement(): void {
    this.map!.on('click', 'maikibars-layer', (e) => {
      if (e.features && e.features.length > 0) {
        // MapLibre returns features as a special internal type,
        // cast to GeoJSON Feature

        const clickedFeature = e.features[0] as unknown as Feature<Point>;
        this.flyingFeatureStore.handleFeatureClick(clickedFeature);
      }
    });
  }

  flyTo(coords: [number, number]): void {
    this.map!.flyTo({
      center: coords,
      zoom: 15,
      essential: true,
      padding: { top: 100 },

      //bearing: 45,
      pitch: 20,
      speed: 0.5
    });
  }

}
