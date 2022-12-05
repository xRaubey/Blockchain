import {Component, OnChanges, OnDestroy, OnInit, AfterViewInit, Inject, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service';
import {Observable, Subscription} from 'rxjs/index';
import {User} from '../blockchain-user';
import { WEB3 } from '../web3-token';
import Web3 from 'web3';
import { map, take } from 'rxjs/operators';
import { of, from } from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import { ContractService } from '../contract.service';
import { WEB3_PROVIDER } from '../web3-provider';
import { Contract } from 'web3-eth-contract';


@Component({
  selector: 'app-user-logged-in',
  templateUrl: './user-logged-in.component.html',
  styleUrls: ['./user-logged-in.component.css']
})
export class UserLoggedInComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  state: {state: boolean, account: string};

  users$: Observable<User[]>;
  sub: Subscription;
  currentUser: User;
  currentEth$: Observable<any>;

  test: boolean;

  account: string;
  balance;

  contract: Contract;
  // userTokens: {token: string, owner: string}[] = [];
    userTokens = [];

    selectedToken;

    @ViewChild('sellModal') sellModal: ElementRef;
    @ViewChild('sellInput') sellInput: ElementRef;

  constructor(
      @Inject(WEB3) private web3: Web3,
      private router: Router,
      private activatedRouter: ActivatedRoute,
      private userService: UserService,
      private ca: ContractService
  ) {
      this.contract = ca.getContract();
  }

   async ngOnInit() {


      try {
          const accounts = await WEB3_PROVIDER.request({method: 'eth_requestAccounts'});
          this.account = accounts[0];
          const balance = await this.web3.eth.getBalance(this.account);
          this.balance = ((+balance) / 1000000000000000000).toFixed(18).toString();

          const total = await this.contract.methods.balanceOf(this.account).call();

          for (let i = 0; i < total; i++) {
              try {
                  const token = await this.contract.methods.tokenOfOwnerByIndex(this.account , i).call();
                  this.userTokens.push(token);
              } catch (e) {
                  console.error(e);
              }
          }

          WEB3_PROVIDER.on('accountsChanged', function (a) {
              console.log('accountsChanges' + a);
              window.location.reload();
          });

      } catch (e) {
          console.error(e);
      }



  }

  ngOnChanges() {
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  logOut() {
      // localStorage.removeItem('loginState');
      WEB3_PROVIDER.on('disconnect', (e) => {console.error(e)});
      this.router.navigate(['./user']);
  }

   mint(): void {

  }

  getTokens(): void {

  }

  selectToken(token: number): void {
    this.selectedToken = token;
  }


}
