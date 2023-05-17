import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { toSignalWithError } from './signal-error-handling';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <p>Let's load some data!</p>
    <ul>
      <ng-container *ngIf="data.value(); else loading">
        <!-- Success -->
        <li *ngFor="let todo of data.value()">
          {{ todo | json }}
        </li>
      </ng-container>
      <ng-template #loading>
        <!-- Loading -->
        <li *ngIf="!data.error(); else failed">They see me loading'...</li>
      </ng-template>
      <ng-template #failed>
        <!-- Failed -->
        <p>Uh oh... you're on your own buddy:</p>
        <small>
          {{ data.error().message }}
        </small>
      </ng-template>
    </ul>`,

  styles: ['small {color: red}'],
})
export class AppComponent {
  private todoService = inject(TodoService);
  // use different methods of userService to see how error handling works
  data = toSignalWithError(this.todoService.getFromAPI());
  // data = toSignalWithError(this.userService.getFromAPIError());
}
