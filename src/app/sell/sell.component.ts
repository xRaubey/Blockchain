import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { WEB3 } from '../web3-token';
import Web3 from 'web3';
import { ContractService } from '../contract.service';
import { WEB3_PROVIDER } from '../web3-provider';
import { Contract } from 'web3-eth-contract';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit, AfterViewInit {

    selectedToken;
    contract: Contract;
    account: string | number;
    userTokens = [];

    @ViewChild('sellModal') sellModal: ElementRef;
    @ViewChild('sellInput') sellInput: ElementRef;
    @ViewChild('saleState') saleState: ElementRef;

  constructor(
      @Inject(WEB3) private web3: Web3,
      private router: Router,
      private activatedRouter: ActivatedRoute,
      private ca: ContractService
  ) {
      this.contract = ca.getContract();
  }

  async ngOnInit() {
      try {
          const accounts = await WEB3_PROVIDER.request({method: 'eth_requestAccounts'});
          this.account = accounts[0];
          // const balance = await this.web3.eth.getBalance(this.account);
          // this.balance = ((+balance) / 1000000000000000000).toFixed(18).toString();
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

  ngAfterViewInit() {
      this.sellModal.nativeElement.addEventListener('hidden.bs.modal', () => {
          this.sellInput.nativeElement.value = '';
      });

      // this.saleState.nativeElement.innerHTML = '';
  }

  sellToken(token: number): void {
      this.selectedToken = token;
  }

  async sellThisToken(token: number) {
      const price = +this.sellInput.nativeElement.value;
      if (price >= 0 && price <= 100 ) {
          // Wei to ETH
          // price *= 1000000000000000000;
          await this.contract.methods.setPrice(this.web3.utils.toWei(price.toString()), this.selectedToken).send({from: this.account});
          // if (price > 0) {
          //     this.saleState.nativeElement.innerHTML = '(On sale)';
          // } else {
          //     this.saleState.nativeElement.innerHTML = '';
          // }
      } else {
          alert('Please type in correct number (0 - 100)!');
          this.saleState.nativeElement.innerHTML = '';
      }
  }


}
