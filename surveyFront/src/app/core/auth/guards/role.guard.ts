import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';

export const roleGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const userRole = inject(UserService).user;
  console.log(userRole);
  return false;
};
