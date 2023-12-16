import { Uint256 } from "starknet";
import { TOKENS, TokenManager } from "../../data/token-data.js";
import { DexConfig, TokensType } from "../types.js";
import { BaseModule } from "./baseModule.js";

export abstract class DEX extends BaseModule {
	protected fromToken!: TokensType;
	protected toToken!: TokensType;

	protected abstract swap(
		fromToken?: TokensType,
		toToken?: TokensType,
	): Promise<void>;

	get fromTokenAddress(): string {
		return TokenManager.getAddress(this.fromToken);
	}

	get toTokenAddress(): string {
		return TokenManager.getAddress(this.toToken);
	}

	constructor() {
		super();
	}

	protected createSwapMessage(amount: Uint256) {
		const formattedAmount = TokenManager.formatAmount(
			this.fromToken,
			amount,
		);
		const message = `swap on ${this.constructor.name} ${formattedAmount} ${this.fromToken} ==> ${this.toToken}`;
		return message;
	}

	protected isTokenToToken() {
		return this.fromToken !== TOKENS.ETH && this.toToken !== TOKENS.ETH;
	}

	protected isStable() {
		const stables: TokensType[] = [TOKENS.USDC];
		return (
			stables.includes(this.fromToken) && stables.includes(this.toToken)
		);
	}

	public async run() {
		const pair = (this.config as DexConfig).FROM_TO_TOKENS;
		await this.swap(pair[0], pair[1]);
	}
}
