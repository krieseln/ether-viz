const path = require("path");


module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        develop: {
            port: 8545
        },
        local_net: {
            network_id: 1337,
            host: '127.0.0.1',
            port: 8545,
            gas: 4000000,
            from: "0x3590aca93338b0721966a8d0c96ebf2c4c87c544"
        }
    }
};
