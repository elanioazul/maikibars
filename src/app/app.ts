import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScreensizeService } from './core/services/screensize.service';

@Component({
  selector: 'app-root',
  imports: [MatSlideToggleModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('maikibars');

  screenSizeService = inject(ScreensizeService);

  ngOnInit(): void {
		this.screenSizeService.getDeviceSize();
	}
}
