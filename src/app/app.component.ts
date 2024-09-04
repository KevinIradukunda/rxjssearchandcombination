import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  results: string[] = [];

  handleSearch(results: string[]) {
    this.results = results;
  }
}
