import { GLOBAL_CONFIG } from "../../../MODULES_CONFIG.js";
import { CHAINS } from "../../../data/chain-data.js";
import { WalletManager } from "../../../data/wallet-data.js";
import { ChainsType } from "../../types.js";
import { logger } from "../logger.js";
import { notifyTelegram } from "../notifyTelegram.js";
import { TOKENS } from "./../../../data/token-data.js";
import { pollBalance } from "./pollBalance.js";

export async function handleModuleError(
	error: any,
	operationName: string,
	fromChain: ChainsType = CHAINS.STARKNET,
): Promise<boolean> {
	logger.error`Error in ${operationName}: ${error}`;

	const message = buildTelegramError(error.message);

	if (GLOBAL_CONFIG.NOTIFY_TELEGRAM) await notifyTelegram(message);

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

function buildTelegramError(error: string) {
	const message = `
		Date: ${logger.getFormattedTimestamp()}\nName: ${
			WalletManager.name
		}\nError: ${error}
	`;

	return message;
}
