//Get the balance of different not connected with signer wallets

import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import hre, { ethers } from 'hardhat'
import fs from 'fs'
import path from 'path'

const ERC20_ABI = [
    //esxai
    'function claimFromPools(address[]) public',
    //esxai redeeming
    'function startRedemption(uint256 amount, uint256 duration) public',
    //esxai claim xai
    'function completeRedemption(uint256 index) public',
    //esxai and veCarv balanceOf
    'function balanceOf(address account) public view returns (uint256)',
    //veCarv claim
    'function multicall(bytes[]) public',
    //veCarv withdraw
    'function withdraw(uint256 amount, uint256 duration) public',
    //xai transfer
    'function transfer(address to, uint256 amount) public',
]

async function main() {
    try {
        console.log('Connect to provide(RPC) started...')
        const provider = ethers.provider
        const signers: HardhatEthersSigner[] = await ethers.getSigners()
        const signer: HardhatEthersSigner = signers[2]
        await claim_esxai(signer)
        await redeem_esxai(signer)
        await claim_xai(signer)
        await send_xai(signer)
        await claim_veCarv(signer)
        await redeem_veCarv(signer)
    } catch (e) {
        console.log('Error at main ❌😵❌ see error below:')
        console.log(e)
    }
}

async function claim_veCarv(address: HardhatEthersSigner) {
    try {
        const contract = new ethers.Contract(
            '0xa91fF8b606BA57D8c6638Dd8CF3FC7eB15a9c634',
            ERC20_ABI,
            address
        )
        const tx = await contract.multicall([
            '0xac9650d800000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000240962ef79000000000000000000000000000000000000000000000000000000000000122300000000000000000000000000000000000000000000000000000000',
        ])
        await tx.wait()
        console.log('Successfully claimed veCarv ✅')
    } catch (e) {
        console.log('Error at claim veCarv ❌😵❌ see error below:')
        console.log(e)
    }
}

async function redeem_veCarv(address: HardhatEthersSigner) {
    try {
        const contract = new ethers.Contract(
            '0x2b790Dea1f6c5d72D5C60aF0F9CD6834374a964B',
            ERC20_ABI,
            address
        )
        const amount = await contract.balanceOf(address.address)
        if (Number(ethers.formatEther(amount)) > 100) {
            const duration = 12960000
            const tx = await contract.withdraw(amount, duration)
            await tx.wait()
            console.log(`Successfully redeemed veCarv ${ethers.formatEther(amount)} ✅`)
        } else {
            console.log(
                `Not enough veCarv to redeem ${ethers.formatEther(amount)} 😿`
            )
        }
    } catch (e) {
        console.log('Error at redeem veCarv ❌😵❌ see error below:')
        console.log(e)
    }
}

async function claim_esxai(address: HardhatEthersSigner) {
    try {
        const contract = new ethers.Contract(
            '0xF9E08660223E2dbb1c0b28c82942aB6B5E38b8E5',
            ERC20_ABI,
            address
        )
        const tx = await contract.claimFromPools([
            '0x7b9F49fc73C380E13a0bDCf91B53C0AE612Df8BF',
            '0x76B1121F1861e38a290eC980143149D5695B9997',
        ])
        await tx.wait()
        const balance = await contract.balanceOf(address.address)
        console.log(
            `Successfully claimed esxai amount of:${ethers.formatEther(
                balance
            )} ✅`
        )
    } catch (e) {
        console.log('Error: at claim_esxai ❌😵❌ see error below:')
        console.log(e)
    }
}

async function redeem_esxai(address: HardhatEthersSigner) {
    try {
        const contract = new ethers.Contract(
            '0x4C749d097832DE2FEcc989ce18fDc5f1BD76700c',
            ERC20_ABI,
            address
        )
        const amount = await contract.balanceOf(address.address)
        if (Number(ethers.formatEther(amount)) >= 75) {
            const duration = 15552000
            const tx = await contract.startRedemption(amount, duration)
            await tx.wait()
            // console.log(tx)
            console.log(`Successfully redeemed esxai ${ethers.formatEther(amount)} ✅`)
        } else {
            console.log(
                `Not enough esxai to redeem ${ethers.formatEther(amount)}😿`
            )
        }
    } catch (e) {
        console.log('Error at redeem esxai ❌😵❌ see error below:')
        console.log(e)
    }
}

async function claim_xai(address: HardhatEthersSigner) {
    const filePath = path.join(__dirname, 'number_of_claim.txt')
    const number_of_claim = Number(fs.readFileSync(filePath, 'utf-8'))
    try {
        let contract = new ethers.Contract(
            '0x4C749d097832DE2FEcc989ce18fDc5f1BD76700c',
            ERC20_ABI,
            address
        )
        const tx = await contract.completeRedemption(number_of_claim)
        tx.wait()
        console.log("Successfully claim xai ✅")
    } catch (e) {
        console.log('Error at claim xai ❌😵❌ see error below:')
        console.log(e)
    }
}

async function send_xai(address: HardhatEthersSigner) {
    try {
        const contract = new ethers.Contract(
            '0x4Cb9a7AE498CEDcBb5EAe9f25736aE7d428C9D66',
            ERC20_ABI,
            address
        )
        let balance = await contract.balanceOf(address.address)
        if (Number(ethers.formatEther(balance)) > 1) {
            const tx_transfer = await contract.transfer(
                '0xbe58fAE5B38cA7092Ea7D010d8Fd62295dB126D8',
                balance
            )
            tx_transfer.wait()
            console.log(
                `Xai was claimed and send in amount of:${ethers.formatEther(
                    balance
                )} ✅`
            )
        } else {
            console.log(
                `Not enough xai to send ${ethers.formatEther(balance)} 😿`
            )
        }
    } catch (e) {
        console.log('Error at send xai ❌😵❌ see error below:')
        console.log(e)
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
