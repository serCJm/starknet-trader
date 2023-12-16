import { Got } from "got";
import { Contract, num, validateAndParseAddress } from "starknet";
import { AVNU_ABI } from "../../data/abis/AvnuABI.js";
import { ProviderManager } from "../../data/chain-data.js";
import { WalletManager } from "../../data/wallet-data.js";
import { TokensType } from "../types.js";
import { GotManager } from "../utils/gotManager.js";
import { logger } from "../utils/logger.js";
import { sendTransaction } from "../utils/web3/sendTransaction.js";
import { setupAmountData } from "../utils/web3/setupAmountData.js";
import { DEX } from "./dex.js";

type TransactionData = {
	chainId: string;
	contractAddress: string;
	entrypoint: string;
	calldata: string[];
};

// https://app.avnu.fi
export class AVNU extends DEX {
	static contractAddress = validateAndParseAddress(
		"0x04270219d365d6b017231b52e92b3fb5d7c8378b05e9abc97724537a80e93b0f"
	);
	#avnuRouter: Contract;

	#got: Got;

	constructor() {
		super();

		this.#avnuRouter = new Contract(
			AVNU_ABI,
			AVNU.contractAddress,
			ProviderManager.starknet
		);

		this.#got = GotManager.got.extend({
			headers: {
				authority: "starknet.api.avnu.fi",
				origin: "https://app.avnu.fi",
				referer: "https://app.avnu.fi/",
			},
		});
	}

	async #getQuote(amountHex: string) {
		const searchParams = {
			sellTokenAddress: this.fromTokenAddress,
			buyTokenAddress: this.toTokenAddress,
			sellAmount: amountHex,
			takerAddress: WalletManager.starkAddress,
			size: 3,
			integratorName: "AVNU Portal",
		};

		try {
			const response: any = await this.#got(
				"https://starknet.api.avnu.fi/swap/v1/quotes",
				{
					searchParams,
				}
			).json();

			if (response) {
				return response[0].quoteId;
			}
		} catch (error: any) {
			logger.error`Request error: ${error.message}}`;
			throw new Error(error);
		}
	}

	async #buildTransaction(quoteId: string): Promise<TransactionData> {
		const json = {
			quoteId,
			slippage: 0.01,
			takerAddress: WalletManager.starkAddress,
		};

		try {
			const response: TransactionData = await this.#got
				.post("https://starknet.api.avnu.fi/swap/v1/build", {
					json,
				})
				.json();

			if (response) {
				return response;
			}
			return Promise.reject(new Error("Response is null or undefined"));
		} catch (error: any) {
			logger.error`Request error: ${error.message}}`;
			throw new Error(error);
		}
	}

	public async swap(fromToken?: TokensType, toToken?: TokensType) {
		this.logStart("swap");

		if (fromToken && toToken) {
			this.fromToken = fromToken;
			this.toToken = toToken;
		}

		const { amount, approveData } = await setupAmountData(
			this.fromToken,
			AVNU.contractAddress
		);

		const quoteId = await this.#getQuote(num.toHex(amount.low));
		const txData = await this.#buildTransaction(quoteId);

		const swapData = {
			contractAddress: AVNU.contractAddress,
			entrypoint: txData.entrypoint,
			calldata: txData.calldata,
		};

		const customMessage = this.createSwapMessage(amount);

		await sendTransaction([approveData, swapData], customMessage);
	}
}
