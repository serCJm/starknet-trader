export const JediSwapRouterABI = [
	{
		type: "struct",
		name: "Uint256",
		size: 2,
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
		type: "event",
		name: "Upgraded",
		keys: [],
		data: [
			{
				name: "implementation",
				type: "felt",
			},
		],
	},
	{
		type: "event",
		name: "AdminChanged",
		keys: [],
		data: [
			{
				name: "previousAdmin",
				type: "felt",
			},
			{
				name: "newAdmin",
				type: "felt",
			},
		],
	},
	{
		type: "function",
		name: "initializer",
		inputs: [
			{
				name: "factory",
				type: "felt",
			},
			{
				name: "proxy_admin",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		type: "function",
		name: "factory",
		inputs: [],
		outputs: [
			{
				name: "address",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "sort_tokens",
		inputs: [
			{
				name: "tokenA",
				type: "felt",
			},
			{
				name: "tokenB",
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
		type: "function",
		name: "quote",
		inputs: [
			{
				name: "amountA",
				type: "Uint256",
			},
			{
				name: "reserveA",
				type: "Uint256",
			},
			{
				name: "reserveB",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "amountB",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "get_amount_out",
		inputs: [
			{
				name: "amountIn",
				type: "Uint256",
			},
			{
				name: "reserveIn",
				type: "Uint256",
			},
			{
				name: "reserveOut",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "amountOut",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "get_amount_in",
		inputs: [
			{
				name: "amountOut",
				type: "Uint256",
			},
			{
				name: "reserveIn",
				type: "Uint256",
			},
			{
				name: "reserveOut",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "amountIn",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "get_amounts_out",
		inputs: [
			{
				name: "amountIn",
				type: "Uint256",
			},
			{
				name: "path_len",
				type: "felt",
			},
			{
				name: "path",
				type: "felt*",
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
		type: "function",
		name: "get_amounts_in",
		inputs: [
			{
				name: "amountOut",
				type: "Uint256",
			},
			{
				name: "path_len",
				type: "felt",
			},
			{
				name: "path",
				type: "felt*",
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
		type: "function",
		name: "add_liquidity",
		inputs: [
			{
				name: "tokenA",
				type: "felt",
			},
			{
				name: "tokenB",
				type: "felt",
			},
			{
				name: "amountADesired",
				type: "Uint256",
			},
			{
				name: "amountBDesired",
				type: "Uint256",
			},
			{
				name: "amountAMin",
				type: "Uint256",
			},
			{
				name: "amountBMin",
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
				name: "amountA",
				type: "Uint256",
			},
			{
				name: "amountB",
				type: "Uint256",
			},
			{
				name: "liquidity",
				type: "Uint256",
			},
		],
	},
	{
		type: "function",
		name: "remove_liquidity",
		inputs: [
			{
				name: "tokenA",
				type: "felt",
			},
			{
				name: "tokenB",
				type: "felt",
			},
			{
				name: "liquidity",
				type: "Uint256",
			},
			{
				name: "amountAMin",
				type: "Uint256",
			},
			{
				name: "amountBMin",
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
				name: "amountA",
				type: "Uint256",
			},
			{
				name: "amountB",
				type: "Uint256",
			},
		],
	},
	{
		type: "function",
		name: "swap_exact_tokens_for_tokens",
		inputs: [
			{
				name: "amountIn",
				type: "Uint256",
			},
			{
				name: "amountOutMin",
				type: "Uint256",
			},
			{
				name: "path_len",
				type: "felt",
			},
			{
				name: "path",
				type: "felt*",
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
		type: "function",
		name: "swap_tokens_for_exact_tokens",
		inputs: [
			{
				name: "amountOut",
				type: "Uint256",
			},
			{
				name: "amountInMax",
				type: "Uint256",
			},
			{
				name: "path_len",
				type: "felt",
			},
			{
				name: "path",
				type: "felt*",
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
];
