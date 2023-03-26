// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ledger.sol";

contract LedgerFactory {
    mapping(address => address) public ledgers;
    event LedgerCreated(address indexed owner, string name);

    function createLedger(string memory _name, address _token)
        public
        returns (address)
    {
        Ledger newLedger = new Ledger(msg.sender, _name, _token);
        ledgers[msg.sender] = address(newLedger);
        emit LedgerCreated(msg.sender, _name);
        return address(newLedger);
    }

    function getLedger() public view returns (address) {
        return ledgers[msg.sender];
    }
}
