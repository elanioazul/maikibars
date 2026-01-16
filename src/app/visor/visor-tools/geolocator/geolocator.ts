import { Component, inject, signal } from '@angular/core';
import { Tool } from '../warehouse/tool/tool';
import { MapService } from 'src/app/core/services/map.service';
import { Marker } from 'maplibre-gl';

@Component({
  selector: 'app-geolocator',
  imports: [],
  template: '',
  styleUrl: './geolocator.scss',
})
export class Geolocator extends Tool {
  mapService = inject(MapService);

  isLocating = signal(false);

  override onClick(): void {
    if (!navigator.geolocation) {
          console.error('Geolocation is not supported by your browser');
          return;
    }

    this.isLocating.set(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;

        this.mapService.map?.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          essential: true
        });

        new Marker({ color: '#3495eb' })
          .setLngLat([longitude, latitude])
          .addTo(this.mapService.map!);

        this.isLocating.set(false);
      },
      (error) => {
        console.error('Error obtaining location', error);
        this.isLocating.set(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }
}
