import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ScreenSizeStore } from '../../core/store/screensize.state';
import { FlayingFeatureStore } from '../../core/store/flyingFeature.state';
@Component({
  selector: 'app-visor-card',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './visor-card.html',
  styleUrl: './visor-card.scss',
})
export class VisorCard {
  readonly screenStore = inject(ScreenSizeStore);
  readonly flayingFeatureStore = inject(FlayingFeatureStore);
}
