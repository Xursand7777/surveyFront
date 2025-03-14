import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { map } from 'rxjs';
import { Constants } from '@core/constants/constants';

export const redirectToGuard: CanActivateFn = (route, state) => {
  const user$ = inject(UserService).user$;
  const router$ = inject(Router);
  return user$.pipe(
    map((user) => {
      switch (user.activeRole) {
        case Constants.ROLES.ADMIN:
          return true;
      }

      router$.navigate(['/auth']);
      return false;
    }),
  );
};
