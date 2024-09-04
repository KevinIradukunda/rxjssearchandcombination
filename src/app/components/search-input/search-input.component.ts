import { Component, EventEmitter, Output } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged, filter, fromEvent, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  @Output() search = new EventEmitter<string[]>();

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;

    fromEvent(input, 'input')
      .pipe(
        map((e: Event) => (e.target as HTMLInputElement).value),
        debounceTime(300), 
        distinctUntilChanged(),
        filter((term: string) => term.length >= 3), 
        switchMap((searchTerm: string) => this.simulateApiCall(searchTerm)) 
      )
      .subscribe((results: string[]) => {
        this.search.emit(results); 
      });
  }

 
  simulateApiCall(searchTerm: string) {
    const fakeResults = Array.from({ length: 5 }, (_, i) => `${searchTerm} result ${i + 1}`);
    return of(fakeResults).pipe(delay(500));
  }

}
