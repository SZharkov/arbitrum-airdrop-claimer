import { ethers } from "ethers";
import { CONFIG, ACCOUNTS } from "./config.js";
import {
  claimedFailLog,
  claimedOkLog,
  claimNotStartedLog,
  claimStartedLog,
  resultsLog, scriptStartedLog,
  transferFailLog,
  transferOkLog,
  welcomeLog
} from "./logs.js";

/* ABI */
import erc20Abi from "./abi/erc20.json" assert { type: "json" };
import distributorAbi from "./abi/distributor.json" assert { type: "json" };

welcomeLog();

class ArbClaimer {
  static EXPECTED_PONG_BACK = 10000;
  static KEEP_ALIVE_CHECK_INTERVAL = 5000;
  claimStarted = false;
  pingTimeout = null;
  keepAliveInterval = null;
  provider;
  providerWss;
  DistributorContract;
  claimsOk = 0;
  transfersOk = 0;
  totalAccountsDone = 0;
  claimStartBlock = 0;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      CONFIG.rpc_arb_http
    );
    this.providerWss = new ethers.providers.WebSocketProvider(
      CONFIG.rpc_eth_wss
    );
    this.DistributorContract = new ethers.Contract(CONFIG.distributorAddress, distributorAbi, this.provider);
  }

  async claimAccount(account) {
    try {
      const accountId = account.privateKey.slice(0, 8);
      const wallet = new ethers.Wallet(account.privateKey, this.provider);
      const ClaimContract = new ethers.Contract(CONFIG.distributorAddress, distributorAbi, wallet);
      const ArbTokenContract = new ethers.Contract(CONFIG.arbTokenAddress, erc20Abi, wallet);
      const claimableTokens = await ClaimContract.claimableTokens(wallet.address);
      const claimableTokensFormattedNum = Number(ethers.utils.formatEther(claimableTokens));
      const feeData = await this.provider.getFeeData();

      if (claimableTokensFormattedNum > 0) {
        const claimTx = await ClaimContract.claim({
          gasPrice: feeData.gasPrice,
          gasLimit: "2000000"
        });
        const waitClaimTx = await this.provider.waitForTransaction(claimTx.hash);

        if (waitClaimTx.status) {
          claimedOkLog(accountId, claimableTokensFormattedNum, claimTx.hash);
          this.claimsOk++;
        } else {
          claimedFailLog(accountId, wallet.address);
        }

        // Transfer tokens if addressToSendTokens is set
        if (waitClaimTx.status && account.addressToSendTokens) {
          const balance = await ArbTokenContract.balanceOf(wallet.address);
          const transferTx = await ArbTokenContract.transfer(account.addressToSendTokens, balance);
          const waitTransferTx = await this.provider.waitForTransaction(transferTx.hash);

          if (waitTransferTx.status) {
            transferOkLog(accountId, ethers.utils.formatEther(balance), transferTx.hash);
            this.transfersOk++;
          } else {
            transferFailLog(accountId, wallet.address);
          }
        }

        this.totalAccountsDone++;

        if (this.totalAccountsDone === ACCOUNTS.length) {
          resultsLog({
            transfersOk: this.transfersOk,
            claimsOk: this.claimsOk,
            accountsDone: this.totalAccountsDone,
            totalAccounts: ACCOUNTS.length,
          });
          process.exit(1);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async startClaim() {
    this.claimStarted = true;
    for (let i = 0; i < ACCOUNTS.length; i++) {
      this.claimAccount(ACCOUNTS[i]);
    }
  }

  async init() {
    this.providerWss._websocket.on("open", async () => {
      this.keepAliveInterval = setInterval(() => {
        this.providerWss._websocket.ping();
        this.pingTimeout = setTimeout(() => {
          this.providerWss._websocket.terminate();
        }, ArbClaimer.EXPECTED_PONG_BACK);
      }, ArbClaimer.KEEP_ALIVE_CHECK_INTERVAL);

      const currentBlock = await this.providerWss.getBlockNumber();
      this.claimStartBlock = (await this.DistributorContract.claimPeriodStart()).toNumber();

      scriptStartedLog(currentBlock, this.claimStartBlock);

      if (currentBlock >= this.claimStartBlock) {
        this.startClaim();
      }

      this.providerWss.on("block", async (blockNum) => {
        if (this.claimStarted) {
          return;
        }

        if (blockNum >= this.claimStartBlock) {
          claimStartedLog(blockNum);
          this.startClaim();
        } else {
          claimNotStartedLog(blockNum);
        }
      });
    });

    this.providerWss._websocket.on("close", (code) => {
      console.log(
        `Connection lost with code ${code}! Attempting reconnect in 1s...`
      );
      this.restart();
    });

    this.providerWss._websocket.on("pong", () => {
      // console.log(`Connection is alive`);
      clearInterval(this.pingTimeout);
    });

    this.providerWss._websocket.on("error", () => {
      console.error(`Unable to connect. Reconnect...`);
      this.restart();
    });
  }

  destroy() {
    this.providerWss._websocket.terminate();
    clearInterval(this.keepAliveInterval);
    clearTimeout(this.pingTimeout);
  }

  restart() {
    this.destroy();
    new ArbClaimer().init();
  }
}

(async () => {
  await new ArbClaimer().init();
})()