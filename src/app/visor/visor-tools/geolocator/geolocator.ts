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

        new Marker({ color: '#3495eb', draggable: false })
          .setLngLat([longitude, latitude])
          .addTo(this.mapService.map!);

        this.messageEvent.emit(false);
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
}
