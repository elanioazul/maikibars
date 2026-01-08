import { Component, inject } from '@angular/core';
import { VisorHeader } from './visor-header/visor-header';
import { VisorMap } from './visor-map/visor-map';
import { VisorCard } from './visor-card/visor-card';
import { ScreenSizeStore } from '../core/store/screensize.state';
import { VisorSearcher } from './visor-searcher/visor-searcher';
import { FlayingFeatureStore } from '../core/store/flyingFeature.state';
import { Feature, Point } from 'geojson';

@Component({
  selector: 'app-visor',
  imports: [VisorMap, VisorHeader, VisorCard, VisorSearcher],
  templateUrl: './visor.html',
  styleUrl: './visor.scss',
})
export class Visor {
  readonly screenStore = inject(ScreenSizeStore);
  readonly flyingFeatureStore = inject(FlayingFeatureStore);

  constructor() {}

  onBarSelected(bar: Feature<Point>): void {
    this.flyingFeatureStore.handleFeatureClick(bar as Feature<Point>);
  }
}
