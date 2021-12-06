require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: "0.8.10",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1_000_000,
            },
        },
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: false,
            tags: ["local"],
        },
        mainnet: {
            url: process.env.MAINNET_URL || "",
            accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
            tags: ["main"],
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};
