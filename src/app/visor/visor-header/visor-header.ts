import { Component, effect, inject } from '@angular/core';
import {  ScreenSizeStore } from '../../core/store/screensize.state';

@Component({
  selector: 'app-visor-header',
  imports: [],
  templateUrl: './visor-header.html',
  styleUrl: './visor-header.scss',
})
export class VisorHeader {
  readonly screenStore = inject(ScreenSizeStore);

  constructor() {
    console.log(this.screenStore.isMobile());
    effect(() => {
      console.log('Reactive log:', this.screenStore.size());

      if (this.screenStore.isMobile()) {
        console.log('eeeee, effect => this.doSomethingForMobile();');

      }
    });
  }
}
