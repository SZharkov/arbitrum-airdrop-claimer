import chalk from "chalk";

const scan = `https://arbiscan.io/`

export const claimedOkLog = (accountId, amount, hash) => console.log(`${chalk.bgGreenBright.whiteBright(`  [${accountId}] Claimed ${amount} $ARB. ${scan}/tx/${hash}`)}`);
export const claimedFailLog = (accountId, address) => console.log(`${chalk.bgRedBright.whiteBright(`  [${accountId}] Claim wasn't successful for ${address}`)}`);
export const transferOkLog = (accountId, amount, hash) => console.log(`${chalk.bgGreenBright.whiteBright(`  [${accountId}] Transferred ${amount} $ARB. ${scan}/tx/${hash}`)}`);
export const transferFailLog = (accountId, address) => console.log(`${chalk.bgRedBright.whiteBright(`  [${accountId}] Transfer wasn't successful for ${address}`)}`);
export const claimNotStartedLog = (blockNum) => console.log(`${chalk.bgYellow.whiteBright(`  [${blockNum}] Claim not started yet. Waiting for the next block.`)}`);
export const claimStartedLog = (blockNum) => console.log(`${chalk.bgGreenBright.whiteBright(`  [${blockNum}] Claim started!`)}`);
export const scriptStartedLog = (block, claimBlock) => console.log(`${chalk.bgGreenBright.whiteBright(`  Script started. Current block - ${block}. Claim block - ${claimBlock}`)}`);

export const welcomeLog = () => console.log(`
${chalk.bgBlueBright.whiteBright(`
  𝗔𝗥𝗕 𝗖𝗟𝗔𝗜𝗠𝗘𝗥`)}
${chalk.cyanBright(`
  Developed by Sergey Investing:
  https://t.me/sergeyipo
  https://twitter.com/zharkov_crypto
  https://www.youtube.com/@sergey-investing
  
  Donate addresses:
  ${chalk.bgYellowBright.whiteBright("TW3rUPuyXCTAZZVUMYR4i1z5i1SWPPXgGA")} - USDT [TRC20]
  ${chalk.bgYellowBright.whiteBright("0x04652fdae61031153674f35c5153f42825d9a5a1")} - USDC USDT ETH [Ethereum Polygon Arbitrum Optimism]
`)}
`);

export const resultsLog = ({
                             accountsDone,
                             totalAccounts,
                             claimsOk,
                             transfersOk
                           }) => console.log(`
${chalk.bgBlueBright.whiteBright(`
  𝗔𝗥𝗕 𝗖𝗟𝗔𝗜𝗠𝗘𝗥 𝗥𝗘𝗦𝗨𝗟𝗧𝗦`)}
${chalk.cyanBright(`
  Accounts done: ${accountsDone}/${totalAccounts}
  Successful claims: ${claimsOk}/${totalAccounts}
  Successful transfers: ${transfersOk}/${totalAccounts}`)}
${chalk.cyanBright(`
  Developed by Sergey Investing:
  https://t.me/sergeyipo
  https://twitter.com/zharkov_crypto
  https://www.youtube.com/@sergey-investing
  
  Donate addresses:
  ${chalk.bgYellowBright.whiteBright("TW3rUPuyXCTAZZVUMYR4i1z5i1SWPPXgGA")} - USDT [TRC20]
  ${chalk.bgYellowBright.whiteBright("0x04652fdae61031153674f35c5153f42825d9a5a1")} - USDC USDT ETH [Ethereum Polygon Arbitrum Optimism]
`)}`);
