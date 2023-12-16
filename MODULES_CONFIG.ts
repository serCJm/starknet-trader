import { TOKENS } from "./data/token-data.js";
import { _10kSwap } from "./src/modules/_10kSwap.js";
import { AVNU } from "./src/modules/avnu.js";
import { JediSwap } from "./src/modules/jediSwap.js";
import { MySwap } from "./src/modules/mySwap.js";
import { SithSwap } from "./src/modules/sithSwap.js";
import { ModulesConfig, ORDER } from "./src/types.js";

export const MODULE_MAP = {
	JediSwap,
	_10kSwap,
	MySwap,
	SithSwap,
	AVNU,
};

export const MODULES_CONFIG: Record<string, ModulesConfig> = {
	[JediSwap.name]: {
		ENABLED: true,
		FROM_TO_TOKENS: [TOKENS.ETH, TOKENS.USDC],
		SLIPPAGE: 20, // slippage percentage
	},
	[_10kSwap.name]: {
		ENABLED: false,
		FROM_TO_TOKENS: [],
	},
	[MySwap.name]: {
		ENABLED: false,
		FROM_TO_TOKENS: [],
	},
	[SithSwap.name]: {
		ENABLED: false,
		FROM_TO_TOKENS: [],
	},
	[AVNU.name]: {
		ENABLED: false,
		FROM_TO_TOKENS: [],
	},
};

export const GLOBAL_CONFIG = {
	PREVENT_SENDING_MAX_ETHER: true, // prevents from swapping entire eth balance if forget to provide amount in settings
	MINMAX_WALLET_WAIT_TIME: [60 * 15, 60 * 45], // seconds
	MINMAX_MODULES_WAIT_TIME: [0, 0], // seconds
	ORDER: ORDER.ONE_RANDOM,
	MAX_ETH_GWEI: 100, // number or null for current gwei,
	MAX_FEE_INCREASE: 50, // percent to increase by
	NOTIFY_TELEGRAM: false, // true/false. Note, need to set up Telegram bot
};
