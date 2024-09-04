import { Component, OnInit } from '@angular/core';
import { combineLatest, delay, map, of } from 'rxjs';

@Component({
  selector: 'app-combine-data',
  templateUrl: './combine-data.component.html',
  styleUrl: './combine-data.component.css'
})
export class CombineDataComponent implements OnInit {
  combinedData: any[] = [];

  ngOnInit(): void {
   
    const userDetails$ = this.simulateUserDetailsApi();
    const userPosts$ = this.simulateUserPostsApi();

    
    combineLatest([userDetails$, userPosts$])
      .pipe(
        map(([users, posts]) => this.transformData(users, posts)) 
      )
      .subscribe(combined => {
        this.combinedData = combined;
      });
  }

  
  simulateUserDetailsApi() {
    const userDetails = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];
    return of(userDetails).pipe(delay(1000)); 
  }

 
  simulateUserPostsApi() {
    const userPosts = [
      { userId: 1, posts: ['Post 1', 'Post 2'] },
      { userId: 2, posts: ['Post A', 'Post B'] }
    ];
    return of(userPosts).pipe(delay(1500)); 
  }


  transformData(users: any[], posts: any[]) {
    return users.map(user => {
      const userPosts = posts.find(post => post.userId === user.id)?.posts || [];
      return { ...user, posts: userPosts };
    });
  }

}
