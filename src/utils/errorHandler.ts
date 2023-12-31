import { logger } from "./logger.js";

export function errorHandler(error: Error) {
	const stackTrace = error.stack;
	let functionName = "";

	if (stackTrace) {
		const stackLines = stackTrace.split("\n");
		const firstStackLine = stackLines[1];
		functionName = /at (.+)\s\(/.exec(firstStackLine)?.[1] || "";
	}

	logger.error`An error occurred in function "${functionName}": ${error.message}`;
	logger.error`Stack trace: ${stackTrace}`;
}
