import { CallData, Contract, Uint256, validateAndParseAddress } from "starknet";
import { SithSwapRouterABI } from "../../data/abis/SithSwapRouterABI.js";
import { ProviderManager } from "../../data/chain-data.js";
import { WalletManager } from "../../data/wallet-data.js";
import { DexConfig } from "../types.js";
import { getAmountWithSlippage, getDeadline } from "../utils/utils.js";
import { sendTransaction } from "../utils/web3/sendTransaction.js";
import { setupAmountData } from "../utils/web3/setupAmountData.js";
import { DEX } from "./dex.js";

export class SithSwap extends DEX {
	static contractAddress = validateAndParseAddress(
		"0x028c858a586fa12123a1ccb337a0a3b369281f91ea00544d0c086524b759f627",
	);

	#sithSwapRouter: Contract;

	constructor() {
		super();

		this.#sithSwapRouter = new Contract(
			SithSwapRouterABI,
			SithSwap.contractAddress,
			ProviderManager.starknet,
		);
	}

	public async swap() {
		this.logStart("swap");

		const { amount: amountIn, approveData } = await setupAmountData(
			this.fromToken,
			SithSwap.contractAddress,
		);

		const { amount: amountOut, stable } =
			await this.#getAmountOut(amountIn);

		const slippage = (this.config as DexConfig).SLIPPAGE || 1;
		const amountOutMin = getAmountWithSlippage(amountOut, slippage);

		const routes = [
			{
				from_address: this.fromTokenAddress,
				to_address: this.toTokenAddress,
				stable,
			},
		];

		const txData = {
			amountIn,
			amountOutMin,
			routes,
			to: WalletManager.starkAddress,
			deadline: getDeadline(2),
		};

		const swapData = {
			contractAddress: SithSwap.contractAddress,
			entrypoint: "swapExactTokensForTokens",
			calldata: CallData.compile(txData),
		};

		const customMessage = this.createSwapMessage(amountIn);

		await sendTransaction([approveData, swapData], customMessage);
	}

	async #getAmountOut(
		amountIn: Uint256,
	): Promise<{ amount: Uint256; stable: bigint }> {
		const result = await this.#sithSwapRouter.getAmountOut(
			amountIn,
			this.fromTokenAddress,
			this.toTokenAddress,
		);

		return result;
	}
}
