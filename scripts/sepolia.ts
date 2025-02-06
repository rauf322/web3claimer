//Get the balance of different not connected with signer wallets 

import hre, { ethers } from "hardhat";

async function main(){
    console.log("Connect to provide(RPC) started...")
    const provider = ethers.provider;
    const signer = await provider.getSigner()
    const balance = await provider.getBalance("0x7e363a03B4952C1C0Ea14fBD7D8bd4C027AE8293")
    console.log(`${Number(await ethers.formatEther(balance)) * 3000} `)
}


main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })