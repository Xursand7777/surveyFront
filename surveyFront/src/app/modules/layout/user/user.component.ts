import {Component, inject} from "@angular/core";
import {NzAvatarComponent} from "ng-zorro-antd/avatar";

@Component({
  selector: "app-user",
  styleUrls: ["./user.component.scss"],
  templateUrl: "./user.component.html",
  imports: [
    NzAvatarComponent
  ],
  standalone: true
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
