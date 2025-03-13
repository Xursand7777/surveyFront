import type { HttpInterceptorFn } from '@angular/common/http';
import {BrowserStorage} from "@core/services/browser-storage.service";

export const HeaderInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      'accept-language': BrowserStorage.currentLanguage,
    },
  });
  return next(req);
};
