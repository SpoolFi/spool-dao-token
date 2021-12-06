// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.10;

import "./vendor/Ownable.sol";
import "./vendor/ERC20Pausable.sol";

/**
 * @dev The Spool DAO Token ERC20 Implementation.
 *
 * Pausable token implementation that mints the full initial supply.
 */
contract SpoolDaoToken is ERC20Pausable, Ownable {
    /**
     * @dev Configures the token's name & symbol, sets the owner,
     * and mints the initial supply to the provided address.
     */
    constructor(
        address owner,
        address holder
    )
        ERC20Pausable()
        ERC20("Spool DAO Token", "SPOOL")
    {
        transferOwnership(owner);
        _mint(holder, 210_000_000 * 1 ether);
    }

    /**
     * @dev Pause token transfers until unpaused.
     * Can only be called by the current owner.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause token transfers.
     * Can only be called by the current owner.
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}