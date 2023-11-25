# ETH RECOVERY TOOL

This is a forked version of the BSC tool. 

This tool will help if you have generated an address on EVM-compatible wallets that does not let you spend the money although it will request Ledger to approve the transaction. It's due to the fact that in some cases the extension will generate an address using a different derivation path than intended. This tool will likely help give users recover that money.

Discussion about the issue:

https://old.reddit.com/r/ledgerwallet/comments/nmr43f/psa_bug_in_binance_chain_wallet_chrome_extension/

https://old.reddit.com/r/ledgerwallet/comments/mnj9vx/missing_address_for_binance_smart_chain_generated/



The tool is simple but requires the Ledger Recovery Phrase. It's recommended to do it on an offline device. It's preferred to use
a live OS such as Tails OS to do this with networking disabled.

Donations are always welcomed as I do not ask for any payment to release this.





// Ethereum / Ethereum Tokens / BNB / Binance Smart Chain Tokens
// 0x4343B87B170ED18cBF584086b310B2feEd345d95

// Litecoin
// ltc1qc08rwh0f0dr25q43222thux96er32c3ulrm3l2

// Bitcoin
// bc1q89lxfpcvuf74nqdt4vy05fsrryewffxg8eekuu

The tool was written in NodeJS and is very simple to use.

You need to have NodeJS installed (and npm with it)

There are three versions of the script. recoverFunds.js only checks the 0 index address (it is the one that I personally found the address with), recoverFunds_brute.js which checks as many child addresses as needed and recoverFunds_manypaths.js

First go to the folder where recoverFunds.js, recoverFunds_brute.js or recoverFunds_manypaths.js

Then edit the file recoverFunds*.js by adding your ledger recovery phrase (the 24 words) to its place by editing the mnemonic variable. Optionally also add the passphrase in case you used a "25th" word on your ledger.

If you're using the brute version of the script, do the aforementioned steps and then enter the target address as well as how many iterations you wish to run. Currently, the script will be able to try different path values each ranging from 0...pathIterations. 0...childIterations children is derived for each path. If needed, it might be worthwhile to experiment with different kinds of paths depending on the use case. This script should give a good idea of how it all works.

If you have networking enabled, simply install the required dependency:
```
npm install ethereum-cryptography
```
Then run the script:
```
node recoverFunds.js
```
OR
```
node recoverFunds_brute.js
```

Ensure that the address printed is correct and then proceed to import the private key to a wallet you prefer. I would recommend Metamask.

If you do not have networking enabled, you could install the dependencies on another machine and safely move the node_modules folder or get the files from https://github.com/ethereum/js-ethereum-cryptography. Please note you might need to manually get the dependencies for that library as well which is otherwise done by npm.

For each parent address, this variable is the number of child indices that are checked

For example, for parent path m/44'/60'/100'/100/100, child indices will be checked from

m/44'/60'/100'/100/100/0 ... m/44'/60'/100'/100/100/20
