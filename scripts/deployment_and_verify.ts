//Deployment and verification of contract using hardhat

import hre, { ethers } from "hardhat";

async function main(){

    console.log("Contract Creation started...")

    const [deployer] = await ethers.getSigners();

    const Demo = await ethers.getContractFactory("Demo", deployer);
    const demo = await Demo.deploy();
    await demo.waitForDeployment();

    console.log(`The contract address: ${await demo.getAddress()}`);

    // verification of Contract need to make after deployment of contract
    await hre.run("verify:verify", {
        address: "0x0Da982efb0076Fe497b1CA43C2243054CeeDe5B4",
    });
}

main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })