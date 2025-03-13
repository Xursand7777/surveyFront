import {inject, Injectable} from "@angular/core";
import {filter, take} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({ providedIn: "root" })
export class SplashScreenService {

  private _document = inject(DOCUMENT);
  private _router = inject(Router);

  /**
   * Constructor
   */
  constructor() {
    // Hide it on the first NavigationEnd event
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        this.hide();
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Show the splash screen
   */
  show(): void {
    this._document.body.classList.remove('fuse-splash-screen-hidden');
  }

  /**
   * Hide the splash screen
   */
  hide(): void {
    this._document.body.classList.add('fuse-splash-screen-hidden');
  }
}
