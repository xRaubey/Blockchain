import {Component, ElementRef, OnInit, ViewChild, Inject} from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../blockchain-user';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import Web3 from 'web3';
import { WEB3 } from '../web3-token';
import { WEB3_PROVIDER } from '../web3-provider';

declare global {
  interface  Window {
    ethereum: any;
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    info: string;


  constructor(@Inject(WEB3) private web3: Web3, private userService: UserService, private login: LoginService, private router: Router) {
  }

  async ngOnInit() {

      if (!window.ethereum) {
          this.info = 'It seems that the MetaMask extension is not detected. Please install MetaMask first.';
          alert('It seems that the MetaMask extension is not detected. Please install MetaMask first.');
      } else {
          this.info = 'MetaMask extension has been detected!!';
      }

    if (await  WEB3_PROVIDER.isConnected()) {

        const accounts = await WEB3_PROVIDER.request({method: 'eth_requestAccounts'});

        this.router.navigate(['./logged/' + accounts[0]]);
    }

  }



    async logInWallet() {

        try {
            const accounts = await WEB3_PROVIDER.request({method: 'eth_requestAccounts'});
            console.log(accounts[0]);
            this.router.navigate(['./logged/' + accounts[0]]);

        } catch (e) {
          console.error(e);
        }

    }
}
