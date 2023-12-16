export const ERC20ABI = [
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
		name: "Transfer",
		keys: [],
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
	},
	{
		type: "event",
		name: "Approval",
		keys: [],
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
	},
	{
		type: "function",
		name: "name",
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
		type: "function",
		name: "symbol",
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
		type: "function",
		name: "totalSupply",
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
		type: "function",
		name: "decimals",
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
		type: "function",
		name: "balanceOf",
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
		type: "function",
		name: "allowance",
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
		type: "function",
		name: "permittedMinter",
		inputs: [],
		outputs: [
			{
				name: "minter",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "initialized",
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
		type: "function",
		name: "get_version",
		inputs: [],
		outputs: [
			{
				name: "version",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "get_identity",
		inputs: [],
		outputs: [
			{
				name: "identity",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "initialize",
		inputs: [
			{
				name: "init_vector_len",
				type: "felt",
			},
			{
				name: "init_vector",
				type: "felt*",
			},
		],
		outputs: [],
	},
	{
		type: "function",
		name: "transfer",
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
		type: "function",
		name: "transferFrom",
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
		type: "function",
		name: "approve",
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
		type: "function",
		name: "increaseAllowance",
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
		type: "function",
		name: "decreaseAllowance",
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
		type: "function",
		name: "permissionedMint",
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
		outputs: [],
	},
	{
		type: "function",
		name: "permissionedBurn",
		inputs: [
			{
				name: "account",
				type: "felt",
			},
			{
				name: "amount",
				type: "Uint256",
			},
		],
		outputs: [],
	},
];
