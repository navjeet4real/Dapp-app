const { expect } = require("chai");

// describe("Token contract", function() {
//     it("Deployment shoul assign supply of total tokens to owner", async function() {

//         const[owner] = await ethers.getSigners();

//         console.log("Signers object", owner);

//         const Token = await ethers.getContractFactory("Token")

//         const hardhatToken = await Token.deploy();

//         const ownerBalance = await hardhatToken.balanceOf(owner.address);


//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
//     })
//     it("Should transfer tokens between accounts", async function() {

//         const[owner, address1, address2] = await ethers.getSigners();

//         const Token = await ethers.getContractFactory("Token")

//         const hardhatToken = await Token.deploy();

//         await hardhatToken.transfer(address1.address, 10);
//         expect(await hardhatToken.balanceOf(address1.address)).to.equal(10);

//         //transfer 5 tokens from address1 to address2
//         await hardhatToken.connect(address1).transfer(address2.address, 5)
//         expect(await hardhatToken.balanceOf(address2.address)).to.equal(5);
//     })

// });


describe("Token Contract", function () {
    let Token;
    let hardhatToken;
    let owner;
    let address1;
    let address2;
    let address;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, address1, address2, ...address] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    })

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })
        it("Should assign the tottal supply of tokens to the owner", async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
    })
    describe("Transaction", function () {
        it("should transfer tokens between accounts", async function () {
            await hardhatToken.transfer(address1.address, 5);
            const address1Balance = await hardhatToken.balanceOf(address1.address);
            expect(address1Balance).to.equal(5);

            await hardhatToken.connect(address1).transfer(address2.address, 5);
            const address2Balance = await hardhatToken.balanceOf(address2.address);
            expect(address2Balance).to.equal(5);
        })
        it("should fail if sender doesn't have enough tokens", async function () {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(address1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens");

            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance)
        })
        it("should update balances after transfer",async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(address1.address,5);
            await hardhatToken.transfer(address2.address,10);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            
            expect(finalOwnerBalance).to.equal(initialOwnerBalance-15);

            const address1Balance = await hardhatToken.balanceOf(address1.address);
            expect(address1Balance).to.equal(5);

            const address2Balance = await hardhatToken.balanceOf(address2.address);
            expect(address2Balance).to.equal(10);
        })
    })
})