import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PreloaderService } from './core/services/preloader.service';

@Component({
  selector: 'app-root',
  imports: [MatSlideToggleModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit{
  protected readonly title = signal('maikibars');
  private readonly preloader = inject(PreloaderService);

  ngAfterViewInit() {
    setTimeout(() => {
      this.preloader.hide()
    }, 2000)
  }
}
