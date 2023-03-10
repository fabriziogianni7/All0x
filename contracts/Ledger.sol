// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ledger {
    mapping(uint256 => Transaction) public transactions;
    uint256 private transactionNumber;
    address public owner;

    struct Transaction {
        bytes32 txID; //comes from the e-commerce
        string customerID; //comes from the e-commerce
        address customerAddress;
        uint256[] productIDs; //comes from ecommerce
        uint256 totalPaid;
        address tokenPaidAddress;
        string tokenPaidSymbol;
        uint256 timeStamp;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    // Should be possible to pay with any token in the future...
    function recordTransaction(
        string memory _customerID,
        address _customerAddress,
        uint256[] memory _productIDs,
        uint256 _totalPaid,
        address _tokenPaidAddress,
        string memory _tokenPaidSymbol
    ) public payable {
        require(msg.value == _totalPaid, "Insufficient funds");
        uint256 _timeStamp = block.timestamp;
        bytes32 _txID = generateID(_customerID, _timeStamp);

        Transaction memory newTransaction = Transaction({
            txID: _txID,
            customerID: _customerID,
            customerAddress: _customerAddress,
            productIDs: _productIDs,
            totalPaid: _totalPaid,
            tokenPaidAddress: _tokenPaidAddress,
            tokenPaidSymbol: _tokenPaidSymbol,
            timeStamp: _timeStamp
        });


        transactionNumber += 1;
        transactions[transactionNumber] = newTransaction;
    }

    function generateID(string memory _customerID, uint256 _timeStamp)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_customerID, _timeStamp));
    }

    function getTransaction(uint256 txID)
        public
        view
        returns (
            string memory,
            address,
            uint256[] memory,
            uint256,
            address,
            string memory,
            uint256
        )
    {
        Transaction memory transaction = transactions[txID];
        return (
            transaction.customerID,
            transaction.customerAddress,
            transaction.productIDs,
            transaction.totalPaid,
            transaction.tokenPaidAddress,
            transaction.tokenPaidSymbol,
            transaction.timeStamp
        );
    }

    function getAllTransactions() public view returns (Transaction[] memory){
        uint256 txn = transactionNumber;
        Transaction[] memory txs = new Transaction[](txn);
        for (uint32 i; i<txn; i++){
            txs[i] = transactions[i];
        }
        return txs;
    }
}