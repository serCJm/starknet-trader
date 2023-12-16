import { Call } from "starknet";
import { GLOBAL_CONFIG } from "../../../MODULES_CONFIG.js";
import { WalletManager } from "../../../data/wallet-data.js";
import { countdownTimer } from "../countdownTimer.js";
import { logger } from "../logger.js";
import { getTransactionState } from "./getTransactionState.js";
import { waitForETHGas } from "./waitForETHGas.js";

export async function sendTransaction(calls: Call[], customMessage?: string) {
	if (GLOBAL_CONFIG.MAX_ETH_GWEI) await waitForETHGas();
	logger.info`### Starting sendTransaction ###`;

	const { suggestedMaxFee } = await WalletManager.starknetSigner.estimateFee(
		calls
	);

	const txResp = await WalletManager.starknetSigner.execute(
		calls,
		undefined,
		{
			maxFee: (suggestedMaxFee * 11n) / 10n,
		}
	);

	await getTransactionState(txResp, customMessage);

	await countdownTimer(45, 90);
}
