import { Component, computed, inject } from '@angular/core';
import { ScreensizeService } from '../../core/services/screensize.service';

@Component({
  selector: 'app-visor-header',
  imports: [],
  templateUrl: './visor-header.html',
  styleUrl: './visor-header.scss',
})
export class VisorHeader {
  screenSizeService = inject(ScreensizeService);

  sizeState = computed(() => this.screenSizeService.size())

  constructor() {
    console.log(this.sizeState());

  }
}
