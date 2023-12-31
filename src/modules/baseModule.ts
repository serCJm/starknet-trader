import { MODULES_CONFIG } from "../../MODULES_CONFIG.js";
import { ModulesConfig } from "../types.js";
import { asyncRetry } from "../utils/asyncRetry.js";
import { logger } from "../utils/logger.js";
import { handleModuleError } from "../utils/web3/handleModuleError.js";

export abstract class BaseModule {
	static contractAddress: string;
	abstract run(): Promise<void>;
	protected config: ModulesConfig;
	constructor() {
		if (new.target.contractAddress === undefined) {
			throw new Error(
				`Class ${
					new.target.name
				} must define the static 'contractAddress'`
			);
		}
		this.config = MODULES_CONFIG[this.constructor.name];
	}

	protected logStart(methodName: string) {
		logger.log`### Starting ${methodName.toUpperCase()} on ${
			this.constructor.name
		} ###`;
	}

	static async runModule(derivedClass: new (...args: any[]) => BaseModule) {
		const className = derivedClass.name;
		logger.addCustomPrepend(`[${className}]`);

		const operation = async () => {
			const module = new derivedClass();
			await module.run();
			logger.success`$$$$$ Module executed successfully. $$$$$`;
		};

		await asyncRetry(operation, handleModuleError, [className]);
	}
}
