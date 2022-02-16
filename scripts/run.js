const main = async () => {

  // const accounts = await ethers.provider.listAccounts();
  // console.log(accounts);
  // get contract with name
    const [randomPerson1, randomPerson2] = await hre.ethers.getSigners();

    let contractInstance = await ethers.getContractFactory("Land");
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  //   // pass deployed address to create its instance
    const Cinstance = await contractInstance.attach(address);

  //  // console.log(contractInstance);
    let createNft = await Cinstance.connect(randomPerson2)._mint({value: 1});
    await createNft.wait();
  //   console.log("done");
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