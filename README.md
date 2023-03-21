# Arbitrum airdrop claimer
This script was created in order to claim an Arbitrum airdrop instantly when distribution starts.
After claiming script can transfer tokens to any address. It also supports multiple accounts, so you can even claim on 50+ accounts and still send tokens to different addresses ([OKX](https://www.okx.com/join/63044893) subaccounts for example).

## Disclaimer
This script was created for personal use. I am not responsible for any issues which can occur when using this script.

## How to configure
In order to use this script you need to have your own RPC which you can obtain on [Alchemy](https://alchemy.com/?r=baefaebe6e6ad7e2) or any other provider.
Main configuration can be found in `config.js` file. Just follow the instruction below:
1) Create an account on [Alchemy](https://alchemy.com/?r=baefaebe6e6ad7e2).
2) In Alchemy Dashboard create 2 apps:
   3) Ethereum mainnet chain
   4) Arbitrum mainnet chain
5) Open `config.js` file and edit the next fields:
   6) Replace `RPC_ARBITRUM_HTTP` with your Arbitrum HTTPS key from Alchemy.
   7) Replace `RPC_ETHEREUM_WSS` with your Ethereum WEBSOCKETS key from Alchemy.
8) In `config.js` find `ACCOUNTS` array and put your accounts. If you want to claim without sending tokens then leave `addressToSendTokens` empty.

Example:
```javascript
const RPC_ARBITRUM_HTTP = "https://arb-mainnet.g.alchemy.com/v2/sMsdjLabS-N1oSGcpMn23Q21UOcZQP";
const RPC_ETHEREUM_WSS = "wss://eth-mainnet.g.alchemy.com/v2/sMsdjLabS-N1oSGcpMn23Q21UOcZQP";
        
export const ACCOUNTS = [
  {
    privateKey: "668221e18caa34fbb0d8a024f36dbe1217f9f70d69aa17665cbc0bdf8cc3f03c",
    addressToSendTokens: "0x3010845ffCB6a34Fc44F3C07462D086dF79E4Fd1"
  },
  {
    privateKey: "1d24157ea4b9ae8ba3827c8345879e2cc8348f0d1db22b9e32b4c2ba90a18424",
    addressToSendTokens: "" // <- claim only, no transfer
  },
]
```

## How to run
In order to run this script you need to have Node.js installed. You can [download Node.js here](https://nodejs.org/en/download).
Once you have Node.js follow the next steps:
1) Open terminal in script folder and type `npm install` or `yarn`
2) Run script by typing `npm start` or `yarn start`

## Credits and donations
Script was created by Serhii Zharkov. You can follow him on:
- https://twitter.com/zharkov_crypto
- https://t.me/sergeyipo
- https://www.youtube.com/@sergey-investing

If you want to donate:
- `TW3rUPuyXCTAZZVUMYR4i1z5i1SWPPXgGA` - USDT trc20
- `0x04652fdae61031153674f35c5153f42825d9a5a1` - USDC USDT ETH [Ethereum, Polygon, Arbitrum, Optimism chains]
