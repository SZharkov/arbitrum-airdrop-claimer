# Arbitrum airdrop claimer
This script was created in order to claim an Arbitrum airdrop instantly when distribution starts.
After claiming script can transfer tokens to any address. It also supports multiple accounts, so you can even claim on 50+ accounts and still send tokens to different addresses ([OKX](https://www.okx.com/join/63044893) subaccounts for example).

## Disclaimer
This script was created for personal use. I am not responsible for any issues which can occur when using this script.

## How to run
In order to run this script you need to have Node.js installed. You can [download Node.js here](https://nodejs.org/en/download).
Once you have Node.js follow the next steps:
1) [Download](https://github.com/SZharkov/arbitrum-airdrop-claimer/archive/refs/heads/master.zip) repository
2) Configure it by following [How to configure](https://github.com/SZharkov/arbitrum-airdrop-claimer#how-to-configure)
3) Open terminal in repository folder and type `npm install` or `yarn`
4) Run script by typing `npm start` or `yarn start`
5) If you want to pre-approve ARB for DEXes run `npm run approve` or `yarn approve`

## How to open terminal? 
https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/

## How to configure
In order to use this script you need to have your own Arbitrum and Ethereum RPC which you can obtain on [Alchemy](https://alchemy.com/?r=baefaebe6e6ad7e2) or any other provider.
Main configuration can be found in `config.js` file. Just follow the instruction below:
1) Create an account on [Alchemy](https://alchemy.com/?r=baefaebe6e6ad7e2).
2) In Alchemy Dashboard create 2 apps:
   - Ethereum mainnet chain
   - Arbitrum mainnet chain
5) Open `config.js` file and edit the next fields:
   - Replace `RPC_ARBITRUM_HTTP` with your Arbitrum HTTPS key from Alchemy.
   - Replace `RPC_ETHEREUM_WSS` with your Ethereum WEBSOCKETS key from Alchemy.
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

## Approve for DEXes
There is also a script to pre-approve ARB token for trading on DEXes. You can approve from all your accounts and be ready once trading on DEX starts. By default I added only Uniswap for approval but you can edit `DEXES` in `config.js` and add more DEXes to approve.

In order to use approve script run `npm run approve` or `yarn approve`. Make sure to configure `config.js` first.

## Errors
If you see an error something like `TypeError [ERR_UNKNOWN_FILE_EXTENSION]` or `The engine "node" is incompatible with this module` then you need to use another version of Node.js. This script is supposed to work with Node.js >= 16.15.0.

## Credits and donations
Script was created by Serhii Zharkov. You can follow him on:
- https://twitter.com/zharkov_crypto
- https://t.me/sergeyipo
- https://www.youtube.com/@sergey-investing

If you want to donate:
- `TW3rUPuyXCTAZZVUMYR4i1z5i1SWPPXgGA` - USDT trc20
- `0xd2B7E218eB3C2441eB9c216f2442D3266b11a10d` - any token (USDC USDT BUSD ETH etc) all chains

## Other
- ARB token contract - [0x912CE59144191C1204E64559FE8253a0e49E6548](https://arbiscan.io/address/0x912CE59144191C1204E64559FE8253a0e49E6548)
- ARB token claim contract - [0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9](https://arbiscan.io/address/0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9)
