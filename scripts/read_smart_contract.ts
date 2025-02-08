//Get the balance of different not connected with signer wallets 

import hre, { ethers } from "hardhat";


const ERC20_ABI = [
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function  name() view returns (string)",
]

async function main(){
    console.log("Connect to provide(RPC) started...")
    const provider = ethers.provider;
    const signer = await provider.getSigner()
    const contract = new ethers.Contract("0x8457CA5040ad67fdebbCC8EdCE889A335Bc0fbFB", ERC20_ABI, signer)
    const balanceOf = await contract.balanceOf("0xbe58fAE5B38cA7092Ea7D010d8Fd62295dB126D8")
    console.log(`Balance of address: ${ethers.formatEther(balanceOf)}`)
}


main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })