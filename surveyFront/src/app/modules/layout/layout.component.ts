import {Component,  input} from "@angular/core";
import {MenuItem} from "@core/interfaces/menu";
import {NgTemplateOutlet} from "@angular/common";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {Constants} from "@core/constants/constants";
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {LanguagesComponent} from "@modules/layout/languages/languages.component";
import {UserComponent} from "@modules/layout/user/user.component";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  imports: [
    RouterLink,
    NzIconDirective,
    NzMenuModule,
    NgTemplateOutlet,
    NzLayoutComponent,
    NzSiderComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzFooterComponent,
    RouterOutlet,
    LanguagesComponent,
    UserComponent,
  ],
  standalone: true
})
export class LayoutComponent {

  isCollapsed = input<boolean>();


  constructor(
    public route: ActivatedRoute,
  ) {}

  handleMiddleClick(event: MouseEvent, url: string): void {
    if (event.button === 1) {
      event.preventDefault();
      window.open(url, '_blank');
    }
  }


  readonly menus: MenuItem[] = [
    {
      label:'Asosiy oynalar',
      permissions: [Constants.ROLES.ADMIN],
      icon: 'survey_info',
      children: [
        {
          label: 'Proyektlar',
          url: 'projects',
          permissions: [Constants.ROLES.ADMIN],
          icon: 'survey_info'
        }
      ]
    }
  ];
}
