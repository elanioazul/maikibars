import { Component, effect, inject} from '@angular/core';
import {  ScreenSizeStore } from '../../core/store/screensize.state';
import { CommonModule } from '@angular/common';


import { Feature, Point } from 'geojson';
import { FlayingFeatureStore } from '../../core/store/flyingFeature.state';
import { VisorSearcher } from '../visor-searcher/visor-searcher';

@Component({
  selector: 'app-visor-header',
  imports: [CommonModule, VisorSearcher],
  templateUrl: './visor-header.html',
  styleUrl: './visor-header.scss',
})
export class VisorHeader {
  readonly screenStore = inject(ScreenSizeStore);
  readonly flyingFeatureStore = inject(FlayingFeatureStore);

  constructor() {
    effect(() => {
      console.log('Reactive log:', this.screenStore.size());
    });
  }

  onBarSelected(bar: Feature<Point>): void {
    this.flyingFeatureStore.handleFeatureClick(bar as Feature<Point>);
  }

}
