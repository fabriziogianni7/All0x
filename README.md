# All0x

## Project Description
Allox is a cross-chain payment integration for traditional ecommerces.

It allows E-commerces to integrate without effort web3 in their website, without even using a web3 context. how? All0x has a web3 context and provdes it to the ecommerce.

all0x also allows cross-chain transactions thanks to Connext! 

## Tech
This MVP is done using Solidity, Nextjs, and Connext

The smart contracts:

LedgerFactoryContract: A factory contracts aloowing users to create accounts (ledger contracts);

LedgerContract: It's the account of the e-commerce. it contains all the transactions and is owned by the e-commerce.
It contains the Xcall to be called with Connext


## run it locally
```
yarn install && yarn dev
```

