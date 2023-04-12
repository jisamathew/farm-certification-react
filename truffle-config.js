require('babel-register')
require('babel-polyfill')
require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const { INFURA_API_KEY, MNEMONIC } = process.env;

// const MNEMONIC = "powder heavy fashion ball off reflect discover giant current burst hero deliver"
// const INFURA_API_KEY = "https://goerli.infura.io/v3/8a5b650c60a84e89bf157e67221a997c";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
      network_id: '11155111',
      // gas: 4465030,
      timeoutBlocks: 200,
      networkCheckTimeout: 999999,  
      skipDryRun: true 
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider(MNEMONIC, INFURA_API_KEY)
      },
      network_id: '5', // eslint-disable-line camelcase
      timeoutBlocks: 200,
      networkCheckTimeout: 999999,  
      skipDryRun: true 
    }
    
  },
  contracts_directory:'./src/contracts/',
  contracts_build_directory:'./src/truffle_abis',

  solc: {
    version:'^0.5.0',
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}