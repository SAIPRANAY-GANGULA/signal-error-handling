import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiExample!: Observable<any>;
  private apiErrorExample!: Observable<any>;

  constructor(private http: HttpClient) {}

  getFromAPI() {
    // This creates a hot observable and we cache it on a class member
    // so that multiple subscribers don't trigger multiple requests
    if (!this.apiExample) {
      this.apiExample = this.http
        .get('https://jsonplaceholder.typicode.com/todos')
        .pipe(
          tap(() => console.log('setting up stream!')),
          shareReplay(1)
        );
    }

    return this.apiExample;
  }

  getFromAPIError() {
    if (!this.apiErrorExample) {
      // intentional typo in URL to trigger error
      this.apiErrorExample = this.http
        .get('https://jsonplaceholde.typicode.com/todos/1')
        .pipe(
          tap(() => console.log('setting up stream!')),
          shareReplay(1)
        );
    }

    return this.apiErrorExample;
  }
}
