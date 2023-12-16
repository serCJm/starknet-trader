import { CallData, Contract, validateAndParseAddress } from "starknet";
import { JediSwapFactoryABI } from "../../data/abis/JediSwapFactoryABI.js";
import { JediSwapPoolABI } from "../../data/abis/JediSwapPoolABI.js";
import { JediSwapRouterABI } from "../../data/abis/JediSwapRouterABI.js";
import { ProviderManager } from "../../data/chain-data.js";
import { WalletManager } from "../../data/wallet-data.js";
import { DexConfig, TokensType } from "../types.js";
import { getAmountWithSlippage, getDeadline } from "../utils/utils.js";
import { sendTransaction } from "../utils/web3/sendTransaction.js";
import { setupAmountData } from "../utils/web3/setupAmountData.js";
import { DEX } from "./dex.js";

export class JediSwap extends DEX {
	static contractAddress = validateAndParseAddress(
		"0x041fd22b238fa21cfcf5dd45a8548974d8263b3a531a60388411c5e230f97023",
	);
	#jediSwapFactoryAddress = validateAndParseAddress(
		"0x00dad44c139a476c7a17fc8141e6db680e9abc9f56fe249a105094c44382c2fd",
	);
	#jediSwapRouter: Contract;
	#jediSwapFactory: Contract;

	constructor() {
		super();

		this.#jediSwapRouter = new Contract(
			JediSwapRouterABI,
			JediSwap.contractAddress,
			ProviderManager.starknet,
		);
		this.#jediSwapFactory = new Contract(
			JediSwapFactoryABI,
			this.#jediSwapFactoryAddress,
			ProviderManager.starknet,
		);
	}

	public async swap(fromToken?: TokensType, toToken?: TokensType) {
		this.logStart("swap");

		if (fromToken && toToken) {
			this.fromToken = fromToken;
			this.toToken = toToken;
		}

		const { amount: amountIn, approveData } = await setupAmountData(
			this.fromToken,
			JediSwap.contractAddress,
		);

		const { reserve0, reserve1 } = await this.#getReserves();

		const { amountOut } = await this.#jediSwapRouter.get_amount_out(
			amountIn,
			reserve0,
			reserve1,
		);

		const slippage = (this.config as DexConfig).SLIPPAGE || 0.5;
		const amountOutMin = getAmountWithSlippage(amountOut, slippage);

		const path = [this.fromTokenAddress, this.toTokenAddress];

		const txData = {
			amountIn,
			amountOutMin: amountOutMin,
			path,
			to: WalletManager.starkAddress,
			deadline: getDeadline(2),
		};

		const swapData = {
			contractAddress: JediSwap.contractAddress,
			entrypoint: "swap_exact_tokens_for_tokens",
			calldata: CallData.compile(txData),
		};

		const customMessage = this.createSwapMessage(amountIn);

		await sendTransaction([approveData, swapData], customMessage);
	}

	async #getReserves() {
		const { pair } = await this.#jediSwapFactory.get_pair(
			this.fromTokenAddress,
			this.toTokenAddress,
		);

		const poolAddress = validateAndParseAddress(pair);

		const poolContract = new Contract(
			JediSwapPoolABI,
			poolAddress,
			ProviderManager.starknet,
		);

		const { reserve0, reserve1 } = await poolContract.get_reserves();

		return { reserve0, reserve1 };
	}
}
