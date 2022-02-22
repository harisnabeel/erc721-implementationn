const main = async () => {
  // getting deployer address
  const [deployer] = await hre.ethers.getSigners();
  // getting contract
  let LandContract = await ethers.getContractFactory("Land");
  const CONTRACT_ADDRESS = "0x71f979322D48c6670b8510b9b3030E675BE4353A";
  // pass deployed address to create its instance
  const LAND_CONTRACT_INSTANCE = await LandContract.attach(CONTRACT_ADDRESS);
  // creating/minting NFT
  let createNft = await LAND_CONTRACT_INSTANCE.connect(deployer)._mint({
    value: 1,
  });
  await createNft.wait();
  console.log("Minted successfully");
  // you can now call any function using contract instance. e.g
  // console.log(randomPerson1);

  // console.log("Hello World");
  // console.log("Haris nabeel here");
  // const Land = await hre.ethers.getContractFactory("Land");
  // const LandContract = await Land.deploy();
  // await LandContract.deployed();
  // console.log("Contract deployed to:", LandContract.address);

  // console.log("HAHAHAHA");
  // console.log(randomPerson1.address);
  // console.log("HAHAHAHA 222");
  // let createNft = await LandContract._mint({ value:1});
  // await createNft.wait();
  //  createNft = await LandContract.connect(randomPerson2)._mint({value:1});
  // await createNft.wait();
  //  createNft = await LandContract._mint({from:randomPerson2.address, value:1});
  // await createNft.wait();
  // console.log("Land created for" + randomPerson2);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
