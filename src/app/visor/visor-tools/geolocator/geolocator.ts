import { Component, inject, signal } from '@angular/core';
import { Tool } from '../warehouse/tool/tool';
import { MapService } from 'src/app/core/services/map.service';
import { circle } from "@turf/circle";
import { Units } from "@turf/helpers";
import { timeout } from 'rxjs';
@Component({
  selector: 'app-geolocator',
  imports: [],
  template: '',
  styleUrl: './geolocator.scss',
})
export class Geolocator extends Tool {
  mapService = inject(MapService);

  override onClick(): void {
    if (!navigator.geolocation) {
          console.error('Geolocation is not supported by your browser');
          return;
    }

    this.messageEvent.emit(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;

        this.mapService.map?.flyTo({
          center: [longitude, latitude],
          zoom: 19,
          essential: true
        });

        const radius = 3; // meters
        const options: { steps: number; units: Units } = {
            steps: 64,
            units: 'meters'
        };

        this.addCircleLyr(circle([longitude, latitude], radius, options))

        this.messageEvent.emit(false);
        setTimeout(() => {
          this.mapService.map?.removeLayer('location-radius')
          this.mapService.map?.removeLayer('location-radius-outline')
          this.mapService.map?.removeSource('location')
        }, 8000)
      },
      (error) => {
        console.error('Error obtaining location', error);
        this.messageEvent.emit(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  addCircleLyr(circle: any): void {
    this.mapService.map?.addSource('location', {
        type: 'geojson',
        data: circle
    });

    this.mapService.map?.addLayer({
        id: 'location-radius',
        type: 'fill',
        source: 'location',
        paint: {
            'fill-color': '#8CCFFF',
            'fill-opacity': 0.5
        }
    });

    this.mapService.map?.addLayer({
        id: 'location-radius-outline',
        type: 'line',
        source: 'location',
        paint: {
            'line-color': '#0094ff',
            'line-width': 3
        }
    });
  }
}
