import * as fs from "node:fs/promises";
import * as path from "node:path";
import { JSDOM } from "jsdom";

// Recursively find all .html files in a directory
async function findHtmlFiles(dir: string): Promise<string[]> {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const res = path.resolve(dir, entry.name);
			if (entry.isDirectory()) {
				return findHtmlFiles(res);
			} else if (entry.isFile() && res.endsWith(".html")) {
				return [res];
			} else {
				return [];
			}
		}),
	);
	return files.flat();
}

async function main() {
	const distPath = "./dist";
	let files: string[] = [];
	try {
		files = await findHtmlFiles(distPath);
	} catch (err) {
		console.error(`Error finding HTML files in ${distPath}:`, err);
		process.exit(1);
	}

	await Promise.all(
		files.map(async (file) => {
			try {
				let html = await fs.readFile(file, "utf-8");

				// Add IDs to h2, h3, and h4 tags
				const dom = new JSDOM(html);
				const headings = dom.window.document.querySelectorAll("h2, h3, h4");
				for (let i = 0; i < headings.length; i++) {
					const heading = headings[i];
					const text = heading.textContent || "";
					const id = text
						.trim()
						.replace(/[\s.,?:]+/g, "-")
						.replace(/-+$/, "")
						.toLowerCase();
					heading.setAttribute("id", id);
				}
				html = dom.serialize();

				await fs.writeFile(file, html);
				console.info(`Finished processing file: ${file}`);
			} catch (error) {
				console.error(`Error processing file: ${file}\n${error}`);
			}
		}),
	);
}

main().catch((err) => {
	console.error("Fatal error in process-html:", err);
	process.exit(1);
});
