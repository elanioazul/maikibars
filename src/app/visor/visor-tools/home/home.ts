import { Component, inject } from '@angular/core';
import { Tool } from '../warehouse/tool/tool';
import { MapService } from 'src/app/core/services/map.service';
import { LngLatLike } from 'maplibre-gl';

@Component({
  selector: 'app-home',
  imports: [],
  template: '',
  styleUrl: './home.scss',
})
export class Home extends Tool {
  mapService = inject(MapService);

  maikiHouse: LngLatLike = [-3.701102, 40.402237];

  override onClick(): void {
    this.mapService.map?.flyTo({
      center: this.maikiHouse,
      zoom: 19,
      essential: true
    })
  }

}
