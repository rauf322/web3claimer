import { ethers } from "hardhat";

async function main(){

    console.log("Contract Creation started...")

    const [deployer] = await ethers.getSigners();

    const Demo = await ethers.getContractFactory("Demo", deployer);
    const demo = await Demo.deploy();
    await demo.waitForDeployment();

    console.log(`The contract address: ${await demo.getAddress()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })