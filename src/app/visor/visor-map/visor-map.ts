import { Component } from '@angular/core';
import maplibregl, {
  Map,
  MapOptions,
  StyleSpecification,
  VideoSource,
} from 'maplibre-gl';


const icon = 'assets/map-pin-plus-inside.png';
const geojson = 'assets/data/osm_cafe.geojson';

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

      this.map.addSource('maikibars-source', {
        type: 'geojson',
        data:geojson
      })

      this.map.addLayer({
        'id': 'maikibars-layer',
        'type': 'symbol',
        'source': 'maikibars-source',
        'layout': {
          'icon-image': 'custom-marker'
        }
      })
    })
  }
}
