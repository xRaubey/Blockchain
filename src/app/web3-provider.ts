import Web3 from 'web3';

export const WEB3_PROVIDER = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
