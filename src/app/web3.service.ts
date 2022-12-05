import { Injectable, Inject, OnInit } from '@angular/core';
import { WEB3 } from './web3-token';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

    abi = [
        {
            "constant": false,
            "inputs": [],
            "name": "getName",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "type": "function",
            "stateMutability": "nonpayable"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "setName",
            "outputs": [],
            "payable": false,
            "type": "function",
            "stateMutability": "nonpayable"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "type": "function",
            "stateMutability": "view"
        }
    ];
    contractAddress = '0x3cDdb611E54399fACfBE32999f70Fa636dc02132';

    constructor(@Inject(WEB3) private web3: Web3) { }

  setAccount(): void {
    this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
  }

  async getAccounts(): Promise<string[]> {
      return await this.web3.eth.getAccounts();
  }
}
