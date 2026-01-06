import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ScreenSizeStore } from '../../core/store/screensize.state';
import { FlayingFeatureStore } from '../../core/store/flyingFeature.state';
import { MapService } from '../../core/services/map.service';
@Component({
  selector: 'app-visor-card',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './visor-card.html',
  styleUrl: './visor-card.scss',
})
export class VisorCard {
  readonly screenStore = inject(ScreenSizeStore);
  readonly mapService = inject(MapService);
  readonly flayingFeatureStore = inject(FlayingFeatureStore);

  constructor() {}

  closeCard(): void {
    this.flayingFeatureStore.close()
    setTimeout(() => {
      this.mapService.clearPulse();
    },1000)
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }
}
