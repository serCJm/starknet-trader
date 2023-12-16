import { CallData, Contract, Uint256, validateAndParseAddress } from "starknet";
import { _10kSwapFactoryABI } from "../../data/abis/_10kSwapFactoryABI.js";
import { _10kSwapRouterABI } from "../../data/abis/_10kSwapRouterABI.js";
import { ProviderManager } from "../../data/chain-data.js";
import { WalletManager } from "../../data/wallet-data.js";
import { DexConfig } from "../types.js";
import { getAmountWithSlippage, getDeadline } from "../utils/utils.js";
import { sendTransaction } from "../utils/web3/sendTransaction.js";
import { setupAmountData } from "../utils/web3/setupAmountData.js";
import { DEX } from "./dex.js";

export class _10kSwap extends DEX {
	static contractAddress = validateAndParseAddress(
		"0x07a6f98c03379b9513ca84cca1373ff452a7462a3b61598f0af5bb27ad7f76d1",
	);
	#_10kSwapFactoryAddress = validateAndParseAddress(
		"0x1c0a36e26a8f822e0d81f20a5a562b16a8f8a3dfd99801367dd2aea8f1a87a2",
	);
	#_10kSwapRouter: Contract;
	#_10kSwapFactory: Contract;

	constructor() {
		super();
		this.#_10kSwapRouter = new Contract(
			_10kSwapRouterABI,
			_10kSwap.contractAddress,
			ProviderManager.starknet,
		);
		this.#_10kSwapFactory = new Contract(
			_10kSwapFactoryABI,
			this.#_10kSwapFactoryAddress,
			ProviderManager.starknet,
		);
	}

	public async swap() {
		this.logStart("swap");

		const { amount: amountIn, approveData } = await setupAmountData(
			this.fromToken,
			_10kSwap.contractAddress,
		);

		const [, amountOutMin] = await this.#getAmountsIn(amountIn, true);

		const path = [this.fromTokenAddress, this.toTokenAddress];

		const txData = {
			amountIn,
			amountOutMin,
			path,
			to: WalletManager.starkAddress,
			deadline: getDeadline(2).toString(),
		};

		const swapData = {
			contractAddress: _10kSwap.contractAddress,
			entrypoint: "swapExactTokensForTokens",
			calldata: CallData.compile(txData),
		};

		const customMessage = this.createSwapMessage(amountIn);
		await sendTransaction([approveData, swapData], customMessage);
	}

	async #getAmountsIn(
		amountOut: Uint256,
		reverse = false,
	): Promise<[Uint256, Uint256]> {
		const path = [this.fromTokenAddress, this.toTokenAddress];

		if (reverse) path.reverse();

		const { amounts } = await this.#_10kSwapRouter.getAmountsIn(
			amountOut,
			path,
		);

		const amountIn = amounts[0];

		const slippage = (this.config as DexConfig).SLIPPAGE || 1;

		const amountInMin = getAmountWithSlippage(amountIn, slippage);
		return [amountIn, amountInMin];
	}
}
