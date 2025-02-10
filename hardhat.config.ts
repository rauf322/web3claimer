import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks:{
    sepolia:{
      url: `${process.env.SEPOLIA_RPC}`,
      accounts: [`0x${process.env.PRIVATE_KEY_2}`, `0x${process.env.PRIVATE_KEY}`]
    },
    arbitrum_sepolia:{
      url: `${process.env.ARBITRUM_SEPOLIA_RPC}`,
      accounts: [`0x${process.env.PRIVATE_KEY_2}`, `0x${process.env.PRIVATE_KEY}`]
    },
    arbitrum:{
      url: `${process.env.ARBITRUM_RPC}`,
      accounts: [`0x${process.env.PRIVATE_KEY_2}`, `0x${process.env.PRIVATE_KEY}`,`0x${process.env.PRIVATE_KEY_3}`]
    },
    binance:{
      url: `${process.env.BINANCE_RPC}`,
      accounts: [`0x${process.env.PRIVATE_KEY_2}`, `0x${process.env.PRIVATE_KEY}`,]
    }
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_KEY}`,
  },
};

export default config;
