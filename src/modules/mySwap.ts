import { CallData, Contract, Uint256, validateAndParseAddress } from "starknet";
import { mySwapRouterABI } from "../../data/abis/mySwapRouterABI.js";
import { ProviderManager } from "../../data/chain-data.js";
import {
	getAmountWithSlippage,
	getProportionalAmount,
} from "../utils/utils.js";
import { sendTransaction } from "../utils/web3/sendTransaction.js";
import { setupAmountData } from "../utils/web3/setupAmountData.js";
import { DEX } from "./dex.js";

type PoolData = {
	name: bigint;
	token_a_address: bigint;
	token_a_reserves: Uint256;
	token_b_address: bigint;
	token_b_reserves: Uint256;
	fee_percentage: bigint;
	cfmm_type: bigint;
	liq_token: bigint;
};

// https://www.myswap.xyz/#/swap
export class MySwap extends DEX {
	static contractAddress = validateAndParseAddress(
		"0x010884171baf1914edc28d7afb619b40a4051cfae78a094a55d230f19e944a28",
	);

	#mySwapRouter: Contract;

	constructor() {
		super();

		this.#mySwapRouter = new Contract(
			mySwapRouterABI,
			MySwap.contractAddress,
			ProviderManager.starknet,
		);
	}

	public async swap() {
		this.logStart("swap");

		const { amount: amount_from, approveData } = await setupAmountData(
			this.fromToken,
			MySwap.contractAddress,
		);

		const { poolId, reserve0, reserve1 } = await this.#getPoolInfo();

		const amountOut = getProportionalAmount(
			amount_from,
			reserve1,
			reserve0,
		);
		const amountOutMin = getAmountWithSlippage(amountOut, 0.5);

		const txData = {
			pool_id: poolId,
			token_from_addr: this.fromTokenAddress,
			amount_from,
			amount_to_min: amountOutMin,
		};

		const swapData = {
			contractAddress: MySwap.contractAddress,
			entrypoint: "swap",
			calldata: CallData.compile(txData),
		};

		const customMessage = this.createSwapMessage(amount_from);

		await sendTransaction([approveData, swapData], customMessage);
	}

	async #getPoolInfo(): Promise<{
		poolId: number;
		reserve0: Uint256;
		reserve1: Uint256;
	}> {
		const { num } = await this.#mySwapRouter.get_total_number_of_pools();

		const poolDataPr = Array.from(
			{ length: Number(num) },
			(_: void, i: number) => this.#mySwapRouter.get_pool(i + 1),
		);
		const poolData: { pool: PoolData }[] = await Promise.all(poolDataPr);

		let poolId = 0;
		const { pool } = poolData.filter(({ pool }, i: number) => {
			const data = [
				validateAndParseAddress(pool.token_a_address),
				validateAndParseAddress(pool.token_b_address),
			];
			if (
				data.includes(this.fromTokenAddress) &&
				data.includes(this.toTokenAddress)
			) {
				poolId = i + 1;
				return true;
			}
			return false;
		})[0];

		if (!pool || poolId === 0)
			throw new Error(
				`Pool not found for tokens ${this.fromToken} and ${this.toToken}`,
			);

		return {
			poolId,
			reserve0: pool.token_a_reserves,
			reserve1: pool.token_b_reserves,
		};
	}
}
