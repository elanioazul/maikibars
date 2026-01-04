import { Component, inject } from '@angular/core';
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

  }
}
