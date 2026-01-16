import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import maplibregl, {
  GeoJSONSource,
  Map,
  MapOptions,
  StyleSpecification,
  VideoSource,
} from 'maplibre-gl';
import { LocationService } from '../../core/services/location.service';
import { MapService } from '../../core/services/map.service';
import * as pinkyStyle from '../../core/consts/pink-style.json';
import { FlayingFeatureStore } from '../../core/store/flyingFeature.state';
import { pulsingDot } from '../../core/consts/dotPulse';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';


const icon = 'assets/gps.png';
const style = {
  "version": 8,
  //"glyphs": 'https://api.mapbox.com/fonts/v1/{fontstack}/{range}.pbf', // Mapbox font endpoint
  "glyphs": 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf', // openmaptiles/fonts  endpoint
  "sources": {
    "osm": {
        "type": "raster",
        "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        "tileSize": 256,
        "attribution": "&copy; OpenStreetMap Contributors",
        "maxzoom": 19
    }
  },
  "layers": [
    {
      "id": "osm",
      "type": "raster",
      "source": "osm" // This must match the source key above
    }
  ]
};

@Component({
  selector: 'app-visor-map',
  imports: [],
  templateUrl: './visor-map.html',
  styleUrl: './visor-map.scss',
})
export class VisorMap implements OnDestroy, AfterViewInit {

  @ViewChild('map', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;

  readonly locationsService = inject(LocationService);
  readonly flyingFeatureStore = inject(FlayingFeatureStore);
  readonly mapService = inject(MapService);

  constructor() {
    effect(() => {
      //carga de data a la source creada when load event
      const data = this.locationsService.bars();
      if (data && this.mapService.map && this.mapService.map.isStyleLoaded()) {
        const source = this.mapService.map.getSource('maikibars-source') as GeoJSONSource;
        if (source) {
          source.setData(data);
        }
      }
    })
    effect(() => {
      const bar = this.flyingFeatureStore.selectedBar();
      if (bar && this.mapService.map!) {
        if (bar.geometry.type === 'Point') {
          const coords = bar.geometry.coordinates as [number, number];
          this.mapService.flyTo(coords as [number, number]);
          this.mapService.addPulseToBarSelected(bar);
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.mapService.createMap(this.mapContainer.nativeElement, {
      style: pinkyStyle as unknown as StyleSpecification,
      center: [-3.701188, 40.402187],
      zoom: 14,
      minZoom: 0,
      maxZoom: 23,
      pitch: 0,
      bearing: 0,
      maxPitch: 85,
      hash: false,
      attributionControl: false,
    });

    this.mapService.map!.on('load', async () => {
      const image = await this.mapService.map!.loadImage(icon);
      this.mapService.map!.addImage('custom-marker', image.data);

      // 2. Add Empty Source
      this.mapService.map!.addSource('maikibars-source', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      // 3. Add Layer
      this.mapService.map!.addLayer({
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
        (this.mapService.map!.getSource('maikibars-source') as GeoJSONSource).setData(currentData);
      }

      this.mapService.map!.addImage('pulsing-dot', pulsingDot as any);

      // 3. Setup the layer to use it
      this.mapService.map!.addSource('selected-bar-source', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      this.mapService.map!.addLayer({
        id: 'selected-bar-pulse',
        type: 'symbol',
        source: 'selected-bar-source',
        layout: {
          'icon-image': 'pulsing-dot',
          'icon-allow-overlap': true
        }
      }, 'maikibars-layer'); // Place it BELOW maikibars markers

    })

    this.mapService.pointerManagement();
    this.mapService.clickManagement();
  }

  ngOnDestroy(): void {
    this.mapService.map!.remove();
  }
}
