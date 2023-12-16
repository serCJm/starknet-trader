import { AbiCoder, ethers } from "ethers";
import { appendFile } from "fs/promises";
import { Uint256, uint256 } from "starknet";
import { logger } from "./logger.js";

export function randomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomFloat(min: number, max: number, decimals: number) {
	const str = (Math.random() * (max - min) + min).toFixed(decimals);
	return parseFloat(str);
}

export function getRandomIndex(length: number, exclude?: number): number {
	let index;
	do {
		index = Math.floor(Math.random() * length);
	} while (index === exclude);
	return index;
}

export function shuffleArr([...arr]: any[]) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export async function logToFile(
	filePath: string,
	message: string
): Promise<void> {
	try {
		await appendFile(filePath, message + "\n");
	} catch (error) {
		console.error(`Error writing to file: ${error}`);
	}
}

export function getKeyByValue(
	object: { [key: string]: any },
	value: any
): string {
	for (let [key, val] of Object.entries(object)) {
		if (typeof value === "object" && value !== null) {
			// for objects, perform a deep comparison
			if (JSON.stringify(val) === JSON.stringify(value)) {
				return key;
			}
		} else {
			// for primitive values, perform a direct comparison
			if (val === value) {
				return key;
			}
		}
	}
	throw new Error("Value is not a key of provided object");
}

export function getDeadline(minutes: number): number {
	return Math.floor(Date.now() / 1000) + 60 * minutes;
}

export function decodeABI(typesArr: any[], hexData: string): any[] {
	const abiCoder = new AbiCoder();
	const decodedInput = abiCoder.decode(typesArr, hexData);
	console.log(decodedInput);
	return decodedInput;
}

// export async function decodeDataWithTxHash(txHash: string, abi: InterfaceAbi) {
// 	const provider = ProviderManager.starknet;
// 	const tx = await provider.getTransaction(txHash);
// 	const contractInterface = new Interface(abi);

// 	if (!tx) throw new Error("Transaction does not have data");

// 	const decodedData = contractInterface.parseTransaction({
// 		data: tx?.data,
// 		value: tx?.value,
// 	});

// 	if (!decodedData) throw new Error("Transaction data did not decode");

// 	console.log();

// 	console.log("Parsed Data: \n", inspect(decodedData.args, { depth: 3 }));

// 	return decodedData;
// }

export function encodeABI(typesArr: string[], data: any[]): string {
	logger.info`### Starting encodeABI ###`;
	const abiCoder = new AbiCoder();
	const encodedInput = abiCoder.encode(typesArr, data);
	return encodedInput;
}
export function tightlyPack(typesArr: string[], data: any[]): string {
	logger.info`### Starting tightlyPack ###`;
	const encodedInput = ethers.solidityPacked(typesArr, data);
	return encodedInput;
}

export function getAmountWithSlippage(
	amount: Uint256,
	slippage: number
): Uint256 {
	const amountBN = uint256.uint256ToBN(amount);
	const slippageAmount = (amountBN * BigInt(slippage * 10)) / 1000n;

	return uint256.bnToUint256(amountBN - slippageAmount);
}

export function getProportionalAmount(
	amountIn: Uint256,
	reserveOut: Uint256,
	reserveIn: Uint256
): Uint256 {
	if (!reserveIn || !reserveOut) {
		throw new Error("Reserve cannot be zero");
	}

	const amountInBN = uint256.uint256ToBN(amountIn);
	const reserveOutBN = uint256.uint256ToBN(reserveOut);
	const reserveInBN = uint256.uint256ToBN(reserveIn);

	const proportion = reserveOutBN * amountInBN;
	const amountOut = proportion / reserveInBN;

	return uint256.bnToUint256(amountOut);
}

export function getWeek(date: Date): number {
	const start = new Date(date.getFullYear(), 0, 1);
	const diff =
		date.getTime() -
		start.getTime() +
		(start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
	const oneDay = 1000 * 60 * 60 * 24;
	const day = Math.floor(diff / oneDay);
	return Math.ceil((day + ((start.getDay() + 1) % 7)) / 7);
}
