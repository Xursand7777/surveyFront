import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {UserService} from "../../../core/services/user.service";


// https://stackblitz.com/edit/angular-permission-directive?file=app%2Fapp.component.html
@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements OnInit {
  private currentUser!: unknown | null;
  private permissions: string[] = [];
  private roles: string[] = ['АДМИНИСТРАТОР'];
  private logicalOp = 'AND';
  private isHidden = true;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      console.log(user, 'user')
      this.currentUser = user;
      this.updateView();
    });
  }

  @Input()
  set hasPermission(val: string[]) {
    this.roles = val;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(permop: 'AND' | 'OR') {
    this.logicalOp = permop;
    this.updateView();
  }

  private updateView() {
    // if (this.checkPermission()) {
    if (this.checkRole()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkRole() {
    return this.userService.checkRole(this.roles);
  }

  private checkPermission() {
    let hasPermission = false;

    // if (this.currentUser && this.currentUser.permissions) {
    //   for (const checkPermission of this.permissions) {
    //     const permissionFound = this.currentUser.permissions.find(
    //       (x) => x.toUpperCase() === checkPermission.toUpperCase(),
    //     );
    //
    //     if (permissionFound) {
    //       hasPermission = true;
    //
    //       if (this.logicalOp === 'OR') {
    //         break;
    //       }
    //     } else {
    //       hasPermission = false;
    //       if (this.logicalOp === 'AND') {
    //         break;
    //       }
    //     }
    //   }
    // }
    hasPermission = true;
    return hasPermission;
  }
}
