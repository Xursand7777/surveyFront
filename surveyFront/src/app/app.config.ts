import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  APP_INITIALIZER,
  inject,
  ENVIRONMENT_INITIALIZER
} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {environment} from "../environments/environment";
import { TranslocoHttpLoader } from './transloco-loader';
import {provideTransloco, TranslocoService} from '@ngneat/transloco';
import {firstValueFrom} from "rxjs";
import {NzIconService} from "ng-zorro-antd/icon";
import {SplashScreenService} from "@core/services/splash-screen.service";
import {iconFactory} from "@core/utils/icon-factory";
import {provideAuth} from "@core/auth/auth.provider";
import {ErrorInterceptor} from "@core/interceptors/error.interceptor";
import {HeaderInterceptor} from "@core/interceptors/header.interceptor";



export const appConfig:ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAuth(),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([ErrorInterceptor, HeaderInterceptor])),
    provideTransloco({
        config: {
          availableLangs: ['en'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),

      // TODO: DEPRECATED
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      useFactory: () => {
        const translocoService = inject(TranslocoService);
        const defaultLang = translocoService.getDefaultLang();
        translocoService.setActiveLang(defaultLang);

        return () => firstValueFrom(translocoService.load(defaultLang));
      },
      multi: true,
    },
    // TODO: DEPRECATED
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(SplashScreenService),
      multi: true,
    },
    // TODO: DEPRECATED
    {
      provide: APP_INITIALIZER,
      useFactory: iconFactory,
      multi: true,
      deps: [NzIconService],
    },

    //{ provide: API_BASE_URL, useValue: environment.API_BASE_URL },
  ]
}
