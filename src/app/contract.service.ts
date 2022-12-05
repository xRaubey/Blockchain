import { Injectable, Inject } from '@angular/core';
import Web3 from 'web3';
import { WEB3 } from './web3-token';
import { AbiItem } from 'web3-utils';
import { ABI, CA } from './abi';
// import { CA } from './contract-address';
import { Observable } from 'rxjs/index';
import { from } from 'rxjs/index';
import { Contract } from 'web3-eth-contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  abi = ABI;
  contractAddress = CA;

  constructor(@Inject(WEB3) private web3: Web3) { }

  getContract(): Contract {
    return   new this.web3.eth.Contract(this.abi as AbiItem[], this.contractAddress);
  }
}
