pragma solidity ^0.5.0;

contract Tether {
    string public name = "Mosk Tether Token";
    string public symbol = "mUSDT";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

  // indexed allows us to filter through the address
    event Transfer(
        address indexed _from,  
        address indexed _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexrd _spender,
        uint _value
    )

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= tokens);
        require(tokens > 0);

        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint25 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }
}
