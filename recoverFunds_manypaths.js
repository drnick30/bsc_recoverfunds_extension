// Donations are welcomed

// BNB
// bnb1eyvjl0zmp0wke36gxts4hu3wtgtnpw5dnj5ja3

// Ethereum / Ethereum Tokens / BNB / Binance Smart Chain Tokens
// 0x5Cd8C416d3061398b868dC2a5C835C9865caDc7E

// Litecoin
// ltc1qel8yaqz34pqqp87eey7zx0zz6jkk82wu65en6v

// Bitcoin
// bc1q75yh6ttwxazfhxnw3cwpqztvrkttjsh2a73mcy

// Bruteforce version of the recover script

// NOTE!!! Unless you are 100% certain that your seed will not
// be compromised by this, it's best to setup a new seed after
// the process.

// Enter the following command to install required packages
// !!! Or preferably copy them over to an offline device safely
// npm install ethereum-cryptography

// Usage of tool:
// node recoverFunds_brute.js

const { HDKey } = require("ethereum-cryptography/hdkey");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { mnemonicToSeedSync } = require("ethereum-cryptography/bip39");
const { publicKeyConvert } = require("ethereum-cryptography/secp256k1");

// Fill in values for following variables:
// Enter the address you want to find (the one where your funds are):
const targetAddr = "your address".toLowerCase();
// Fill in the Ledger Recovery Phrase below (24 words)
const mnemonic = "your seed";

// And optionally
// If you used a passphrase on your Ledger Device (the "25th" word),
// Enter it below or otherwise leave as is
const passphrase = "";

const pathIterations = 500;
const childIterations = 500;



const seed = mnemonicToSeedSync(mnemonic, passphrase);
const hdkey = HDKey.fromMasterSeed(seed);

function getAddress(comprPub) {
    const uncomprPub = Buffer.from(publicKeyConvert(comprPub, false));
    return `0x${keccak256(uncomprPub.slice(1)).toString("hex").slice(64-40)}`;
}

function tryPath(p) {
  parent = hdkey.derive(p);
  parentAddr = getAddress(parent.publicKey);
  for(let j = 0; j < childIterations; j++) {
    child = parent.deriveChild(j);
    childAddr = getAddress(child.publicKey);
    if(childAddr == targetAddr) {
      console.log(`Parent address: ${parentAddr}`);
      console.log(`Derivation path ${p}`);
      console.log(`Child ${j} address: ${childAddr}`);
      console.log(`Child Private Key: ${child.privateKey.toString("hex")}`);
      console.log("---");
      return 1;
    }
  }
  return 0;
}

let path;
let parent;
let parentAddr;
let child;
let childAddr;

for(let k = 0; k < pathIterations; k++) {
  let path = `m/44'/60'/${k}'`
  let res = tryPath(path);
  if(res === 1) { return; }
  for(let i = 0; i < pathIterations; i++) {
    path = `m/44'/60'/${k}'/${i}`;
    res = tryPath(path);
    if(res === 1) { return; }
    for(let j = 0; j < pathIterations; j++) {
      path = `m/44'/60'/${k}'/${i}/${j}`;
      res = tryPath(path);
      if(res === 1) { return; }
    }
  }
}

console.log("Address was not found.");
