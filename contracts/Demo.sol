//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;


contract Demo{
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(owner == msg.sender, "You are't owner");
        _;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    receive()external payable{
    }

    function withdraw () external payable onlyOwner{
        payable(owner).transfer(address(this).balance);
    }

    function changeOwner(address _address) external payable onlyOwner{
        require(msg.value >= 0.0005 ether, "Incorrect amount of Ether");
        owner = _address;
    }
}