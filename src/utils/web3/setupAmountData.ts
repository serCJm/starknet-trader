import { CallData, uint256 } from "starknet";
import { setTimeout } from "timers/promises";
import { GLOBAL_CONFIG } from "../../../MODULES_CONFIG.js";
import { TokenManager } from "../../../data/token-data.js";
import { TokensType } from "../../types.js";
import { logger } from "../logger.js";
import { randomNumber } from "../utils.js";

export async function setupAmountData(
	token: TokensType,
	spender: string,
	percentValues?: [number, number],
	maxValue?: boolean,
) {
	let amountToSend: bigint;
	const swapValues = percentValues || TokenManager.getSwapPercentages(token);

	let percentage = 0n;
	if (swapValues.length === 2) {
		validateSwapValue(swapValues);
		percentage = BigInt(randomNumber(swapValues[0], swapValues[1]));
	}

	const balance = await TokenManager.getBalance(token);

	const amount = (balance * percentage) / 100n;

	if (!amount || maxValue) {
		amountToSend = await handleMaxValue(token, balance);
	} else {
		amountToSend = amount;
	}

	return {
		amount: uint256.bnToUint256(amountToSend),
		approveData: {
			contractAddress: TokenManager.getAddress(token),
			entrypoint: "approve",
			calldata: CallData.compile({
				spender,
				amount: uint256.bnToUint256(amountToSend),
			}),
		},
	};
}

function validateSwapValue(swapValues: [number, number]) {
	const [minPercentage, maxPercentage] = swapValues;
	if (
		minPercentage < 0 ||
		minPercentage > 100 ||
		maxPercentage < 0 ||
		maxPercentage > 100
	) {
		throw new Error("Swap values percentage should be between 0 and 100");
	}
}

async function handleMaxValue(token: TokensType, balance: bigint) {
	const isNative = TokenManager.isNative(token);

	if (isNative && GLOBAL_CONFIG.PREVENT_SENDING_MAX_ETHER) {
		throw new Error(
			`Sending entire ETH balance is disabled in GLOBAL_CONFIG`,
		);
	} else if (isNative) {
		logger.warn`ABOUT TO SEND ENTIRE ETH BALANCE. CONSIDER CANCELLING...`;
		await setTimeout(10000);
		const buffer = (balance * BigInt(4)) / BigInt(100);
		return balance - buffer;
	}
	return balance;
}
