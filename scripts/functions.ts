import hse, { ethers } from "hardhat";

async function main() {
    const provider = ethers.provider;
    const [signer, signer2] = await ethers.getSigners();
    const contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const demo = await ethers.getContractAt("Demo", contract_address, signer);
    console.log("demo:", await demo.owner());
    
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });