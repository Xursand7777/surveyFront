import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const $translate = inject(TranslocoService);
  console.log('Request URL: ' + req.url);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      (error.error ? blobToText(error.error) : of('{}'))
        .pipe(catchError(() => '{}'))
        .subscribe((data) => {
          const response = JSON.parse(data || '{}');
          const errorMessage =
            response.error ||
            error.error?.message ||
            error.message ||
            'Kutilmagan xatolik sodir bo`ldi.';
          console.error('Logging Interceptor Functional Error:', errorMessage);
        });
      return throwError(() => error);
    }),
  );
};

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
