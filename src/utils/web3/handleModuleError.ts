import { CHAINS } from "../../../data/chain-data.js";
import { ChainsType } from "../../types.js";
import { logger } from "../logger.js";
import { TOKENS } from "./../../../data/token-data.js";
import { pollBalance } from "./pollBalance.js";

export async function handleModuleError(
	error: any,
	operationName: string,
	fromChain: ChainsType = CHAINS.STARKNET,
): Promise<boolean> {
	logger.error`Error in ${operationName}: ${error}`;

	if (
		error.message?.toLowerCase().includes("insufficient") ||
		error.reason?.toLowerCase().includes("not enough native")
	) {
		await pollBalance(TOKENS.ETH, fromChain);
	}
	// else if (error.message?.toLowerCase().includes("no pool")) {
	// 	return true;
	// }

	return true;
}
