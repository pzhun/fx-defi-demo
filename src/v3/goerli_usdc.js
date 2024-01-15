const Compound = require("@compound-finance/compound-js"); // in Node.js

const goerliProvider =
  "https://goerli.infura.io/v3/80b7c7e614ec4623b7a3475487d8b82b";

var compound = new Compound(goerliProvider, {
  mnemonic:
    "keep find oxygen first depend urge fix unit stairs miss danger transfer", // preferably with environment variable
});
// const network =  'goerli_usdc'
// const collaterals = Compound.comet.getSupportedCollaterals(network);
const comet = compound.comet.GOERLI_USDC();

/// cUSDC 0x3EE77595A8459e93C2888b13aDB354017B198188
/// USDC  0x07865c6E87B9F70255377e024ace6630C1Eaa37F

// Ethers.js overrides are an optional last parameter
const trxOptions = { gasLimit: 250000, mantissa: false };

(async function () {
  const me = "0x642274bc94f720a3107992e630269f79b931c73d"; // can be compound._provider.address

  console.log("Supplying USDC to Compound Comet...");
  const trx = await comet.supply(
    me, // supplied asset comes from this account
    me, // supplied asset is credited to this account's balance
    Compound.USDC,
    1
  );
  console.log("Ethers.js transaction object", trx);
})().catch(console.error);

// (async function () {
//   console.log("Withdrawing USDC from my account...");
//   const trx = await comet.withdraw(Compound.USDC, 0.5);
//   console.log("Ethers.js transaction object", trx);
// })().catch(console.error);
