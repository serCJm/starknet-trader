import {
	GetTransactionReceiptResponse,
	InvokeFunctionResponse,
	RevertedTransactionReceiptResponse,
	SuccessfulTransactionReceiptResponse,
} from "starknet";
import { CHAINS, ProviderManager } from "../../../data/chain-data.js";
import { WalletManager } from "../../../data/wallet-data.js";
import { cancelCountdown, countdownTimer } from "../countdownTimer.js";
import { logger } from "../logger.js";
import { logToFile } from "../utils.js";

type ProcessedTransactionState =
	| SuccessfulTransactionReceiptResponse
	| RevertedTransactionReceiptResponse;

export async function getTransactionState(
	transactionResponse: InvokeFunctionResponse,
	customMessage?: string,
	timeoutSeconds: number = 240,
): Promise<GetTransactionReceiptResponse> {
	const receipt = await getTransactionReceipt(
		transactionResponse.transaction_hash,
		timeoutSeconds,
	);

	if (!receipt) {
		throw new Error("Transaction not found.");
	}
	if (!Object.prototype.hasOwnProperty.call(receipt, "transaction_hash")) {
		logger.error`${receipt}`;
		throw new Error("Transaction hash not found in the receipt.");
	}

	if (!Object.prototype.hasOwnProperty.call(receipt, "execution_status")) {
		logger.error`${receipt}`;
		throw new Error("Transaction error");
	}

	const link = await getExplorerLink(
		(receipt as ProcessedTransactionState).transaction_hash,
	);

	switch ((receipt as ProcessedTransactionState).execution_status) {
		case "SUCCEEDED":
			logger.success`Transaction ${customMessage?.toUpperCase()}: ${link}`;
			logToFile(
				"resources/excludedWallets.txt",
				WalletManager.starkAddress,
			);
			return receipt;
		case "REJECTED":
		case "REVERTED":
			logger.error`Transaction FAILED: ${link}. Receipt: ${receipt}`;
			throw new Error(
				`Transaction failed with status ${
					(receipt as RevertedTransactionReceiptResponse)
						.revert_reason
				}`,
			);
		default:
			throw new Error("Unknown transaction status.");
	}
}

async function getTransactionReceipt(
	transactionHash: string,
	timeoutSeconds: number,
): Promise<GetTransactionReceiptResponse | void> {
	try {
		const transactionPromise =
			ProviderManager.starknet.waitForTransaction(transactionHash);
		const timerPromise = countdownTimer(timeoutSeconds, timeoutSeconds);

		const result = await Promise.race([transactionPromise, timerPromise]);

		return result;
	} catch (error: any) {
		if (error.code === "ETIMEOUT") {
			throw error;
		}
		throw new Error(
			`An error occurred while waiting for the transaction: ${error}`,
		);
	} finally {
		cancelCountdown();
	}
}

async function getExplorerLink(hash: string): Promise<string | undefined> {
	const explorer = ProviderManager.getExplorer(CHAINS.STARKNET);
	return explorer ? `${explorer}/tx/${hash}` : undefined;
}
