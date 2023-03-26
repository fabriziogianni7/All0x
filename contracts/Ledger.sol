// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Ledger {
    mapping(uint256 => Transaction) public transactions;
    uint256 private transactionNumber;
    address public owner;
    string public name;
    IERC20 public immutable token;

    struct Transaction {
        bytes32 txID; //comes from the e-commerce
        string customerID; //comes from the e-commerce
        address customerAddress;
        uint256[] productIDs; //comes from ecommerce
        uint256 totalPaid;
        //address tokenPaidAddress;
        //string tokenPaidSymbol;
        uint256 timeStamp;
    }

    event TxRecorded(address indexed owner);


    constructor(address _owner, string memory _name,address _token) {
        owner = _owner;
        name = _name;
        token = IERC20(_token);
    }

    // TODO: mshould be able to doublecheck the price
    // Should be possible to pay with any token in the future...
    function recordTransaction(
        string memory _customerID,
        // address _customerAddress, // not needed
        uint256[] memory _productIDs // uint256 _totalPaid,
    ) public payable // address _tokenPaidAddress,
    // string memory _tokenPaidSymbol
    {
        //require(msg.value == _totalPaid, "Insufficient funds");
        uint256 _timeStamp = block.timestamp;
        bytes32 _txID = generateID(_customerID, _timeStamp);

        Transaction memory newTransaction = Transaction({
            txID: _txID,
            customerID: _customerID,
            customerAddress: address(msg.sender),
            productIDs: _productIDs,
            totalPaid: msg.value,
            //tokenPaidAddress: _tokenPaidAddress,
            // tokenPaidSymbol: _tokenPaidSymbol,
            timeStamp: _timeStamp
        });

        transactionNumber += 1;
        transactions[transactionNumber] = newTransaction;
        emit TxRecorded(owner);
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
            bytes32,
            string memory,
            address,
            uint256[] memory,
            uint256,
            uint256
        )
    {
        Transaction memory transaction = transactions[txID];
        return (
            transaction.txID,
            transaction.customerID,
            transaction.customerAddress,
            transaction.productIDs,
            transaction.totalPaid,
            transaction.timeStamp
        );
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        //not working
        uint256 txn = transactionNumber;
        Transaction[] memory txs = new Transaction[](txn);
        for (uint32 i; i < txn; i++) {
            txs[i] = transactions[i];
        }
        return txs;
    }

    function xReceive(
        bytes32 _transferId,
        uint256 _amount,
        address _asset,
        address _originSender,
        uint32 _origin,
        bytes memory _callData
    ) external returns (bytes memory) {
        // Check for the right token
        require(_asset == address(token), "Wrong asset received");
        // Enforce a cost to update the greeting
        require(_amount > 0, "Must pay at least 1 wei");

        // Unpack the _callData
       (string memory _customerID, address _customerAddress, uint256[] memory _productIDs, uint256 _totalPaid) = abi.decode(_callData, (string, address, uint256[], uint256));

        uint256 _timeStamp = block.timestamp;
        bytes32 _txID = generateID(_customerID, _timeStamp);

        Transaction memory newTransaction = Transaction({
            txID: _txID,
            customerID: _customerID,
            customerAddress: _customerAddress,
            productIDs: _productIDs,
            totalPaid: _totalPaid,
            //tokenPaidAddress: _tokenPaidAddress,
            // tokenPaidSymbol: _tokenPaidSymbol,
            timeStamp: _timeStamp
        });

        transactionNumber += 1;
        transactions[transactionNumber] = newTransaction;

        emit TxRecorded(owner);
    }
}
