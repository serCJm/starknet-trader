export const SithSwapRouterABI = [
	{
		name: "Uint256",
		size: 2,
		type: "struct",
		members: [
			{
				name: "low",
				type: "felt",
				offset: 0,
			},
			{
				name: "high",
				type: "felt",
				offset: 1,
			},
		],
	},
	{
		name: "Route",
		size: 3,
		type: "struct",
		members: [
			{
				name: "from_address",
				type: "felt",
				offset: 0,
			},
			{
				name: "to_address",
				type: "felt",
				offset: 1,
			},
			{
				name: "stable",
				type: "felt",
				offset: 2,
			},
		],
	},
	{
		name: "constructor",
		type: "constructor",
		inputs: [
			{
				name: "factory",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "factory",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "res",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "sortTokens",
		type: "function",
		inputs: [
			{
				name: "token_a",
				type: "felt",
			},
			{
				name: "token_b",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "token0",
				type: "felt",
			},
			{
				name: "token1",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "pairFor",
		type: "function",
		inputs: [
			{
				name: "token_a",
				type: "felt",
			},
			{
				name: "token_b",
				type: "felt",
			},
			{
				name: "stable",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "res",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "isPair",
		type: "function",
		inputs: [
			{
				name: "pair",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "res",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "getReserves",
		type: "function",
		inputs: [
			{
				name: "token_a",
				type: "felt",
			},
			{
				name: "token_b",
				type: "felt",
			},
			{
				name: "stable",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "reserve_a",
				type: "Uint256",
			},
			{
				name: "reserve_b",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		name: "getAmountOut",
		type: "function",
		inputs: [
			{
				name: "amount_in",
				type: "Uint256",
			},
			{
				name: "token_in",
				type: "felt",
			},
			{
				name: "token_out",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "amount",
				type: "Uint256",
			},
			{
				name: "stable",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "getAmountsOut",
		type: "function",
		inputs: [
			{
				name: "amount_in",
				type: "Uint256",
			},
			{
				name: "routes_len",
				type: "felt",
			},
			{
				name: "routes",
				type: "Route*",
			},
		],
		outputs: [
			{
				name: "amounts_len",
				type: "felt",
			},
			{
				name: "amounts",
				type: "Uint256*",
			},
		],
		stateMutability: "view",
	},
	{
		name: "getTradeDiff",
		type: "function",
		inputs: [
			{
				name: "amount_in",
				type: "Uint256",
			},
			{
				name: "token_in",
				type: "felt",
			},
			{
				name: "token_out",
				type: "felt",
			},
			{
				name: "stable",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "rate_a",
				type: "Uint256",
			},
			{
				name: "rate_b",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		name: "quoteAddLiquidity",
		type: "function",
		inputs: [
			{
				name: "token_a",
				type: "felt",
			},
			{
				name: "token_b",
				type: "felt",
			},
			{
				name: "stable",
				type: "felt",
			},
			{
				name: "amount_a_desired",
				type: "Uint256",
			},
			{
				name: "amount_b_desired",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "amount_a",
				type: "Uint256",
			},
			{
				name: "amount_b",
				type: "Uint256",
			},
			{
				name: "liquidity",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		name: "quoteRemoveLiquidity",
		type: "function",
		inputs: [
			{
				name: "token_a",
				type: "felt",
			},
			{
				name: "token_b",
				type: "felt",
			},
			{
				name: "stable",
				type: "felt",
			},
			{
				name: "liquidity",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "amount_a",
				type: "Uint256",
			},
			{
				name: "amount_b",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		name: "addLiquidity",
		type: "function",
		inputs: [
			{
				name: "token_a",
				type: "felt",
			},
			{
				name: "token_b",
				type: "felt",
			},
			{
				name: "stable",
				type: "felt",
			},
			{
				name: "amount_a_desired",
				type: "Uint256",
			},
			{
				name: "amount_b_desired",
				type: "Uint256",
			},
			{
				name: "amount_a_min",
				type: "Uint256",
			},
			{
				name: "amount_b_min",
				type: "Uint256",
			},
			{
				name: "to",
				type: "felt",
			},
			{
				name: "deadline",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "amount_a",
				type: "Uint256",
			},
			{
				name: "amount_b",
				type: "Uint256",
			},
			{
				name: "liquidity",
				type: "Uint256",
			},
		],
	},
	{
		name: "removeLiquidity",
		type: "function",
		inputs: [
			{
				name: "token_a",
				type: "felt",
			},
			{
				name: "token_b",
				type: "felt",
			},
			{
				name: "stable",
				type: "felt",
			},
			{
				name: "liquidity",
				type: "Uint256",
			},
			{
				name: "amount_a_min",
				type: "Uint256",
			},
			{
				name: "amount_b_min",
				type: "Uint256",
			},
			{
				name: "to",
				type: "felt",
			},
			{
				name: "deadline",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "amount_a",
				type: "Uint256",
			},
			{
				name: "amount_b",
				type: "Uint256",
			},
		],
	},
	{
		name: "swapExactTokensForTokensSimple",
		type: "function",
		inputs: [
			{
				name: "amount_in",
				type: "Uint256",
			},
			{
				name: "amount_out_min",
				type: "Uint256",
			},
			{
				name: "token_from",
				type: "felt",
			},
			{
				name: "token_to",
				type: "felt",
			},
			{
				name: "to",
				type: "felt",
			},
			{
				name: "deadline",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "amounts_len",
				type: "felt",
			},
			{
				name: "amounts",
				type: "Uint256*",
			},
		],
	},
	{
		name: "swapExactTokensForTokens",
		type: "function",
		inputs: [
			{
				name: "amount_in",
				type: "Uint256",
			},
			{
				name: "amount_out_min",
				type: "Uint256",
			},
			{
				name: "routes_len",
				type: "felt",
			},
			{
				name: "routes",
				type: "Route*",
			},
			{
				name: "to",
				type: "felt",
			},
			{
				name: "deadline",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "amounts_len",
				type: "felt",
			},
			{
				name: "amounts",
				type: "Uint256*",
			},
		],
	},
	{
		name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
		type: "function",
		inputs: [
			{
				name: "amount_in",
				type: "Uint256",
			},
			{
				name: "amount_out_min",
				type: "Uint256",
			},
			{
				name: "routes_len",
				type: "felt",
			},
			{
				name: "routes",
				type: "Route*",
			},
			{
				name: "to",
				type: "felt",
			},
			{
				name: "deadline",
				type: "felt",
			},
		],
		outputs: [],
	},
];
