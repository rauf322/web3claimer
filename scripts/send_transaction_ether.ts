//WORK WITH HARDHAT 

import hre, { ethers } from "hardhat";


async function get_wallets(){
    const provider = ethers.provider;
    const signers = await ethers.getSigners()
    const ADDRESS1 = signers[0]
    const ADDRESS2 = signers[1]
    return ({ADDRESS1, ADDRESS2,provider})
}

async function main(){
    const {ADDRESS1, ADDRESS2,provider} = await get_wallets()
    await send_ethereum(ADDRESS1, ADDRESS2, provider)
}



async function get_balance(address: any, provider: any){
    const balance = await provider.getBalance(await address.getAddress())
    return balance
}
//parseEther - convert ether to wei
//formatEther - convert wei to ether
async function send_ethereum(ADDRESS1: any, ADDRESS2: any, provider: any){
    const addressBalance1 = await get_balance(ADDRESS1, provider)
    const addressBalance2 = await get_balance(ADDRESS2, provider)
    const minBalanceRequired = ethers.parseEther("0.0001");
    const amountOfSend = addressBalance2 - minBalanceRequired;
    console.log(amountOfSend)
    const tx = await ADDRESS2.sendTransaction({
        to:(await ADDRESS1.getAddress()),
        value: amountOfSend
    })
    await tx.wait()
    console.log(`Transaction hash: ${tx.hash}`)
    console.log(`Balance of address_1: ${ethers.formatEther(await get_balance(ADDRESS1, provider))}`)
    console.log(`Balance of address_2: ${ethers.formatEther(await get_balance(ADDRESS2, provider))}`)
}




main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })

