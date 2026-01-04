import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import {  ScreenSizeStore } from '../../core/store/screensize.state';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../core/services/location-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { Feature, Point } from 'geojson';

@Component({
  selector: 'app-visor-header',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, MatAutocompleteModule, CommonModule],
  templateUrl: './visor-header.html',
  styleUrl: './visor-header.scss',
})
export class VisorHeader {
  readonly screenStore = inject(ScreenSizeStore);
  readonly locationsService = inject(LocationService);

  searchControl = new FormControl('', { nonNullable: true });

  searchTerm = toSignal(
      this.searchControl.valueChanges.pipe(startWith('')),
      { initialValue: '' }
  );

filteredBars = computed(() => {
    const rawValue = this.searchTerm();

    if (typeof rawValue !== 'string') return [];

    const term = rawValue.toLowerCase();
    const allBars = this.locationsService.barsFeatures();

    if (!term) return [];

    return allBars!.filter(bar =>
      bar.properties?.['name']?.toLowerCase().includes(term)
    ).slice(0, 10);
  });

  displayFn(bar: any): string {
    return bar && bar.properties ? bar.properties.name : '';
  }

  constructor() {
    console.log(this.screenStore.isMobile());
    effect(() => {
      console.log('Reactive log:', this.screenStore.size());

      if (this.screenStore.isMobile()) {
        console.log('eeeee, effect => this.doSomethingForMobile();');

      }
    });
  }

  onBarSelected(event: any): void {
      const selectedBar = event.option.value as Feature<Point>;
      console.log('Selected Bar Feature:', selectedBar.properties!['name']);
      // You could also emit this to the map to center on these coordinates
    }

}
