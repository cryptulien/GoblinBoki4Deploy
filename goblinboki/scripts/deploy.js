// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ContractFactory = await hre.ethers.getContractFactory(GoblinBoki) // the file name under 'contracts' folder, without '.sol'
  const Contract = await ContractFactory.deploy('GoblinBoki', 'GBWTF', '1654905790', 'ipfs://bafybeihvix3qzisbxe5zst3ay4secnugcgnhfvjmvp36pzb4kg7etvqz4y/', [0x66957Cc52718b4dB8dE1E6d61611c33A602b1479, 0xE165dB045dCa6f50fe3629F99Db8722D2a821834, 0x0693546563BED822F7eB572F9b20c6Bd25ff8c9a], [3333, 3333, 3334]) // the constructor params
  await Contract.deployed()
  console.log("Contract deployed to:", Contract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
