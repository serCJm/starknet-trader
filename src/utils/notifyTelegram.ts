import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { ENV_PATH } from "../../config.js";
import { GotManager } from "./gotManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ENV_PATH) });

if (!process.env.TELEGRAM_BOT_TOKEN) throw new Error("Missing !");
if (!process.env.TELEGRAM_CHAT_ID) throw new Error("Missing db password!");

export async function notifyTelegram(text: string) {
	const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

	try {
		await GotManager.got.post(url, {
			json: {
				chat_id: process.env.TELEGRAM_CHAT_ID,
				text,
			},
		});
	} catch (error) {
		console.error("Error sending message to Telegram:", error);
	}
}
