import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSericeService {
  user = {
    _id: 'u101',
    name: 'Bobovich',
    username: 'Bobo',
    isAdmin: true,
  };

  private _loggedInUser$ = new BehaviorSubject(this.user);
  public loggedInUser$ = this._loggedInUser$.asObservable();

  getLoggedInUser() {
    return this._loggedInUser$.value;
  }
}
