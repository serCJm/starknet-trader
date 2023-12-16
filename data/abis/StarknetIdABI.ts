export const StarknetIdABI = [
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
				name: "tokenId",
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
				name: "approved",
				type: "felt",
			},
			{
				name: "tokenId",
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
				name: "owner",
				type: "felt",
			},
			{
				name: "operator",
				type: "felt",
			},
			{
				name: "approved",
				type: "felt",
			},
		],
		keys: [],
		name: "ApprovalForAll",
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
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
				type: "felt",
			},
			{
				name: "data",
				type: "felt",
			},
		],
		keys: [],
		name: "UserDataUpdate",
		type: "event",
	},
	{
		data: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
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
		keys: [],
		name: "ExtendedUserDataUpdate",
		type: "event",
	},
	{
		data: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
				type: "felt",
			},
			{
				name: "data",
				type: "felt",
			},
			{
				name: "verifier",
				type: "felt",
			},
		],
		keys: [],
		name: "VerifierDataUpdate",
		type: "event",
	},
	{
		data: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "author",
				type: "felt",
			},
			{
				name: "field",
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
		keys: [],
		name: "ExtendedVerifierDataUpdate",
		type: "event",
	},
	{
		data: [
			{
				name: "inft_contract",
				type: "felt",
			},
			{
				name: "inft_id",
				type: "felt",
			},
			{
				name: "starknet_id",
				type: "felt",
			},
		],
		keys: [],
		name: "on_inft_equipped",
		type: "event",
	},
	{
		name: "initializer",
		type: "function",
		inputs: [
			{
				name: "proxy_admin",
				type: "felt",
			},
			{
				name: "uri_base_len",
				type: "felt",
			},
			{
				name: "uri_base",
				type: "felt*",
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
		name: "balanceOf",
		type: "function",
		inputs: [
			{
				name: "owner",
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
		name: "ownerOf",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "owner",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "owner_of",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "owner",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "getApproved",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "approved",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "isApprovedForAll",
		type: "function",
		inputs: [
			{
				name: "owner",
				type: "felt",
			},
			{
				name: "operator",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "is_approved",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "tokenURI",
		type: "function",
		inputs: [
			{
				name: "tokenId",
				type: "Uint256",
			},
		],
		outputs: [
			{
				name: "tokenURI_len",
				type: "felt",
			},
			{
				name: "tokenURI",
				type: "felt*",
			},
		],
		stateMutability: "view",
	},
	{
		name: "supportsInterface",
		type: "function",
		inputs: [
			{
				name: "interfaceId",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "success",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "get_user_data",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "data",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "get_extended_user_data",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
				type: "felt",
			},
			{
				name: "length",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "data_len",
				type: "felt",
			},
			{
				name: "data",
				type: "felt*",
			},
		],
		stateMutability: "view",
	},
	{
		name: "get_unbounded_user_data",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "data_len",
				type: "felt",
			},
			{
				name: "data",
				type: "felt*",
			},
		],
		stateMutability: "view",
	},
	{
		name: "get_verifier_data",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
				type: "felt",
			},
			{
				name: "address",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "data",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "get_extended_verifier_data",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
				type: "felt",
			},
			{
				name: "length",
				type: "felt",
			},
			{
				name: "address",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "data_len",
				type: "felt",
			},
			{
				name: "data",
				type: "felt*",
			},
		],
		stateMutability: "view",
	},
	{
		name: "get_unbounded_verifier_data",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
				type: "felt",
			},
			{
				name: "address",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "data_len",
				type: "felt",
			},
			{
				name: "data",
				type: "felt*",
			},
		],
		stateMutability: "view",
	},
	{
		name: "get_equipped_starknet_id",
		type: "function",
		inputs: [
			{
				name: "inft_contract",
				type: "felt",
			},
			{
				name: "inft_id",
				type: "felt",
			},
		],
		outputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
		],
		stateMutability: "view",
	},
	{
		name: "approve",
		type: "function",
		inputs: [
			{
				name: "to",
				type: "felt",
			},
			{
				name: "starknet_id",
				type: "Uint256",
			},
		],
		outputs: [],
	},
	{
		name: "setApprovalForAll",
		type: "function",
		inputs: [
			{
				name: "operator",
				type: "felt",
			},
			{
				name: "approved",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "transferFrom",
		type: "function",
		inputs: [
			{
				name: "_from",
				type: "felt",
			},
			{
				name: "to",
				type: "felt",
			},
			{
				name: "starknet_id",
				type: "Uint256",
			},
		],
		outputs: [],
	},
	{
		name: "safeTransferFrom",
		type: "function",
		inputs: [
			{
				name: "_from",
				type: "felt",
			},
			{
				name: "to",
				type: "felt",
			},
			{
				name: "starknet_id",
				type: "Uint256",
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
		name: "mint",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "set_user_data",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
				type: "felt",
			},
			{
				name: "data",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "set_extended_user_data",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
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
		name: "set_verifier_data",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
				type: "felt",
			},
			{
				name: "data",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "set_extended_verifier_data",
		type: "function",
		inputs: [
			{
				name: "starknet_id",
				type: "felt",
			},
			{
				name: "field",
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
		name: "equip",
		type: "function",
		inputs: [
			{
				name: "inft_contract",
				type: "felt",
			},
			{
				name: "inft_id",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "unequip",
		type: "function",
		inputs: [
			{
				name: "inft_contract",
				type: "felt",
			},
			{
				name: "inft_id",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "upgrade",
		type: "function",
		inputs: [
			{
				name: "new_implementation",
				type: "felt",
			},
		],
		outputs: [],
	},
	{
		name: "set_token_uri_base",
		type: "function",
		inputs: [
			{
				name: "arr_len",
				type: "felt",
			},
			{
				name: "arr",
				type: "felt*",
			},
		],
		outputs: [],
	},
];
