const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock Tether Contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  // Deploy RWD contract
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  // Deploy DecentralBank contract
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = DecentralBank.deployed();

  // Transfer all RWD tokens to Decentral Bank
  await rwd.transfer(DecentralBank.address, "1000000000000000000000000");

  // Distribute 100 Tether tokens to investor
  await tether.transfer(accounts[1], "1000000000000000000");
};
