import * as crypto from "crypto";
import mongoose, { Document } from "mongoose";
import { config } from "../../config.js";
import {
	STARKNET_WALLET_TYPES,
	StarknetWalletType,
	WalletDataType,
} from "../types.js";
import { getUserInput } from "./getUserInput.js";

const { EXCLUDED_WALLETS } = config;
const excludedWalletsSet = new Set(EXCLUDED_WALLETS);

export type User = {
	name: number;
	address: string;
	wallet: string;
	starknet?: {
		[STARKNET_WALLET_TYPES.ARGENT]?: {
			address: string;
			privateKey: string;
		};
		[STARKNET_WALLET_TYPES.BRAAVOS]?: {
			address: string;
			privateKey: string;
		};
	};
};

const userSchema = new mongoose.Schema({
	name: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	wallet: {
		type: String, // encrypted wallet json
		required: true,
	},
	starknet: {
		[STARKNET_WALLET_TYPES.ARGENT]: {
			address: { type: String, required: true },
			privateKey: { type: String, required: true },
		},
		[STARKNET_WALLET_TYPES.BRAAVOS]: {
			address: { type: String, required: true },
			privateKey: { type: String, required: true },
		},
	},
});

const UserModel = mongoose.model("User", userSchema);
type Query = {
	name?: number | { [key: string]: number | number[] };
	starknet?: { [key: string]: any };
};

mongoose.connection.on("error", (err) => {
	console.error("MongoDB connection error:", err);
});

async function connectDb() {
	try {
		await mongoose.connect(config.DB_URL);
		console.log("MongoDB connected successfully.");
	} catch (err) {
		console.error("Failed to connect to MongoDB:", err);
	}
}

async function disconnectDb() {
	try {
		await mongoose.disconnect();
		console.log("MongoDB disconnected successfully.");
	} catch (err) {
		console.error("Failed to disconnect from MongoDB:", err);
	}
}

export function decryptData(encryptedData: string, password: string) {
	const data = JSON.parse(encryptedData);

	const iv = Buffer.from(data.iv, "hex");
	const key = crypto.pbkdf2Sync(
		password,
		data.salt,
		config.PBKDF2_ITERATIONS,
		32,
		"sha512",
	);
	const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
	decipher.setAuthTag(Buffer.from(data.authTag, "hex"));

	let decrypted = decipher.update(data.encryptedData, "hex", "utf8");
	decrypted += decipher.final("utf8");

	return decrypted;
}

type UserModelInstance = Document & User;

async function findWalletsInRange(
	range: string = "",
	walletType?: StarknetWalletType,
): Promise<UserModelInstance[]> {
	try {
		await connectDb();
		const trimmedRange = range.trim();

		const queries = buildQueries(trimmedRange, walletType);

		const projection = {
			name: 1,
			starknet: 1,
			_id: 0,
		};

		const docsPr: Promise<UserModelInstance[]>[] = queries.map((q) =>
			UserModel.find(q, projection).sort({
				name: "ascending",
			}),
		);
		const docs: UserModelInstance[][] = await Promise.all(docsPr);
		return docs.flat();
	} catch (err) {
		console.error(err);
		throw err;
	} finally {
		await disconnectDb();
	}
}

function buildQueries(
	trimmedRange: string,
	walletType?: StarknetWalletType,
): Query[] {
	const queries: Query[] = [];

	const baseQuery = walletType
		? {
				[`starknet.${walletType}`]: { $exists: true },
		  }
		: {
				[`starknet`]: { $exists: true },
		  };

	if (trimmedRange === "") {
		// if range is empty, return all documents
		queries.push(baseQuery);
	}

	if (trimmedRange.includes(",")) {
		const numbers = trimmedRange
			.split(",")
			.map(Number)
			.filter((num) => !Number.isNaN(num));
		queries.push({
			...baseQuery,
			name: {
				$in: numbers,
			},
		});
	} else {
		const parts = trimmedRange.split("-").map((part) => part.trim());

		if (parts.length > 2) {
			throw new Error(
				'Input must be in the format "start-end" or a list of numbers',
			);
		}

		const start = Number(parts[0]);
		const end = Number(parts.length > 1 ? parts[1] : parts[0]);

		if (Number.isNaN(start) || Number.isNaN(end)) {
			throw new Error("Both start and end must be valid numbers");
		}

		if (start <= end) {
			queries.push({
				...baseQuery,
				name: {
					$gte: start,
					$lte: end,
				},
			});
		} else {
			const query1 = {
				...baseQuery,
				name: start,
			};
			const query2 = {
				...baseQuery,
				name: {
					$gte: end,
					$lte: start - 1,
				},
			};
			queries.push(query1, query2);
		}
	}

	return queries;
}

async function decryptWallets(encryptedWallets: UserModelInstance[]) {
	if (!Array.isArray(encryptedWallets) || encryptedWallets.length === 0)
		throw new Error("No wallets found");
	const password = await getUserInput("Please enter wallet password: ");
	const decryptedWalletsPr = encryptedWallets.map(
		async (encWallet: UserModelInstance) => {
			const { name, starknet } = encWallet;

			const result: WalletDataType[] = [];
			if (starknet !== undefined) {
				for (const walletType in starknet) {
					const wallet = starknet[walletType as StarknetWalletType]!;
					if (wallet.address && wallet.privateKey) {
						if (excludedWalletsSet.has(wallet.address)) {
							console.info(
								`Skipping wallet ${name} as it's in the excluded list.`,
							);
							continue;
						}

						const walletKey = decryptData(
							wallet.privateKey,
							password,
						);
						result.push({
							name,
							type: walletType as StarknetWalletType,
							address: wallet.address,
							privateKey: walletKey,
						});
					}
				}
			}

			console.log(`SUCCESS decrypting wallet: ${name}`);
			return result;
		},
	);

	const decryptedWallets = await Promise.all(decryptedWalletsPr);

	return decryptedWallets.flat();
}

export async function getWallets(
	range: string,
	walletType?: StarknetWalletType,
): Promise<WalletDataType[]> {
	try {
		const encryptedWallets = await findWalletsInRange(range, walletType);
		const decryptedWallets = await decryptWallets(encryptedWallets);
		return decryptedWallets;
	} catch (err) {
		console.error(err);
		throw new Error("Error getting wallets");
	}
}
