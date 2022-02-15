const main = async () => {
  const Land = await hre.ethers.getContractFactory("Land");
  const LandContract = await Land.deploy();
  await LandContract.deployed();
  console.log("Contract deployed to:", LandContract.address);
  const [randomPerson1, randomPerson2] = await hre.ethers.getSigners();
  console.log("HAHAHAHA");
  console.log(randomPerson1.address);
  console.log("HAHAHAHA 222");
  let createNft = await LandContract._mint({ value:1});
  await createNft.wait();
   createNft = await LandContract.connect(randomPerson2)._mint({value:1});
  await createNft.wait();
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