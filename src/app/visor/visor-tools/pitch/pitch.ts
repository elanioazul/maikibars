import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Tool } from '../warehouse/tool/tool';
import { MapService } from 'src/app/core/services/map.service';

@Component({
  selector: 'app-pitch',
  imports: [],
  template: '',
  styleUrl: './pitch.scss',
})
export class Pitch extends Tool implements OnInit {
  private mapService = inject(MapService);

  ngOnInit(): void {
    const map = this.mapService.map!
    if (!map) return;

    map.on('rotate', () => {
      this.bearing.set(map.getBearing())
    });
    map.on('pitch', () => {
      this.pitch.set(map.getPitch())
    });
  }

  override onClick(): void {
    this.mapService.map?.easeTo({
          bearing: 0,
          pitch: 0,
          duration: 1000
        });
    
  }
}
