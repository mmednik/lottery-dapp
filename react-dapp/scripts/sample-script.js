const hre = require("hardhat");

async function main() {
  const QuiniCoin = await hre.ethers.getContractFactory("QuiniCoin");
  const quinicoin = await QuiniCoin.deploy();

  await quinicoin.deployed();

  console.log("QuiniCoin deployed to:", quinicoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
