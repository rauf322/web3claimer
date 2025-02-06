import hre, { ethers } from "hardhat";

async function main(){
    console.log("Connect to provide(RPC) started...")
    const provider = ethers.provider;
    // //Using signers from hardhat 
    // const signer = await provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    // console.log(`Signer address: ${await signer.getAddress()}`);
    // //Return massive of signers
    // const [list_signer] = await ethers.getSigners();
    const signers = await ethers.getSigners()
    const address_1 = signers[0]
    const address_2 = signers[1]
    const address_1_balance = await provider.getBalance(await address_1.getAddress())
    const address_2_balance = await provider.getBalance(await address_2.getAddress())
    const amount_of_send = ethers.parseEther("0.1")
    const txData = {
        to:(await address_2.getAddress()),
        value: amount_of_send
    }
    const tx = await address_1.sendTransaction(txData)
    await tx.wait()
    console.log(`Transaction hash: ${tx.hash}`)
    console.log(`Balance of address_1: ${ethers.formatEther(address_1_balance)}`)
    console.log(`Balance of address_2: ${ethers.formatEther(address_2_balance)}`)
}



main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })