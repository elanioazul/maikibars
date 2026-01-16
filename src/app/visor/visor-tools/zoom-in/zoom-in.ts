import { Component, inject } from '@angular/core';
import { Tool } from '../warehouse/tool/tool';
import { MapService } from 'src/app/core/services/map.service';

@Component({
  selector: 'app-zoom-in',
  imports: [],
  template: '',
  styleUrl: './zoom-in.scss',
})
export class ZoomIn extends Tool {
  mapService = inject(MapService);

  override onClick(): void {
    this.mapService.map?.zoomTo(this.mapService.map?.getZoom() + 1)
  }

}
