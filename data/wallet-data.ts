import Table from "cli-table";
import { Wallet, ethers } from "ethers";
import { Account, validateAndParseAddress } from "starknet";
import { STARKNET_WALLET_TYPES, StarknetWalletType } from "../src/types.js";
import { GotManager } from "../src/utils/gotManager.js";
import { logger } from "../src/utils/logger.js";
import { getWeek } from "../src/utils/utils.js";
import { ProviderManager } from "./chain-data.js";

const QUERIES = {
	transfersQuery:
		"query TransactionsTableQuery(\n  $first: Int!\n  $after: String\n  $input: TransactionsInput!\n) {\n  ...TransactionsTablePaginationFragment_transactions_2DAjA4\n}\n\nfragment TransactionsTableExpandedItemFragment_transaction on Transaction {\n actual_fee\n  entry_point_selector_name\n  calldata_decoded\n  entry_point_selector\n  calldata\n  initiator_address\n  initiator_identifier\n  main_calls {\n    selector\n    selector_name\n    calldata_decoded\n    selector_identifier\n    calldata\n    contract_address\n    contract_identifier\n    id\n  }\n}\n\nfragment TransactionsTablePaginationFragment_transactions_2DAjA4 on Query {\n  transactions(first: $first, after: $after, input: $input) {\n    edges {\n      node {\n        id\n        ...TransactionsTableRowFragment_transaction\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TransactionsTableRowFragment_transaction on Transaction {\n  id\n  transaction_hash\n  block_number\n  transaction_status\n  transaction_type\n  timestamp\n  initiator_address\n  initiator_identifier\n  initiator {\n    is_social_verified\n    id\n  }\n  main_calls {\n    selector_identifier\n    id\n  }\n  ...TransactionsTableExpandedItemFragment_transaction\n}\n",
} as const;

export class WalletManager {
	static #ethSigner: Wallet | null = null;
	static #starknetSigner: Account | null = null;
	static #ethAddress: string;
	static #starkAddress: string;
	static #starkWalletType: StarknetWalletType;
	static #walletStats: WalletStats = {
		data: null,
		uniqueContracts: null,
		uniqueContractAddresses: null,
		uniqueDays: null,
		uniqueWeeks: null,
		uniqueMonths: null,
		totalTx: null,
		totalGasUsed: null,
	};

	static get ethSigner(): Wallet {
		if (!this.#ethSigner) throw new Error("Eth wallet not initialized");
		return this.#ethSigner;
	}

	static get starknetSigner(): Account {
		if (!this.#starknetSigner)
			throw new Error("Starknet wallet not initialized");
		return this.#starknetSigner;
	}

	static get ethAddress(): string {
		if (!this.#ethAddress) throw new Error("EVM Wallet not initialized");
		return this.#ethAddress;
	}
	static get starkAddress(): string {
		if (!this.#starkAddress)
			throw new Error("STARKNET Wallet not initialized");
		return this.#starkAddress;
	}
	static get starkWalletType(): StarknetWalletType {
		if (!this.#starkWalletType)
			throw new Error("STARKNET Wallet not initialized");
		return this.#starkWalletType;
	}

	public static initEVM(privateKey: string | Wallet): void {
		const ethProvider = ProviderManager.eth;
		if (typeof privateKey === "string") {
			this.#ethSigner = new Wallet(privateKey, ethProvider);
		} else {
			this.#ethSigner = privateKey.connect(ethProvider);
		}
		this.#ethAddress = this.#ethSigner.address;
	}

	public static initSTARK(
		address: string,
		privateKey: string,
		type: StarknetWalletType,
	): void {
		const cairoVersion = type === STARKNET_WALLET_TYPES.BRAAVOS ? "0" : "1";
		this.#starknetSigner = new Account(
			ProviderManager.starknet,
			address,
			privateKey,
			cairoVersion,
		);
		this.#starkAddress = address;
		this.#starkWalletType = type;

		WalletManager.#clearWalletStats();
	}

	static #clearWalletStats() {
		WalletManager.#walletStats = {
			data: null,
			totalTx: null,
			uniqueContracts: null,
			uniqueContractAddresses: null,
			uniqueDays: null,
			uniqueWeeks: null,
			uniqueMonths: null,
			totalGasUsed: null,
		};
	}

	static async #getWalletData() {
		if (WalletManager.#walletStats.data) {
			return WalletManager.#walletStats.data;
		}

		WalletManager.#walletStats.data = [];

		const got = GotManager.got.extend({
			headers: {
				origin: "https://starkscan.co",
				referer: "https://starkscan.co/",
			},
		});

		await got.get("https://starkscan.co");

		const apiUrl = "https://graphql.starkscancdn.com/";

		let retry = 0;

		while (retry < 3) {
			try {
				const response: ExplorerResponse = await got
					.post(`${apiUrl}`, {
						json: {
							query: QUERIES.transfersQuery,
							variables: {
								first: 30,
								after: null,
								input: {
									initiator_address:
										WalletManager.starkAddress,
									max_block_number: null,
									max_timestamp: null,
									min_block_number: null,
									min_timestamp: null,
									order_by: "desc",
									sort_by: "timestamp",
									transaction_types: null,
								},
							},
						},
					})
					.json();

				const { edges } = response.data.transactions;

				WalletManager.#walletStats.data = edges.filter((edge) =>
					edge.node.transaction_status.includes("ACCEPTED"),
				);

				retry = 3;
			} catch (error: any) {
				logger.error`${error}`;
				retry++;
			}
		}
	}

	static async #getWalletStats() {
		if (!WalletManager.#walletStats.data) {
			await WalletManager.#getWalletData();
		}

		const data = WalletManager.#walletStats.data!;
		const totalTx = data.length;
		const uniqueContracts = new Set();
		const uniqueDays = new Set();
		const uniqueWeeks = new Set();
		const uniqueMonths = new Set();
		let totalGasUsed = 0n;

		data.forEach(({ node }) => {
			node.main_calls?.forEach((call) =>
				uniqueContracts.add(
					validateAndParseAddress(call.contract_address),
				),
			);
			const date = new Date(node.timestamp * 1000);
			uniqueDays.add(date.toDateString());
			uniqueWeeks.add(date.getFullYear() + "-" + getWeek(date));
			uniqueMonths.add(date.getFullYear() + "-" + date.getMonth());

			totalGasUsed = totalGasUsed + BigInt(node.actual_fee);
		});

		Object.assign(WalletManager.#walletStats, {
			totalTx,
			uniqueContracts: uniqueContracts.size,
			uniqueContractAddresses: uniqueContracts,
			uniqueDays: uniqueDays.size,
			uniqueWeeks: uniqueWeeks.size,
			uniqueMonths: uniqueMonths.size,
			totalGasUsed,
		});
	}

	static async getWalletContracts() {
		if (!WalletManager.#walletStats.uniqueContractAddresses) {
			await WalletManager.#getWalletStats();
		}
		return WalletManager.#walletStats.uniqueContractAddresses!;
	}

	static async printWalletStats() {
		if (
			!WalletManager.#walletStats.data &&
			!WalletManager.#walletStats.uniqueContracts
		) {
			await WalletManager.#getWalletStats();
		}

		const statsData: any = { ...WalletManager.#walletStats };

		delete statsData.data;
		delete statsData.uniqueContractAddresses;

		statsData.totalGasUsed = ethers.formatEther(statsData.totalGasUsed);

		const table = new Table({
			head: [...Object.keys(statsData)],
			rows: [Object.values(statsData)],
		});

		console.log(table.toString());
	}
}

type WalletStats = {
	data: { node: Transaction }[] | null;
	uniqueContracts: number | null;
	uniqueContractAddresses: Set<string> | null;
	uniqueDays: number | null;
	uniqueWeeks: number | null;
	uniqueMonths: number | null;
	totalTx: number | null;
	totalGasUsed: bigint | null;
};

type CallData = {
	selector_identifier: string;
	id: string;
	contract_identifier: string;
	selector: string;
	selector_name: string;
	calldata_decoded: Array<object>; // You should specify a more detailed type for the objects inside the array
	calldata: Array<string>;
	contract_address: string;
};

type Transaction = {
	id: string;
	transaction_hash: string;
	block_number: number;
	transaction_status: "ACCEPTED_ON_L1" | string;
	transaction_type: "INVOKE_FUNCTION" | string;
	timestamp: number;
	initiator_address: string;
	initiator_identifier: string;
	initiator: object;
	main_calls: CallData[];
	actual_fee: string;
	entry_point_selector_name: string;
	calldata_decoded: Array<any>;
	entry_point_selector: null;
	calldata: Array<any>;
	__typename: string;
};

type ExplorerResponse = {
	data: {
		transactions: {
			edges: { node: Transaction }[];
		};
	};
};
