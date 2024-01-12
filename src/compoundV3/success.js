const Compound = require("@compound-finance/compound-js"); // in Node.js

const arbProvider =
  "https://arbitrum-mainnet.infura.io/v3/80b7c7e614ec4623b7a3475487d8b82b";

var compound = new Compound(arbProvider, {
  mnemonic:
    "xxx", // preferably with environment variable
});
const comet = compound.comet.ARBITRUM_USDC();

// Ethers.js overrides are an optional last parameter
const trxOptions = { gasLimit: 250000, mantissa: false };

(async function () {
  const me = "0x642274bc94f720a3107992e630269f79b931c73d"; // can be compound._provider.address

  console.log("Supplying ETH to Compound Comet...");
  const trx = await comet.supply(
    me, // supplied asset comes from this account
    me, // supplied asset is credited to this account's balance
    Compound.USDC,
    1
  );
  console.log("Ethers.js transaction object", trx);
})().catch(console.error);
