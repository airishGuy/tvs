import fs from "fs";
import { ethers } from "ethers";

// Initialize provider and set up Alchemy JSON-RPC
const provider = new ethers.JsonRpcProvider("https://tea-sepolia.g.alchemy.com/public");

// Initialize contract
const main = async () => {
    try {
        const privateKeys = JSON.parse(fs.readFileSync("private_keys.json", "utf-8"));
        const PK = privateKeys[0];
        
        const walletMain = new ethers.Wallet(PK, provider);
        console.log(walletMain.address)

        for (let i = 0; i < privateKeys.length; i++) {
            const wallet = new ethers.Wallet(privateKeys[i], provider);
            console.log(wallet.address);

            // send 0.04 TEA
            const tx = {
                to: wallet.address,
                value: ethers.parseEther("0.059")
            };

            const beforeBalance = await provider.getBalance(wallet.address);
            const formattedBeforeBalance = ethers.formatEther(beforeBalance);
            console.log("ETH BEFORE: ", formattedBeforeBalance);

            const transaction = await walletMain.sendTransaction(tx);
            console.log(`Transaction sent: ${transaction.hash}`);

            await transaction.wait();
            console.log("Transaction confirmed");

            const afterBalance = await provider.getBalance(wallet.address);
            const formattedAfterBalance = ethers.formatEther(afterBalance);
            console.log("ETH AFTER: ", formattedAfterBalance);
        }
    } catch (error) {
        console.error("Error sending ETH");
    }
};

main().then().catch(err => console.log(err));