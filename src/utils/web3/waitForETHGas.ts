import { ethers } from "ethers";
import { setTimeout } from "timers/promises";
import { GLOBAL_CONFIG } from "../../../MODULES_CONFIG.js";
import { ProviderManager } from "../../../data/chain-data.js";
import { logger } from "../logger.js";

export async function waitForETHGas(): Promise<void> {
	const maxGwei = GLOBAL_CONFIG.MAX_ETH_GWEI;

	if (!maxGwei) return;

	logger.log`### Waiting for ETH gas below ${logger.styleWithColor(
		maxGwei.toString(),
		"orange"
	)} Gwei...`;

	let currentGasPriceInGwei: number = maxGwei;
	do {
		try {
			const feeData = await ProviderManager.eth.getFeeData();
			const gasPrice = feeData.gasPrice;

			if (!gasPrice) throw new Error("Error obtaining feeData");

			currentGasPriceInGwei = parseFloat(
				ethers.formatUnits(gasPrice, "gwei")
			);

			const isCurrentMore = currentGasPriceInGwei >= maxGwei;
			const gasText = currentGasPriceInGwei.toString();
			const gasTextColored = isCurrentMore
				? logger.styleWithColor(gasText, "red")
				: logger.styleWithColor(gasText, "matrixGreen");

			logger.info`### Current ETH gas: ${gasTextColored} Gwei`;

			if (isCurrentMore) {
				const wait = 60000;
				process.stdout.write(`. Retry in ${wait / 1000} seconds ###`);
				await setTimeout(wait);
			}
		} catch (error) {
			logger.error`Error obtaining feeData: ${error}`;
			logger.warn`Try again in 120 sec`;
			await setTimeout(120000);
		}
	} while (currentGasPriceInGwei >= maxGwei);
	process.stdout.write("\n");
}
