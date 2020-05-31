pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;

  function set(uint x) public  {
    storedData = x;
  }

  function get() public returns (uint)  {
    return storedData;
  }

  function test() public returns (string memory) {
    return "test completed";
  }
  }