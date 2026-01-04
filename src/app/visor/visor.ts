import { Component } from '@angular/core';
import { VisorHeader } from './visor-header/visor-header';
import { VisorMap } from './visor-map/visor-map';

@Component({
  selector: 'app-visor',
  imports: [VisorMap, VisorHeader],
  templateUrl: './visor.html',
  styleUrl: './visor.scss',
})
export class Visor {

}
