// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ledger.sol";

contract LedgerFactory {
    mapping(address => address) public ledgers;

    function createLedger() public returns (address) {
        Ledger newLedger = new Ledger(msg.sender);
        ledgers[msg.sender] = address(newLedger);
        return address(newLedger);
    }

    function getLedger() public view returns (address) {
        return ledgers[msg.sender];
    }
}