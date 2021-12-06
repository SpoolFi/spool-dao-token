const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Spool DAO Token", function () {
    let signers;
    let token;
    let owner;
    let tokenHolder;
    let user;

    beforeEach(async () => {
        signers = await ethers.getSigners();

        owner = signers[1];
        tokenHolder = signers[2];
        user = signers[3];

        const SpoolDaoToken = await ethers.getContractFactory("SpoolDaoToken");
        token = await SpoolDaoToken.deploy(owner.address, tokenHolder.address);
        await token.deployed();
    });

    it("Should have correct name and symbol", async () => {
        const symbol = await token.symbol();
        const name = await token.name();

        expect(symbol).to.equal("SPOOL");
        expect(name).to.equal("Spool DAO Token");
    });

    it("Should have total supply of 210 million", async () => {
        const totalSupply = 210_000_000;
        const actualTotalSupply = await token.totalSupply();

        expect(actualTotalSupply.toString()).to.equal(ethers.utils.parseEther(totalSupply.toString()).toString());
    });

    it("Token holder should have all the tokens", async () => {
        const totalSupply = await token.totalSupply();
        const tokenHolderBalance = await token.balanceOf(tokenHolder.address);

        expect(totalSupply.toString()).to.equal(tokenHolderBalance.toString());
    });

    it("Should transfer funds to another address", async () => {
        const transferAmount = ethers.utils.parseEther("1000");

        await token.connect(tokenHolder).transfer(user.address, transferAmount);

        const userBalance = await token.balanceOf(user.address);
        expect(transferAmount.toString()).to.equal(userBalance.toString());
    });

    it("Should revert transfer when contract is paused", async () => {
        await token.connect(owner).pause();

        await expect(token.connect(tokenHolder).transfer(user.address, "1000")).to.be.revertedWith(
            "ERC20Pausable: token transfer while paused"
        );
    });

    it("Pause and unpause, should be able to transfer funds to another addres", async () => {
        await token.connect(owner).pause();
        await token.connect(owner).unpause();

        const transferAmount = ethers.utils.parseEther("1000");
        await token.connect(tokenHolder).transfer(user.address, transferAmount);

        const userBalance = await token.balanceOf(user.address);
        expect(transferAmount.toString()).to.equal(userBalance.toString());
    });

    it("Should revert if non-owner calls pause", async () => {
        await expect(token.connect(user).pause()).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should revert if non-owner calls unpause", async () => {
        await token.connect(owner).pause();
        await expect(token.connect(user).unpause()).to.be.revertedWith("Ownable: caller is not the owner");
    });
});
