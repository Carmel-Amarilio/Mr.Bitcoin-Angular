import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { storageService } from './async-storage.service';

const USERS_KEY = 'usersDB';
@Injectable({
  providedIn: 'root',
})
export class UserSericeService {
  private _loggedInUser$ = new BehaviorSubject<User | null>(null);
  public loggedInUser$ = this._loggedInUser$.asObservable();

  async logIn(name: string) {
    try {
      const users = await this.getUsers();
      let user: User | undefined = users.find((user) => user.name === name);
      if (!user) user = await this.saveUser(this.getEmptyUser(name));
      this._loggedInUser$.next(user);
    } catch (error) {
      console.log(error);
    }
  }

  logOut() {
    this._loggedInUser$.next(null);
  }

  getLoggedInUser() {
    return this._loggedInUser$.value;
  }

  async getUsers(): Promise<User[]> {
    return await storageService.query(USERS_KEY);
  }

  async saveUser(user: User): Promise<User> {
    return user._id
      ? await storageService.put(USERS_KEY, user)
      : await storageService.post(USERS_KEY, user);
  }

  getEmptyUser(name: string): User {
    return {
      _id: '',
      name,
      balance: 100,
      transactions: [],
    };
  }
}
