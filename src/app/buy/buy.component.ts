import { Component, OnInit, Inject } from '@angular/core';
import Web3 from 'web3';
import { WEB3 } from '../web3-token';
import { WEB3_PROVIDER } from '../web3-provider';
import { ContractService } from '../contract.service';
import { Contract } from 'web3-eth-contract';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  tokens: {token: number|string, owner: string, price: number|string}[] = [];
  total: number;
  contract: Contract;
  selectedToken: {token: number|string, owner: string, price: number|string};
  account;

  constructor(@Inject(WEB3) private web3: Web3, private contractService: ContractService) {
    this.contract = contractService.getContract();
  }

  async ngOnInit() {

      try {
          const accounts = await WEB3_PROVIDER.request({method: 'eth_requestAccounts'});
          this.account = accounts[0];

          this.total = await this.contract.methods.totalSupply().call();
          for (let i = 0; i < this.total; i++) {
              const token = await this.contract.methods.tokenByIndex(i).call();
              const owner = await this.contract.methods.ownerOf(i).call();
              let price = await this.contract.methods.showPrice(i).call();
              price /= 1000000000000000000;
              const t = {token: token, owner: owner, price: price};
              this.tokens.push(t);

              // console.log('o = ' + owner.toLowerCase() + ' a = ' +  this.account.toLowerCase());
              // if (token.owner && this.account && token.owner.toLowerCase() !== this.account.toLowerCase() ) {
              //     const t = {token: token, owner: owner, price: price};
              //     this.tokens.push(t);
              // }
              // const t = {token: token, owner: owner, price: price};
              // this.tokens.push(t);
          }

          WEB3_PROVIDER.on('accountsChanged', function (a) {
              console.log('accountsChanges' + a);
              window.location.reload();
          });

      } catch (e) {
          console.error(e);
      }


  }

    buyToken(token: {token: string, owner: string, price: number|string}): void {
        if (token.price > 0 && this.account.toLowerCase() !== token.owner.toLowerCase()) {
            this.selectedToken = token;
        } else {
            alert('Not on sale');
        }

    }

    async buyThisToken(token: number) {
        if (this.selectedToken) {
            const price = this.selectedToken.price;
            if (price >= 0 && price <= 100 ) {
                // Eth to Wei

                try {
                    // await this.web3.eth.sendTransaction({ from: this.account, to: this.selectedToken.owner, value: this.web3.utils.toWei(price.toString()) });
                    await this.contract.methods.buyToken(+this.selectedToken.token, this.selectedToken.owner).send({from: this.account, value: this.web3.utils.toWei(price.toString())});
                    window.location.reload();
                } catch (e) {
                    console.error(e);
                }
            } else {
                alert('Price number is not correct!');
            }
        } else {
          alert('Not valid token!');
        }

    }

}
