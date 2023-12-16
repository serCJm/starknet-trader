import { ethers } from "ethers";
import { Contract, Uint256, uint256, validateAndParseAddress } from "starknet";
import {
	MinMaxSwapPercentType,
	TokensDataType,
	TokensType,
} from "../src/types.js";
import { getRandomIndex } from "../src/utils/utils.js";
import { ERC20ABI } from "./abis/ERC20ABI.js";
import { ProviderManager } from "./chain-data.js";
import { WalletManager } from "./wallet-data.js";

export const TOKENS = {
	ETH: "ETH",
	USDC: "USDC",
	DAI: "DAI",
	USDT: "USDT",
	BLACK: "BLACK",
} as const;

export class TokenManager {
	static #tokens: TokensDataType = {
		[TOKENS.ETH]: {
			address:
				"0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
			decimals: 18,
			MINMAX_SWAP_PERCENT: [50, 70],
		},
		[TOKENS.USDC]: {
			address:
				"0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
			decimals: 6,
			MINMAX_SWAP_PERCENT: [],
		},
		[TOKENS.DAI]: {
			address:
				"0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3",
			decimals: 18,
			MINMAX_SWAP_PERCENT: [],
		},
		[TOKENS.USDT]: {
			address:
				"0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
			decimals: 6,
			MINMAX_SWAP_PERCENT: [],
		},
		[TOKENS.BLACK]: {
			address:
				"0x03a6ec0b0ea7a1903329d5dec4bb574ecb4d6fdc206664e1c61eeded8158ab40",
			decimals: 18,
			MINMAX_SWAP_PERCENT: [],
		},
	};

	static isNative(token: TokensType): boolean {
		return token === TOKENS.ETH;
	}

	static getContract(token: TokensType): Contract {
		return new Contract(ERC20ABI, this.getAddress(token));
	}

	static getAddress(token: TokensType): string {
		return validateAndParseAddress(this.#tokens[token].address);
	}

	static formatAmount(token: TokensType, amount: Uint256): string {
		const decimals = this.getDecimals(token);
		return ethers.formatUnits(uint256.uint256ToBN(amount), decimals);
	}

	static getSwapPercentages(token: TokensType): MinMaxSwapPercentType {
		return this.#tokens[token].MINMAX_SWAP_PERCENT;
	}

	static async getBalance(token: TokensType): Promise<bigint> {
		const contract = await this.getContract(token);
		contract.connect(ProviderManager.starknet);
		const balance = await contract.balanceOf(WalletManager.starkAddress);
		return balance.balance.low;
	}

	static async getAllowance(
		token: TokensType,
		spender: string,
	): Promise<bigint> {
		const contract = await this.getContract(token);
		contract.connect(ProviderManager.starknet);
		const allowance = await contract.allowance(
			WalletManager.starkAddress,
			validateAndParseAddress(spender),
		);
		return allowance.allowance.low;
	}

	static getDecimals(token: TokensType): number {
		return this.#tokens[token].decimals;
	}

	static async getRandomTokenPair(
		excludedTokens?: TokensType[],
		onlyWithBalance: boolean = false,
		defaultToken1?: TokensType,
	): Promise<[TokensType, TokensType]> {
		const balances = await this.#getTokensWithBalances();

		const excludedTokensSet = new Set(excludedTokens);

		const allTokens = Object.values(TOKENS).filter(
			(token) => !excludedTokensSet.has(token as TokensType),
		) as TokensType[];

		const tokensWithBalance = Object.keys(balances).filter(
			(token) => !excludedTokensSet.has(token as TokensType),
		) as TokensType[];

		if (allTokens.length < 2) {
			throw new Error(
				"Not enough tokens to make a pair. Excluded too many tokens.",
			);
		}

		const token1 =
			defaultToken1 ||
			tokensWithBalance[getRandomIndex(tokensWithBalance.length)];
		const tokensWithoutToken1 = (
			onlyWithBalance ? tokensWithBalance : allTokens
		).filter((token) => token !== token1);
		const token2 =
			tokensWithoutToken1[getRandomIndex(tokensWithoutToken1.length)];

		// if (token1 === TOKENS.ETH) {
		// 	const tokensWithoutETH = allTokens.filter(
		// 		(token) => token !== TOKENS.ETH
		// 	);
		// 	token2 = tokensWithoutETH[getRandomIndex(tokensWithoutETH.length)];
		// } else {
		// 	token2 = TOKENS.ETH;
		// }

		return [token1, token2];
	}

	static async #getTokensWithBalances(): Promise<Record<TokensType, bigint>> {
		const provider = ProviderManager.starknet;
		const calls = [];
		const balances: Record<TokensType, bigint> = {} as Record<
			TokensType,
			bigint
		>;

		const nonEthTokens = Object.values(TOKENS);

		for (const tokenType of nonEthTokens) {
			const contract = this.getContract(tokenType);
			contract.connect(provider);
			const callData = contract.populate("balanceOf", [
				WalletManager.starkAddress,
			]);
			calls.push(callData);
		}

		const results = await Promise.all(
			calls.map((call) => provider.callContract(call)),
		);

		nonEthTokens.forEach((tokenType, index) => {
			const balance = BigInt(results[index].result[0]);
			if (balance !== 0n && balance > 400000n)
				balances[tokenType] = balance;
		});

		return balances;
	}
}
