import { Component } from '@angular/core';
import { VisorHeader } from './visor-header/visor-header';
import { VisorMap } from './visor-map/visor-map';
import { VisorCard } from './visor-card/visor-card';

@Component({
  selector: 'app-visor',
  imports: [VisorMap, VisorHeader, VisorCard],
  templateUrl: './visor.html',
  styleUrl: './visor.scss',
})
export class Visor {

}
