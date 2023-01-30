const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {


  const mCardContract = await ethers.getContractFactory("MCard");

  // deploy the contract
  const deployedmCardContract = await mCardContract.deploy(
  );

  // print the address of the deployed contract
  console.log(
    "MCard Contract Address:",
    deployedmCardContract.address
  );

  console.log("Sleeping");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(50000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedmCardContract.address,
    constructorArguments: [],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });