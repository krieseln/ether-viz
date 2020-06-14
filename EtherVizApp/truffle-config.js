const path = require("path");
const HDWalletProvider = require("./client/node_modules/@truffle/hdwallet-provider");
const MetaMaskMnemonic = "exotic arch fetch gospel buyer month useless false improve pill empty rack";

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        develop: {
            port: 8545
        },
        ropsten: {
            network_id: 3,
            host: '127.0.0.1',
            port: 8545,
            gas: 4000000,
            from: "0x49a3e37d06e7590db7318572253ce38293a3c4b5"
        }
    }
};
