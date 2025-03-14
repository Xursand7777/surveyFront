import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Menu } from '@core/interfaces/menu';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { TranslocoPipe } from '@ngneat/transloco';
import { Constants } from '@core/constants/constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    NgClass,
    RouterLink,
    RouterOutlet,
    NzButtonComponent,
    NzIconDirective,
    TranslocoPipe,
    RouterLinkActive,
  ],
  standalone: true,
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('verticalNavigation') verticalNavigation!: ElementRef;
  //user$ = inject(UserService).user$;
  visibleSidebar = true;
  isMobile = false;

  toggleVerticalNavigation() {
    this.visibleSidebar = !this.visibleSidebar;
  }

  makeSidebar(width: number) {
    let position = 'sticky';
    if (width < 768) {
      this.visibleSidebar = false;
      position = 'absolute';
      this.isMobile = true;
    } else {
      this.visibleSidebar = true;
      position = 'sticky';
      this.isMobile = false;
    }

    this.verticalNavigation.nativeElement.style.setProperty('position', position, 'important');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.makeSidebar(event.target.innerWidth);
  }

  ngAfterViewInit(): void {
    this.makeSidebar(window.innerWidth);
  }

  readonly menus: Menu[] = [
    {
      label: 'Asosiy oynalar',
      permissions: [Constants.ROLES.ADMIN],
      icon: '',
      children: [
        {
          label: 'Proyektlar',
          routerLink: 'projects',
          permissions: [Constants.ROLES.ADMIN],
          icon: '',
        },
      ],
    },
  ];
}
