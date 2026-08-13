import { Component, computed, effect, inject} from '@angular/core';
import {  ScreenSizeStore } from '../../core/store/screensize.state';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Feature, Point } from 'geojson';
import { FlayingFeatureStore } from '../../core/store/flyingFeature.state';
import { VisorSearcher } from '../visor-searcher/visor-searcher';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visor-header',
  imports: [CommonModule, VisorSearcher, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule],
  templateUrl: './visor-header.html',
  styleUrl: './visor-header.scss',
})
export class VisorHeader {
  readonly screenStore = inject(ScreenSizeStore);
  readonly flyingFeatureStore = inject(FlayingFeatureStore);

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly user = this.authService.user;


  constructor() {
    effect(() => {
      console.log('Reactive log:', this.screenStore.size());
    });
  }
  
  protected onLogout(): void {
    this.authService.logout();
    void this.router.navigateByUrl('/login');
  }

  onBarSelected(bar: Feature<Point>): void {
    this.flyingFeatureStore.handleFeatureClick(bar as Feature<Point>);
  }

}
