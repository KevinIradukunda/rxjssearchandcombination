import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Post } from '../model/posts.interface';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {


getUserDetails(term: string): Observable<User> {
  if (term === 'error') {
    return throwError(() => new Error('Failed to fetch user details')).pipe(delay(1000)); 
  }
  const userDetails = {
    id: 1,
    name: `User ${term}`,
    email: `${term.toLowerCase()}@example.com`
  };
  return of(userDetails).pipe(delay(1000)); 
}


getUserPosts(term: string): Observable<Post[]> {
  if (term === 'error') {
    return throwError(() => new Error('Failed to fetch user posts')).pipe(delay(1500)); 
  }
  const userPosts = [
    { id: 1, title: `${term} Post 1`, body: `This is ${term}'s first post.` },
    { id: 2, title: `${term} Post 2`, body: `This is ${term}'s second post.` }
  ];
  return of(userPosts).pipe(delay(1500)); 
}


fetchCombinedData(term: string): Observable<{ user: User; posts: Post[] }> {
  return combineLatest([this.getUserDetails(term), this.getUserPosts(term)]).pipe(
    map(([user, posts]) => ({ user, posts })),
    catchError(error => throwError(() => new Error(`Combined data fetch failed: ${error.message}`))) 
  );
}
}
