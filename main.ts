import { GLOBAL_CONFIG } from "./MODULES_CONFIG.js";
import { config } from "./config.js";
import { WalletManager } from "./data/wallet-data.js";
import { runModules } from "./src/runModules.js";
import { WalletDataType } from "./src/types.js";
import { countdownTimer } from "./src/utils/countdownTimer.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { logger } from "./src/utils/logger.js";
import { shuffleArr } from "./src/utils/utils.js";

process.on("unhandledRejection", (reason, promise) => {
	if (reason instanceof Error) {
		errorHandler(reason);
	} else {
		console.error("Unhandled Rejection at:", promise, "reason:", reason);
	}
});

async function processWallet(walletData: WalletDataType) {
	const { name, address, privateKey, type } = walletData;

	WalletManager.initSTARK(address, privateKey, type);

	logger.setCustomPrepend(`[Name: ${name}][${address}]`);

	await runModules();

	logger.success`Task completed, waiting for next wallet...`;
}

async function processWallets(wallets: WalletDataType[]) {
	const [minTime, maxTime] = GLOBAL_CONFIG.MINMAX_WALLET_WAIT_TIME;
	for (let i = 0; i < wallets.length; i++) {
		const wallet = wallets[i];

		await processWallet(wallet);

		if (wallets[i + 1]) await countdownTimer(minTime, maxTime);
	}
	logger.success`Automation job completed`;
}

async function main() {
	const { SECRET_WALLET_DATA } = config;
	let wallets: WalletDataType[] = [];
	// if (WALLETS_TYPE === "db")
	// 	wallets = await getWallets(WALLETS_RANGE, STARKNET_WALLET_TYPES.ARGENT);
	wallets = SECRET_WALLET_DATA;

	wallets = shuffleArr(wallets);

	if (wallets.length === 0) throw new Error("Wallets array is empty");

	await processWallets(wallets);

	process.exit(0);
}

main();
