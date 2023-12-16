export const JediSwapFactoryABI = [
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
				name: "token0",
				type: "felt",
			},
			{
				name: "token1",
				type: "felt",
			},
			{
				name: "pair",
				type: "felt",
			},
			{
				name: "total_pairs",
				type: "felt",
			},
		],
		keys: [],
		name: "PairCreated",
		type: "event",
	},
	{
		name: "initializer",
		type: "function",
		inputs: [
			{
				name: "pair_proxy_contract_class_hash",
				type: "felt",
			},
			{
				name: "pair_contract_class_hash",
				type: "felt",
			},
			{
				name: "fee_to_setter",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "get_pair",
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
		],
		outputs: [
			{
				name: "pair",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "get_all_pairs",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "all_pairs_len",
				type: "felt",
			},
			{
				name: "all_pairs",
				type: "felt*",
			},
		],
		stateMutability: "view",
	},
	{
		name: "get_num_of_pairs",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "num_of_pairs",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "get_fee_to",
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
		name: "get_fee_to_setter",
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
		name: "get_pair_contract_class_hash",
		type: "function",
		inputs: [],
		outputs: [
			{
				name: "class_hash",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "create_pair",
		type: "function",
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
				name: "pair",
				type: "felt",
			},
		],
	},
	{
		name: "set_fee_to",
		type: "function",
		inputs: [
			{
				name: "new_fee_to",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "set_fee_to_setter",
		type: "function",
		inputs: [
			{
				name: "new_fee_to_setter",
				type: "felt",
			},
		],
		outputs: [],
	},
];
