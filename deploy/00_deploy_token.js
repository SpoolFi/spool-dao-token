module.exports = async function ({ deployments, network, getNamedAccounts, getChainId }) {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("Deploying Spool DAO Token to chain id:", await getChainId());

    let ownerAddress;
    let holderAddress;

    if (network.tags.main) {
        ownerAddress = process.env.TOKEN_OWNER;
        holderAddress = process.env.TOKEN_HOLDER;
    } else {
        ownerAddress = process.env.TOKEN_OWNER_TEST;
        holderAddress = process.env.TOKEN_HOLDER_TEST;
    }

    if (!ownerAddress) {
        throw new Error("Configure owner address");
    }

    if (!holderAddress) {
        throw new Error("Configure holder address");
    }

    const token = await deploy("SpoolDaoToken", {
        from: deployer,
        args: [ownerAddress, holderAddress],
        log: true,
    });

    console.log("Spool DAO Token deployed to:", token.address);
    console.log("Spool DAO Token owner address:", ownerAddress);
    console.log("Spool DAO Token holder address:", holderAddress);
};

module.exports.tags = ["SpoolDaoToken"];
