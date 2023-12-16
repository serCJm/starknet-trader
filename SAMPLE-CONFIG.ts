import * as dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const SECRETS_PATH = "PATH-TO-ENV";

dotenv.config({ path: path.resolve(__dirname, SECRETS_PATH) });

if (!process.env.SECRETS) throw new Error("Missing wallet secrets!");

const WALLETS_TYPE = {
	DB: "db",
	ENV: "env",
} as const;

export const config = {
	EXCLUDED_WALLETS: await importExcludedWallets(
		"resources/excludedWallets.txt",
	),
	WALLETS_TYPE: WALLETS_TYPE.ENV as keyof typeof WALLETS_TYPE,
	SECRET_WALLET_DATA: JSON.parse(process.env.SECRETS || ""),
	WALLETS_RANGE: "1-10",
};

export async function importExcludedWallets(path: string) {
	const text = await fs.readFile(path, "utf8");

	const lines = text.split("\n");

	return lines.map((line) => line.trim().replace("\r", ""));
}
