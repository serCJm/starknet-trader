import { JsonRpcProvider, ethers } from "ethers";
import { RpcProvider } from "starknet";
import { setTimeout } from "timers/promises";
import { CHAINS, ProviderManager } from "../../../data/chain-data.js";
import { TokenManager } from "../../../data/token-data.js";
import { WalletManager } from "../../../data/wallet-data.js";
import { ChainsType, TokensType } from "../../types.js";
import { logger } from "../logger.js";

const POLL_DELAY = 180000;

async function pollUntilBalanceIncreases(
	chain: ChainsType,
	getBalance: () => Promise<bigint>,
	format: (balance: bigint) => string
) {
	let startBalance = await getBalance();
	while (true) {
		const balance = await getBalance();
		logger.info`### Balance on ${chain.toUpperCase()} chain: ${format(
			balance
		)}`;
		if (balance > startBalance) {
			break;
		}
		process.stdout.write(
			`. Retry poll in ${POLL_DELAY / 1000} seconds ###`
		);
		await setTimeout(POLL_DELAY);
	}
}

export async function pollBalance(
	token: TokensType,
	chain: ChainsType = CHAINS.STARKNET,
	decimals?: number
): Promise<void> {
	try {
		logger.info`Polling balance on ${chain.toUpperCase()}...`;
		const provider = ProviderManager.getProvider(chain);

		if (chain === CHAINS.ETH) {
			await pollUntilBalanceIncreases(
				chain,
				() =>
					(provider as JsonRpcProvider).getBalance(
						WalletManager.ethAddress
					),
				(balance) => ethers.formatEther(balance)
			);
		} else {
			const tokenContract = await TokenManager.getContract(token);
			tokenContract.connect(provider as RpcProvider);
			await pollUntilBalanceIncreases(
				chain,
				() => tokenContract.balanceOf(WalletManager.starkAddress),
				(balance) => ethers.formatUnits(balance, decimals)
			);
		}
		logger.info`Balance arrived to ${chain.toUpperCase()}`;
	} catch (err) {
		logger.error`Error in pollBalance: ${err}`;
	}
}
