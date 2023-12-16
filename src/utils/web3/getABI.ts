import fs from "fs";
import { ProviderManager } from "../../../data/chain-data.js";
import { logger } from "../logger.js";
export async function getABI(name: string, contractAddress: string) {
	let abi;
	const path = `./data/abis/${name}.json`;
	try {
		abi = JSON.parse(fs.readFileSync(path).toString("ascii"));
	} catch (error: any) {
		logger.error`${error}`;
		const compressedContract =
			await ProviderManager.starknet.getClassByHash(contractAddress);
		abi = compressedContract.abi;
		fs.writeFileSync(path, JSON.stringify(abi, undefined, 2));
		logger.success`### Created ABI ###`;
	}
	return abi;
}
