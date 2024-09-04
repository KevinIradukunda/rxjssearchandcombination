import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Observable, of } from 'rxjs';
import { debounceTime, filter, switchMap, delay, catchError, tap, finalize } from 'rxjs/operators';
import { User } from '../../../model/user.interface';
import { Post } from '../../../model/posts.interface';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  combinedData$!: Observable<{ user: User; posts: Post[]; }>;
  isLoading = false; 
  isSearching = false; 

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit() {
  
    this.combinedData$ = this.searchControl.valueChanges.pipe(
      filter((term): term is string => term !== null), 
      debounceTime(300), 
      filter((term: string) => term.length >= 3), 
      tap(() => this.isSearching = true), 
      switchMap(term => this.userService.fetchCombinedData(term).pipe(
        tap(() => this.isLoading = true),
        catchError(error => {
          this.handleError(error.message); 
          return EMPTY; 
        }),
        finalize(() => {
          this.isLoading = false; 
          this.isSearching = false; 
        })
      ))
    );
  }


  private handleError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
