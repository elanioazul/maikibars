import { Component, computed, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../core/services/location.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { HighlightPipe } from '../../core/pipes/highlight-pipe';
import { Feature, Point } from 'geojson';
@Component({
  selector: 'app-visor-searcher',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, MatAutocompleteModule, CommonModule, HighlightPipe, ],
  templateUrl: './visor-searcher.html',
  styleUrl: './visor-searcher.scss',
})
export class VisorSearcher {
  readonly locationsService = inject(LocationService);

  selection = output<any>();

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

  handleBarSelection(event: any): void {
    const selectedBar = event.option.value as Feature<Point>;
    this.selection.emit(selectedBar);
  }
}
