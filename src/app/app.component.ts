import { Component, Inject, OnInit } from '@angular/core';
import { WEB3 } from './web3-token';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { ABI, CA } from './abi';
import { ContractService } from './contract.service';
import { WEB3_PROVIDER } from './web3-provider';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Project629';
  abi = ABI;
  contractAddress = CA;

  userURL = './user';

  constructor(@Inject(WEB3) private web3: Web3, private contractService: ContractService) {

  }

     async ngOnInit() {

         if (await  WEB3_PROVIDER.isConnected()) {

             const ac = await WEB3_PROVIDER.request({method: 'eth_requestAccounts'});
             this.userURL = 'logged/' + ac[0];

         }


        // this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
        const MyContract = await this.contractService.getContract();


        // if ('enable' in this.web3.currentProvider) {
        //     await this.web3.currentProvider.enable();
        // }
        const accounts = await this.web3.eth.getAccounts();
        this.web3.eth.defaultAccount = accounts[0];
        const da = await this.web3.eth.defaultAccount;
        console.log('account = ' + da);
        // for (const account of accounts) {
        //     console.log('account = ' + accounts[0]);
        // }

        // const a =  await MyContract.methods.getName().call();
        // console.log(a);
        // MyContract.methods.setName('yyq2').send();
        // console.log(MyContract);
    }

}
