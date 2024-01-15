const Compound = require("@compound-finance/compound-js"); // in Node.js
const goerliProvider =
  "https://goerli.infura.io/v3/80b7c7e614ec4623b7a3475487d8b82b";
var compound = new Compound(goerliProvider, {
  mnemonic:
    "keep find oxygen first depend urge fix unit stairs miss danger transfer", // preferably with environment variable
});

/// ceth address 0x64078a6189Bf45f80091c6Ff2fCEe1B15Ac8dbde



(async function () {
  console.log("Supplying ETH to the Compound Protocol...");
  const trx = await compound.supply(Compound.ETH, 0.001);
  console.log("Ethers.js transaction Supplying", trx);
})().catch(console.error);

// (async function () {
//   console.log("Redeeming ETH...");
//   const trx = await compound.redeem(Compound.ETH, 0.001); // also accepts cToken args
//   console.log("Ethers.js transaction Redeeming", trx);
// })().catch(console.error);
