import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | undefined, term: string | null): SafeHtml {
    if (!value) return '';
    if (!term || typeof term !== 'string') return value;

    // Create a regex to find the term, 'gi' means global and case-insensitive
    const re = new RegExp(`(${term})`, 'gi');
    const highlightedValue = value.replace(re, '<strong>$1</strong>');

    // We must sanitize the HTML to tell Angular it is safe to render <strong> tags
    return this.sanitizer.bypassSecurityTrustHtml(highlightedValue);
  }
}
