//Get the balance of different not connected with signer wallets 

import hre, { ethers } from "hardhat";


const ERC20_ABI = [
    "function claimFromPools(address[]) public",
    "function startRedemption(uint256 amount, uint256 duration) public",
    "function multicall(bytes[]) public"
]

async function main(){
    console.log("Connect to provide(RPC) started...")
    const provider = ethers.provider;
    const signer = await ethers.getSigners()
    await get_esxai(signer[2])
    await redeem_esxai(signer[2])
    await claim_veCarv(signer[2])
}

async function claim_veCarv(address:any){
    const contract = new ethers.Contract("0xa91fF8b606BA57D8c6638Dd8CF3FC7eB15a9c634", ERC20_ABI, address);
    const tx = await contract.multicall(["0xac9650d800000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000240962ef79000000000000000000000000000000000000000000000000000000000000122300000000000000000000000000000000000000000000000000000000"])
    await tx.wait()
    console.log(tx)
}


async function get_esxai(address:any){
    const contract = new ethers.Contract("0xF9E08660223E2dbb1c0b28c82942aB6B5E38b8E5", ERC20_ABI, address)
    const tx = await contract.claimFromPools(["0x7b9F49fc73C380E13a0bDCf91B53C0AE612Df8BF","0x76B1121F1861e38a290eC980143149D5695B9997"])
    await tx.wait()
    console.log(tx)
}

async function redeem_esxai(address:any){
    const contract = new ethers.Contract("0x4C749d097832DE2FEcc989ce18fDc5f1BD76700c", ERC20_ABI, address)
    const amount = BigInt("59086123666357413264"); // Use BigInt
    const duration = 15552000; // This is fine since it's small
    const tx = await contract.startRedemption(amount, duration);
    await tx.wait()
    console.log(tx)
}

main()
    .then(() => process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })