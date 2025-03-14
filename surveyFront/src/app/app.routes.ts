import { Routes } from '@angular/router';
import { initialDataResolver } from './app.resolvers';
import { LayoutComponent } from '@modules/layout/layout.component';
import { AuthGuard } from '@core/auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [],
    canActivateChild: [],
    resolve: {
      data: initialDataResolver,
    },
    children: [],
  },
] as Routes;
