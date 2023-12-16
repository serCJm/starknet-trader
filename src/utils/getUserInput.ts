import * as readline from "readline";

export async function getUserInput(question: string): Promise<string> {
	return new Promise<string>((resolve) => {
		let input = "";

		const rl = readline.createInterface({
			input: process.stdin,
			output: undefined,
			terminal: true,
		});

		process.stdout.write(question);

		process.stdin.on("keypress", (chunk, key) => {
			if (key && key.name === "backspace") {
				if (input.length > 0) {
					input = input.slice(0, input.length - 1);
					process.stdout.write("\b \b");
				}
			} else if (key && key.name === "return") {
				rl.close();
			} else {
				input += chunk;
				process.stdout.write("*");
			}
		});

		rl.on("close", () => {
			resolve(input);
			process.stdout.write("\n");
		});
	});
}
