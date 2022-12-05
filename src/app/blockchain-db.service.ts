import { Injectable, OnInit, Inject } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './blockchain-user';
import { Web3Service } from './web3.service';
import { ABI, CA } from './abi';

@Injectable({
  providedIn: 'root'
})
export class BlockchainDBService implements InMemoryDbService {

    abi = ABI;
    contractAddress = CA;

  constructor(private web3Service: Web3Service) { }


    async createDb() {
    const users: string[] = await this.web3Service.getAccounts();
    const userList: User[] = [];
    let accountId = 0;
    const account = 'Account';

    for (const user of users) {
      const u = {'account': account + accountId++, 'id': user};
      userList.push(u);
    }

      return {userList};
  }

}
