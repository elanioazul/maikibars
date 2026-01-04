import { Component } from '@angular/core';
import maplibregl, {
  Map,
  MapOptions,
  StyleSpecification,
  VideoSource,
} from 'maplibre-gl';
@Component({
  selector: 'app-visor-map',
  imports: [],
  templateUrl: './visor-map.html',
  styleUrl: './visor-map.scss',
})
export class VisorMap {

  constructor() {}

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
      zoom: 8,
      minZoom: 0,
      maxZoom: 23,
      pitch: 0,
      bearing: 0,
      maxPitch: 85,
      center: [-3.97300533, 40.79907993],
      hash: false,
      attributionControl: false,
    });
  }
}
