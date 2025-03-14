import {Routes} from "@angular/router";
import { initialDataResolver } from './app.resolvers';
import {LayoutComponent} from "@modules/layout/layout.component";
import {AuthGuard} from "@core/auth/guards/auth.guard";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'projects' },
  {
    path: 'sign-in',
    loadComponent: () => import('./modules/auth/sign-in/sign-in.component')
  },
  {
    path: '',
    component: LayoutComponent,
    resolve: {},
    children: [
      { path: 'projects', loadComponent: () => import('./modules/pages/projects/projects.component') }
    ]
  }
] as Routes;
