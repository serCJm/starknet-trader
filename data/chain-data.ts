import { JsonRpcProvider } from "ethers";
import { RpcProvider, constants } from "starknet";
import { ChainsDataType, ChainsType } from "../src/types.js";

export const CHAINS = {
	ETH: "ethereum",
	STARKNET: "starknet",
} as const;

export class ProviderManager {
	static #providers: ChainsDataType = {
		[CHAINS.ETH]: {
			// https://ethereum.publicnode.com
			// https://eth.llamarpc.com
			rpc: "https://eth.llamarpc.com",
			explorer: "https://etherscan.io",
			chainId: 1,
		},
		[CHAINS.STARKNET]: {
			rpc: "https://starknet-mainnet.public.blastapi.io",
			explorer: "https://starkscan.co/",
			chainId: constants.StarknetChainId.SN_MAIN,
		},
	};

	static #createProvider(rpc: string): JsonRpcProvider {
		return new JsonRpcProvider(rpc);
	}

	public static get eth(): JsonRpcProvider {
		return this.#createProvider(this.#providers[CHAINS.ETH].rpc);
	}

	public static get starknet(): RpcProvider {
		return new RpcProvider({
			nodeUrl: this.#providers[CHAINS.STARKNET].rpc,
		});
	}

	public static getProvider(
		chain: ChainsType,
	): JsonRpcProvider | RpcProvider {
		return this.#createProvider(this.#providers[chain].rpc);
	}

	static getExplorer(chain: ChainsType): string {
		return this.#providers[chain].explorer;
	}

	static getExplorerByChainId(chainId: number): string {
		for (const chain in this.#providers) {
			if (this.#providers[chain as ChainsType].chainId === chainId) {
				return this.#providers[chain as ChainsType].explorer;
			}
		}
		throw new Error("Wrong chain Id, no provider found");
	}
}
