pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;

  function set(uint x) public  {
    emit numberCast('Called Set function in SimpleStorage.sol with value:', x);
    storedData = x;
  }

  function get() public returns (uint)  {
    emit numberCast('Called get function in SimpleStorage.sol with value:', storedData);
    return storedData;
  }

  function test() public returns (string memory) {
    return "test completed";
  }

  event numberCast(string str, uint x);

}
