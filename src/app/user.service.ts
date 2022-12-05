import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, from, defer} from 'rxjs';
import { User } from './blockchain-user';
import {catchError} from 'rxjs/internal/operators';
import {WEB3} from './web3-token';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'api/userList';
  users: User[];
  constructor(@Inject(WEB3) private web3: Web3, private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
        catchError(this.handleErrors('getUsers', [])),
    );
  }

  getEther(id: string): Observable<any> {
      return defer(() => this.web3.eth.getBalance(id, Number));
  }

  private handleErrors<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);
      return of(result as T);
    };
  }

}
