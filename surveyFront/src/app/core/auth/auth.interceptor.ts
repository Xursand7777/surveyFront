import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from './auth.service';
import { AuthUtils } from './auth.utils';
import { Router } from '@angular/router';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
  null,
);

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const $router = inject(Router);
  let newReq = req.clone();

  if (
    authService.accessToken &&
    !AuthUtils.isTokenExpired(authService.accessToken)
  ) {
    newReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + authService.accessToken,
      ),
    });
  }

  return next(newReq).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === HttpStatusCode.Unauthorized
      ) {
        if (error.url?.includes('Account/RefreshAccessToken')) {
          isRefreshing = false;
          $router.navigate(['/sign-in']);
          return throwError(() => new Error('Refresh token expired'));
        }

        // if (!isRefreshing) {
        //   isRefreshing = true;
        //   const refreshToken = authService.refreshToken;
        //   if (refreshToken) {
        //     return accountClient.refreshAccessToken(refreshToken).pipe(
        //       tap((el: ResponseModelOfTokenModel) => {
        //         authService.accessToken = el.result?.token as string;
        //         authService.refreshToken = el.result?.refreshToken as string;
        //       }),
        //
        //       switchMap((el) => {
        //         refreshTokenSubject.next(authService.accessToken);
        //         return next(addTokenHeader(req, authService.accessToken));
        //       }),
        //
        //       catchError((err) => {
        //         console.log(err);
        //
        //         isRefreshing = false;
        //         $router.navigate(['/sign-in']);
        //         return throwError(() => err);
        //       }),
        //     );
        //   }
        //   $router.navigate(['/sign-in']);
        //   return throwError('Missing refresh token');
        // }

        return refreshTokenSubject.pipe(
          filter((token) => token != null),
          take(1),
          switchMap(() => {
            const accessToken = authService.accessToken;
            return next(addTokenHeader(req, accessToken));
          }),
          catchError((err) => {
            console.log(err);

            isRefreshing = false;
            $router.navigate(['/sign-in']);
            return throwError(() => err);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};

export const addTokenHeader = (
  request: HttpRequest<any>,
  accessToken: string,
) => {
  return request.clone({
    headers: request.headers.set('Authorization', 'Bearer ' + accessToken),
  });
};
