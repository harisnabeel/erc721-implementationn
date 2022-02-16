const { expect } = require("chai");
const { ethers } = require("ethers");


describe("Land", async ()=> {
  let owner,add1,add2,myCoin;
beforeEach(async ()=>{
  const MyCoin = await hre.ethers.getContractFactory("Land");
  myCoin = await MyCoin.deploy();
  await myCoin.deployed();
  [owner,add1,add2] = await hre.ethers.getSigners();
})

it("Should return the right name and symbol", async function () {
  expect(await myCoin.name()).to.equal("My Land");
  expect(await myCoin.symbol()).to.equal("ML");
});

describe("Owner Checking", ()=>{
  it("Should set the right owner", async function(){
      expect(await myCoin.owner()).to.equal(owner.address);
  })
});

describe("Can mint NFT", ()=>{
  it("Should be able to Mint", async()=>{
      await myCoin.connect(add1)._mint({value:1});
     expect(await myCoin.balanceOf(add1.address)).to.equal(1);
  })
});

describe("Two times minting",()=>{

  it("Should not allow to mint 2 Lands",async ()=>{
    await myCoin.connect(add1)._mint({value:1});
    await expect(myCoin.connect(add1)._mint({value:1})).to.be.revertedWith("You can not have more than 1 Land");
  })
});

describe("Amount Received",()=>{
  it("Should only mint When 1 Eth is received",async()=>{
    let v = await (myCoin.connect(add1)._mint({value:1}));
    v.wait();
     expect( v.value.toString()).to.equal("1");
  })
});
  
});
