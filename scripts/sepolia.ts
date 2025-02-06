//Get the balance of different not connected with signer wallets 

import hre, { ethers } from "hardhat";


const ERC20_ABI = [
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)"
]

async function main(){
    console.log("Connect to provide(RPC) started...")
    const provider = ethers.provider;
    const signer = await provider.getSigner()
    const contract = new ethers.Contract("0x4C749d097832DE2FEcc989ce18fDc5f1BD76700c", ERC20_ABI, signer)
    const totalSupply = await contract.balanceOf("0x06fcE1DF49EAEE62353a20bf3a817988675124b6")
    console.log("Total supply of the token is: ", totalSupply.toString())
}


main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })