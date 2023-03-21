import { ethers } from "ethers";
import { ACCOUNTS, CONFIG, DEXES } from "./config.js";
import { formatEther } from "ethers/lib/utils.js";

/* ABI */
import erc20Abi from "./abi/erc20.json" assert { type: "json" };

const DEXES_ARR = Object.values(DEXES);

(async () => {
  const provider = new ethers.providers.JsonRpcProvider(CONFIG.rpc_arb_http);

  for (let i = 0; i < ACCOUNTS.length; i++) {
    const account = ACCOUNTS[i];
    const wallet = new ethers.Wallet(account.privateKey, provider);
    const ArbContract = new ethers.Contract(CONFIG.arbTokenAddress, erc20Abi, wallet);

    for (let y = 0; y < DEXES_ARR.length; y++) {
      const dexAddress = DEXES_ARR[y];
      const dexName = Object.keys(DEXES)[y];
      const currentApprove = await ArbContract.allowance(wallet.address, dexAddress);

      if (Number(formatEther(currentApprove)) > 0) {
        console.log(`[${wallet.address}] Already approved $ARB for ${dexName}`);
      } else {
        const approveTx = await ArbContract.approve(DEXES_ARR[y], ethers.constants.MaxUint256);
        const approveTxWait = await provider.waitForTransaction(approveTx.hash);

        if (approveTxWait.status) {
          console.log(`[${wallet.address}] Approved $ARB for ${dexName}`);
        } else {
          console.log(`[${wallet.address}] Approve failed for ${dexName}`);
        }
      }
    }
  }
})()