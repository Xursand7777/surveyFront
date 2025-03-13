import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: BehaviorSubject<any> = new BehaviorSubject<any>(
    {activeRole:'АДМИНИСТРАТОР', permissions: 'АДМИНИСТРАТОР'} as unknown,
  );

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: unknown) {
    // Store the value
    this._user.next(value);
  }
  get user(): unknown {
    return this._user.value;
  }

  get user$(): Observable<unknown> {
    return this._user.asObservable();
  }

  set role(value: unknown) {
    // Store the value
    this._user.next(value);
  }

  get role$(): Observable<string | undefined> {
    return this._user.pipe(map((res) => res.activeRole));
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current signed-in user data
   * *USE THIS METHOD IF YOU REFRESH THE USER PROFILE DATA IN THE APPLICATION*
   */
  // get(): Observable<UserDTO> {
  //   return this._account.userProfile().pipe(
  //     map((response: ResponseModelOfUserDTO) => {
  //       if (response.error) {
  //         throw new Error(response.error); // Handle the error appropriately
  //       }
  //       return response.result as UserDTO; // Assuming 'result' contains the UserDTO
  //     }),
  //     tap((user) => {
  //       this.user = user;
  //     }),
  //   );
  // }

  /**
   * Update the user
   *
   * @param user
   */
  // update(user: unknown): Observable<any> {
  //   return this._account.updateUserProfile(user).pipe(
  //     map((response) => {
  //       this.user = user;
  //     }),
  //   );
  // }

  checkRole(roles: string[]) {
    // let hasPermission = false;
    //
    // if (this.user && this.user.activeRole) {
    //   if (
    //     roles.find(
    //       (x) => x.toUpperCase() === this.user!.activeRole!.toUpperCase(),
    //     )
    //   ) {
    //     hasPermission = true;
    //   }
    // }
    //
    // return hasPermission;
    return true;
  }
}
