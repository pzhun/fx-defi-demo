const { ethers } = require("ethers");
const Compound = require("@compound-finance/compound-js"); // in Node.js
const goerliProvider =
  "https://goerli.infura.io/v3/80b7c7e614ec4623b7a3475487d8b82b";

const me = "0x642274bc94f720a3107992e630269f79b931c73d"; // can be compound._provider.address
const privateKey =
  "0563b5b95706759a33a7f3e62c7f1994502c9563241f439aca30cf4777bbd282";
// 创建一个 Provider，用于连接以太坊网络
const provider = new ethers.providers.JsonRpcProvider(goerliProvider);
const wallet = new ethers.Wallet(privateKey, provider);

// 合约地址
const contractAddress = Compound.util.getAddress(
  Compound.cETH,
  (network = "goerli")
); // cToken
console.log(contractAddress);
// 合约 ABI
const contractABI = Compound.util.getAbi("cEther");
// 创建一个合约实例
const contract = new ethers.Contract(contractAddress, contractABI, provider);
async function redeemUnderlying() {
  const amount = "0.001";
  const redeemAmount = ethers.utils.parseUnits(amount, "ether");

  const transaction = await contract.populateTransaction.redeemUnderlying(
    redeemAmount
  );
  transaction.to = contractAddress;
  transaction.from = me;
  transaction.gasLimit = 120000; // 输入 Gas 限制
  transaction.nonce = await wallet.getTransactionCount(); // 获取当前 nonce 值
  transaction.maxFeePerGas = ethers.utils.parseUnits("100", "gwei"); // 输入最高费用
  transaction.maxPriorityFeePerGas = ethers.utils.parseUnits("1.5", "gwei"); // 输入优先费用
  transaction.type = 2;
  transaction.chainId = 5;

  console.log("待签名交易：", transaction);

  const signedTransaction = await wallet.signTransaction(transaction);
  // console.log(signedTransaction);
  const transactionResponse = await provider.sendTransaction(signedTransaction);
  console.log(transactionResponse);
}

redeemUnderlying();
