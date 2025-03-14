import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from './auth.utils';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated = false;
  private _httpClient = inject(HttpClient);
  // private _accountClient = inject(AccountClient);
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }
  set refreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): any {
    return this._httpClient.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  changePassword(password: string): any {
    // return this._accountClient.changeUserPassword(password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): any {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    // return this._accountClient
    //   .login(
    //     new LoginModel({
    //       userName: credentials.email,
    //       password: credentials.password,
    //     }),
    //   )
    //   .pipe(
    //     switchMap((response: ResponseModelOfTokenModel) => {
    //       // Store the access token in the local storage
    //       if (response.result) {
    //         this.accessToken = response.result?.token;
    //         this.refreshToken = response.result.refreshToken;
    //       }
    //
    //       // Set the authenticated flag to true
    //       this._authenticated = true;
    //
    //       // Store the user on the user service
    //       // Return a new observable with the response
    //       return of(response);
    //     }),
    //   );
  }

  activeRole(role: string): any {
    // return this._accountClient.chooseActiveRole(role).pipe(
    //   switchMap((response: any) => {
    //     if (response.result) {
    //       this.accessToken = response.result?.token;
    //       this.refreshToken = response.result.refreshToken;
    //     }
    //     return of(response);
    //   }),
    // );
    return of('');
  }

  /**
   * Sign in using the access token
   */

  signInUsingToken(): any {
    // Sign in using the token
    return this._httpClient
      .post('api/auth/sign-in-with-token', {
        accessToken: this.accessToken,
      })
      .pipe(
        catchError(() =>
          // Return false
          of(false),
        ),
        switchMap((response: any) => {
          // Replace the access token with the new one if it's available on
          // the response object.
          //
          // This is an added optional step for better security. Once you sign
          // in using the token, you should generate a new one on the server
          // side and attach it to the response object. Then the following
          // piece of code can replace the token with the refreshed one.
          if (response.accessToken) {
            this.accessToken = response.accessToken;
          }

          // Set the authenticated flag to true
          this._authenticated = true;
          // Store the user on the user service

          // Return true
          return of(true);
        }),
      );
  }

  /**
   * Sign out
   */
  signOut(): any {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
    company: string;
  }): Observable<any> {
    return this._httpClient.post('api/auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }
    return of(true);
    // If the access token exists, and it didn't expire, sign in using it
    // return this.signInUsingToken();
  }
}
