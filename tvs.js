

import fs from "fs";
import { ethers } from "ethers";

// Initialize provider and set up Alchemy JSON-RPC
const provider = new ethers.JsonRpcProvider("https://tea-sepolia.g.alchemy.com/public");

const myABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_tokenURI",
          "type": "string"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const privateKeys = JSON.parse(fs.readFileSync("private_keys.json", "utf-8"));
const contractAddress = "0x75755713e6B6BB6f1519c8408b38dF4b58532b82"; 

// Initialize contract
const mintNFT = async (privateKey) => {
    try {
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, myABI, wallet);
        
        const tx = await contract.mint("tokenURI"); // Adjust function call if needed
        console.log(`Minting from ${wallet.address}: TX Hash - ${tx.hash}`);
        
        await tx.wait();
        console.log(`Mint successful for ${wallet.address}`);
    } catch (error) {
        console.error("Minting error:", error);
    }
};

// Cycle through private keys every 10 seconds
let index = 0;
setInterval(() => {
    mintNFT(privateKeys[index]);
    index = (index + 1) % privateKeys.length; // Loop back to the first key after finishing
}, 10000);