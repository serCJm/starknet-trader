import { Wallet } from "ethers";
import { CHAINS } from "../data/chain-data.js";
import { TOKENS } from "../data/token-data.js";
import { BaseModule } from "./modules/baseModule.js";

// ALL CHAINS
export type ChainsType = (typeof CHAINS)[keyof typeof CHAINS];
export type ChainsTypeKey = keyof typeof CHAINS;
export type ChainsData = {
	rpc: string;
	explorer: string;
	chainId: number | string;
};
export type ChainsDataType = Record<ChainsType, ChainsData>;

// STARKNET WALLETS
export const STARKNET_WALLET_TYPES = {
	ARGENT: "argent",
	BRAAVOS: "braavos",
} as const;
export type StarknetWalletType =
	(typeof STARKNET_WALLET_TYPES)[keyof typeof STARKNET_WALLET_TYPES];
export type WalletDataType = {
	name: number;
	type: StarknetWalletType;
	address: string;
	privateKey: string;
};

// TOKENS
export type TokensType = (typeof TOKENS)[keyof typeof TOKENS];
export type TokensTypeKey = keyof typeof TOKENS;
export type MinMaxSwapPercentType = [number, number] | [];
export type TokensData = {
	address: string;
	decimals: number;
	MINMAX_SWAP_PERCENT: MinMaxSwapPercentType;
};
export type TokensDataType = Record<TokensType, TokensData>;

// ORDER
export const ORDER: Record<string, OrderType> = {
	RANDOM: "random",
	ONE_RANDOM: "one_random",
	DEFAULT: "default",
} as const;
export type OrderType = "random" | "one_random" | "default";

// MODULES
export type BaseModuleDerivedClass = new (...args: any[]) => BaseModule;
export type ModuleConfigType = {
	ENABLED: boolean;
	[key: string]: any;
};

type BaseConfig = {
	ENABLED: boolean;
};

export type DexConfig = BaseConfig & {
	ENABLED: boolean;
	FROM_TO_TOKENS: [TokensType, TokensType] | [];
	SLIPPAGE: number;
};

export type LendingProtocolConfig = BaseConfig & {
	VOLUME_MAKER: [number, number] | [];
};

export type ModulesConfig = BaseConfig | DexConfig | LendingProtocolConfig;

// PROXY
export type Proxy = {
	ip: string;
	port: string;
	username: string;
	password: string;
};

export type Proxies = {
	[name: string]: Proxy;
};

// MISC
export type WalletHDData = {
	name: number;
	address: string;
	signer: Wallet;
};

export type WalletData = {
	name: string;
	privateKey: string;
};
