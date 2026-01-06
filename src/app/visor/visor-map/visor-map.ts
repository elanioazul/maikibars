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
import { style } from '../../core/consts/map-style';
import { FlayingFeatureStore } from '../../core/store/flyingFeature.state';


const icon = 'assets/map-pin-plus-inside.png';

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
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.mapService.createMap(this.mapContainer.nativeElement, {
      style: style,
      center: [-3.702993, 40.405459],
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
    })

    this.mapService.pointerManagement();
    this.mapService.clickManagement();
  }

  ngOnDestroy(): void {
    this.mapService.map!.remove();
  }
}
