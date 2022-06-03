pragma solidity >=0.5.0 < 0.9.0;

contract Token(
    string public name = "Wojtek Bear";
    string public symbol = "WTK";
    uint public totalSupply = 10000;

    address public owner;
    mapping (address => uint) balances;

    constructor(){
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, unint amount) external{
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

)