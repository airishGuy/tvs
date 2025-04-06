import { Wallet } from "ethers";
import fs from "fs";

// Generate 500 private keys
const privateKeys = Array.from({ length: 500 }, () => Wallet.createRandom().privateKey);

// Write to a JSON file
fs.writeFileSync("private_keys.json", JSON.stringify(privateKeys, null, 2));

console.log("500 private keys generated and saved to private_keys.json");