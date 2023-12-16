export const JediSwapPoolABI = [
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
		data: [
			{
				name: "from_",
				type: "felt",
			},
			{
				name: "to",
				type: "felt",
			},
			{
				name: "value",
				type: "Uint256",
			},
		],
		keys: [],
		name: "Transfer",
		type: "event",
	},
	{
		data: [
			{
				name: "owner",
				type: "felt",
			},
			{
				name: "spender",
				type: "felt",
			},
			{
				name: "value",
				type: "Uint256",
			},
		],
		keys: [],
		name: "Approval",
		type: "event",
	},
	{
		data: [
			{
				name: "implementation",
				type: "felt",
			},
		],
		keys: [],
		name: "Upgraded",
		type: "event",
	},
	{
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
		keys: [],
		name: "AdminChanged",
		type: "event",
	},
	{
		data: [
			{
				name: "from_address",
				type: "felt",
			},
			{
				name: "to_address",
				type: "felt",
			},
			{
				name: "amount",
				type: "Uint256",
			},
		],
		keys: [],
		name: "Transfer",
		type: "event",
	},
	{
		data: [
			{
				name: "owner",
				type: "felt",
			},
			{
				name: "spender",
				type: "felt",
			},
			{
				name: "amount",
				type: "Uint256",
			},
		],
		keys: [],
		name: "Approval",
		type: "event",
	},
	{
		data: [
			{
				name: "sender",
				type: "felt",
			},
			{
				name: "amount0",
				type: "Uint256",
			},
			{
				name: "amount1",
				type: "Uint256",
			},
		],
		keys: [],
		name: "Mint",
		type: "event",
	},
	{
		data: [
			{
				name: "sender",
				type: "felt",
			},
			{
				name: "amount0",
				type: "Uint256",
			},
			{
				name: "amount1",
				type: "Uint256",
			},
			{
				name: "to",
				type: "felt",
			},
		],
		keys: [],
		name: "Burn",
		type: "event",
	},
	{
		data: [
			{
				name: "sender",
				type: "felt",
			},
			{
				name: "amount0In",
				type: "Uint256",
			},
			{
				name: "amount1In",
				type: "Uint256",
			},
			{
				name: "amount0Out",
				type: "Uint256",
			},
			{
				name: "amount1Out",
				type: "Uint256",
			},
			{
				name: "to",
				type: "felt",
			},
		],
		keys: [],
		name: "Swap",
		type: "event",
	},
	{
		data: [
			{
				name: "reserve0",
				type: "Uint256",
			},
			{
				name: "reserve1",
				type: "Uint256",
			},
		],
		keys: [],
		name: "Sync",
		type: "event",
	},
	{
		name: "initializer",
		type: "function",
		inputs: [
			{
				name: "token0",
				type: "felt",
			},
			{
				name: "token1",
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
		name: "name",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "name",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "symbol",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "symbol",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "totalSupply",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "totalSupply",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		name: "decimals",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "decimals",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "balanceOf",
		type: "function",
		inputs: [
			{
				name: "account",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "balance",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		name: "allowance",
		type: "function",
		inputs: [
			{
				name: "owner",
				type: "felt",
			},
			{
				name: "spender",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "remaining",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		name: "token0",
		type: "function",
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
		name: "token1",
		type: "function",
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
		name: "get_reserves",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "reserve0",
				type: "Uint256",
			},
			{
				name: "reserve1",
				type: "Uint256",
			},
			{
				name: "block_timestamp_last",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "price_0_cumulative_last",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "res",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		name: "price_1_cumulative_last",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "res",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		name: "klast",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "res",
				type: "Uint256",
			},
		],
		stateMutability: "view",
	},
	{
		name: "transfer",
		type: "function",
		inputs: [
			{
				name: "recipient",
				type: "felt",
			},
			{
				name: "amount",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "success",
				type: "felt",
			},
		],
	},
	{
		name: "transferFrom",
		type: "function",
		inputs: [
			{
				name: "sender",
				type: "felt",
			},
			{
				name: "recipient",
				type: "felt",
			},
			{
				name: "amount",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "success",
				type: "felt",
			},
		],
	},
	{
		name: "approve",
		type: "function",
		inputs: [
			{
				name: "spender",
				type: "felt",
			},
			{
				name: "amount",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "success",
				type: "felt",
			},
		],
	},
	{
		name: "increaseAllowance",
		type: "function",
		inputs: [
			{
				name: "spender",
				type: "felt",
			},
			{
				name: "added_value",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "success",
				type: "felt",
			},
		],
	},
	{
		name: "decreaseAllowance",
		type: "function",
		inputs: [
			{
				name: "spender",
				type: "felt",
			},
			{
				name: "subtracted_value",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "success",
				type: "felt",
			},
		],
	},
	{
		name: "mint",
		type: "function",
		inputs: [
			{
				name: "to",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "liquidity",
				type: "Uint256",
			},
		],
	},
	{
		name: "burn",
		type: "function",
		inputs: [
			{
				name: "to",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "amount0",
				type: "Uint256",
			},
			{
				name: "amount1",
				type: "Uint256",
			},
		],
	},
	{
		name: "swap",
		type: "function",
		inputs: [
			{
				name: "amount0Out",
				type: "Uint256",
			},
			{
				name: "amount1Out",
				type: "Uint256",
			},
			{
				name: "to",
				type: "felt",
			},
			{
				name: "data_len",
				type: "felt",
			},
			{
				name: "data",
				type: "felt*",
			},
		],
		outputs: [],
	},
	{
		name: "skim",
		type: "function",
		inputs: [
			{
				name: "to",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "sync",
		type: "function",
		inputs: [],
		outputs: [],
	},
];
