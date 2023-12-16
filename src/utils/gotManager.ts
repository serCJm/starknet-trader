import got, { ExtendOptions } from "got";
import { HttpsProxyAgent } from "hpagent";
import { CookieJar } from "tough-cookie";
import { Proxy } from "../types.js";
import { logger } from "./logger.js";
import { randomNumber } from "./utils.js";

const USER_AGENTS = [
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0",
];

export class GotManager {
	static #initialized = false;

	static #getRandomUserAgent(): string {
		const randomIndex = randomNumber(0, USER_AGENTS.length - 1);
		return USER_AGENTS[randomIndex];
	}

	static #gotWithHeaders = got.extend({
		cookieJar: new CookieJar(),
		headers: {
			accept: "application/json, text/plain, */*",
			"accept-language": "en-US;q=0.8,en;q=0.7",
			"content-type": "application/json",
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"Windows"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site",
		},
	});

	public static get got() {
		if (!this.#initialized) {
			throw new Error(
				"GotManager is not initialized. Call 'initialize' method with appropriate proxy information before accessing 'got'.",
			);
		}
		return this.#got;
	}

	static #got = this.#gotWithHeaders;

	public static async initialize(proxy?: Proxy): Promise<void> {
		this.#got = this.#gotWithHeaders.extend({
			headers: {
				"user-agent": this.#getRandomUserAgent(),
			},
		});

		if (proxy) {
			const proxyStr = `http://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port}`;
			const options: ExtendOptions = {
				agent: {
					https: new HttpsProxyAgent({ proxy: proxyStr }),
				},
			};

			this.#got = this.#got.extend(options);
			await this.#testProxy();
		}
		this.#initialized = true;
	}

	static async #testProxy(): Promise<{
		success: boolean;
		proxyIP?: string;
		error?: string;
	}> {
		try {
			const proxyResponse = await this.#got(
				"https://api64.ipify.org?format=json",
			);
			const proxyIP = JSON.parse(proxyResponse.body).ip;

			logger.log`Proxy IP: ${proxyIP}`;
			return { success: true, proxyIP };
		} catch (error: any) {
			const errorMessage = `Error testing proxy: ${error}`;
			logger.error`${errorMessage}`;
			throw new Error(error);
		}
	}
}
