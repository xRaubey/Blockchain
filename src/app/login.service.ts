import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './blockchain-user';
import { Observable } from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private list: User[];
  // private list$: Observable<User[]>;
  // private logInState: {state: boolean, account: string} = {state: false, account: null};
  //   localStorage.setItem('loginState', JSON.stringify({state: false, account: null}));

  constructor(private userService: UserService) {
      this.userService.getUsers().subscribe((users: User[]) => {
        this.list = users;
      });
      // this.list$ = this.userService.getUsers();
      // localStorage.setItem('loginState', JSON.stringify({state: false, account: null}));
  }


  logIn(account: string): void {
    // let result = false;
      localStorage.setItem('loginState', JSON.stringify({state: false, account: null}));

      for (const u of this.list) {
        if (u.account === account) {
          // result = true;
          const logInState = {state: true, account: account};
          localStorage.setItem('loginState', JSON.stringify(logInState));
          break;
        }
      }
    // return result;
  }



}
