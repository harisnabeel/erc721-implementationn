const { expect } = require("chai");
const { ethers } = require("ethers");


describe("Land Contract", async ()=> {
  let owner,myCoin,accounts=[];
beforeEach(async ()=>{
  const MyCoin = await hre.ethers.getContractFactory("Land");
  myCoin = await MyCoin.deploy();
  await myCoin.deployed();
  accounts = await hre.ethers.getSigners();
  owner = accounts[0];
})

it("Should return the right name and symbol", async function () {
  expect(await myCoin.name()).to.equal("My Land");
  expect(await myCoin.symbol()).to.equal("ML");
});

describe("After deployment of Contract", ()=>{
  it("Should set the right owner", async function(){
      expect(await myCoin.owner()).to.equal(owner.address);
  })
});

describe("Mint function", ()=>{
  it("Should be able to Mint", async()=>{
      await myCoin.connect(accounts[1])._mint({value:1});
     expect(await myCoin.balanceOf(accounts[1].address)).to.equal(1);
  })
});

describe("Two times minting",()=>{

  it("Should not allow to mint 2 Lands",async ()=>{
    await myCoin.connect(accounts[1])._mint({value:1});
    await expect(myCoin.connect(accounts[1])._mint({value:1})).to.be.revertedWith("You can not have more than 1 Land");
  })
});

describe("Mint when ether is received",()=>{
  it("Should only mint When 1 Eth is received",async()=>{
    let mintTransaction = await (myCoin.connect(accounts[1])._mint({value:1}));
    mintTransaction.wait();
     expect( mintTransaction.value.toString()).to.equal("1");
  })
});

describe("Approve",()=>{
  it("should allow owner to approve token against an address",async()=>{
    let mintTransaction = await (myCoin.connect(accounts[1])._mint({value:1}));
    mintTransaction.wait();
    await myCoin.connect(accounts[1]).approve(accounts[2].address,1);
    let approvedAddress = await myCoin.connect(accounts[1]).getApproved(1);
    expect(accounts[2].address).to.equal(approvedAddress);
  })
})

describe("With single-step transfer scenerio",()=>{
  it("Should transfer the Land",async()=>{
    let mintTransaction = await (myCoin.connect(accounts[1])._mint({value:1}));
    mintTransaction.wait();
    let transferTransaction = await myCoin.connect(accounts[1]).transferFrom(accounts[1].address,accounts[2].address,1);
    transferTransaction.wait();
    let newOwner = await myCoin.connect(accounts[1]).ownerOf(1); 
    expect(newOwner).to.equal(accounts[2].address);
  })

  describe("With two-step transfer scenerio",()=>{
    it("should approve and then transfer the Land when the approved address calls transferFrom",async()=>{
    let mintTransaction = await (myCoin.connect(accounts[1])._mint({value:1}));
    mintTransaction.wait();
    await myCoin.connect(accounts[1]).approve(accounts[2].address,1);
    await myCoin.connect(accounts[2]).transferFrom(accounts[1].address, accounts[2].address, 1);
    let newOwner = await myCoin.connect(accounts[1]).ownerOf(1); 
    expect(newOwner).to.equal(accounts[2].address);
    })
    
    it("should approve and then transfer the Land when the approved owner calls transferFrom",async()=>{
      let mintTransaction = await (myCoin.connect(accounts[1])._mint({value:1}));
      mintTransaction.wait();
      await myCoin.connect(accounts[1]).approve(accounts[2].address,1);
      await myCoin.connect(accounts[1]).transferFrom(accounts[1].address, accounts[2].address, 1);
      let newOwner = await myCoin.connect(accounts[1]).ownerOf(1); 
      expect(newOwner).to.equal(accounts[2].address);
      })
  })
})
  
});
