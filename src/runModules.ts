import {
	GLOBAL_CONFIG,
	MODULES_CONFIG,
	MODULE_MAP,
} from "./../MODULES_CONFIG.js";
import { BaseModule } from "./modules/baseModule.js";
import { BaseModuleDerivedClass, ORDER } from "./types.js";
import { countdownTimer } from "./utils/countdownTimer.js";
import { logger } from "./utils/logger.js";
import { shuffleArr } from "./utils/utils.js";

async function getEnabledModules(): Promise<BaseModuleDerivedClass[]> {
	const enabledModules = Object.values(MODULE_MAP).filter(
		(module) => MODULES_CONFIG[module.name].ENABLED,
	);

	if (enabledModules.length === 0) return [];

	switch (GLOBAL_CONFIG.ORDER) {
		case ORDER.RANDOM:
			return shuffleArr(enabledModules);
		case ORDER.ONE_RANDOM:
			return [shuffleArr(enabledModules)[0]];
		default:
			return enabledModules;
	}
}

export async function runModules() {
	const enabledModules = await getEnabledModules();

	if (enabledModules.length === 0) throw new Error("Modules EMPTY");

	const [minTime, maxTime] = GLOBAL_CONFIG.MINMAX_MODULES_WAIT_TIME;

	for (const [index, module] of enabledModules.entries()) {
		try {
			await BaseModule.runModule(module);

			const notLast = index < enabledModules.length - 1;
			if (notLast) await countdownTimer(minTime, maxTime);
		} catch (error) {
			logger.error`Module failed, switching to next one...`;
			console.log(error);
		}
	}
}
