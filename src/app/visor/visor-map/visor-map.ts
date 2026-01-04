import { Component, effect, inject } from '@angular/core';
import maplibregl, {
  GeoJSONSource,
  Map,
  MapOptions,
  StyleSpecification,
  VideoSource,
} from 'maplibre-gl';
import { LocationService } from '../../core/services/location-service.service';


const icon = 'assets/map-pin-plus-inside.png';

@Component({
  selector: 'app-visor-map',
  imports: [],
  templateUrl: './visor-map.html',
  styleUrl: './visor-map.scss',
})
export class VisorMap {

  readonly locationsService = inject(LocationService);

  constructor() {
    effect(() => {
      const data = this.locationsService.bars();
      if (data && this.map && this.map.isStyleLoaded()) {
        const source = this.map.getSource('maikibars-source') as GeoJSONSource;
        if (source) {
          source.setData(data);
        }
      }
    })
  }

  private map!: Map;
  style: StyleSpecification = {
    version: 8,
    name: 'some style',
    zoom: 13.5,
    center: [-80.846, 35.223],
    glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap Contributors',
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm',
      }
    ]
  };

  ngAfterViewInit(): void {
    this.map = new Map({
      container: 'map',
      style: this.style,
      zoom: 14,
      minZoom: 0,
      maxZoom: 23,
      pitch: 0,
      bearing: 0,
      maxPitch: 85,
      center: [-3.702993, 40.405459],
      hash: false,
      attributionControl: false,
    });
    this.map.on('load', async () => {
      const image = await this.map.loadImage(icon);
      this.map.addImage('custom-marker', image.data);

      // 2. Add Empty Source
      this.map.addSource('maikibars-source', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      // 3. Add Layer
      this.map.addLayer({
        'id': 'maikibars-layer',
        'type': 'symbol',
        'source': 'maikibars-source',
        'layout': {
          'icon-image': 'custom-marker',
          'icon-size': 1,
          'icon-allow-overlap': true
        }
      })

      // 4. Force a data sync in case the Service already had data loaded
      const currentData = this.locationsService.bars();
      if (currentData) {
        (this.map.getSource('maikibars-source') as GeoJSONSource).setData(currentData);
      }
    })
  }
}
