import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, Provider, inject } from '@angular/core';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

export const provideAuth = (): (Provider | EnvironmentProviders)[] => {
  return [
    provideHttpClient(withInterceptors([authInterceptor])),

    // TODO: DEPRECATED
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(AuthService),
      multi: true,
    },
  ];
};
