import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { UserService } from '../../../core/services/user.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
  imports: [TranslocoPipe, AsyncPipe, NzAvatarComponent],
  standalone: true,
})
export class UserComponent {
  overlayVisible = false;
  // firstRole: string = '';
  // roles$ = inject(UserService).user$.pipe(map((user) => user.roles));
  // user$ = inject(UserService).user$;

  //private $user = inject(UserService);

  toggle() {
    this.overlayVisible = !this.overlayVisible;
  }
}
