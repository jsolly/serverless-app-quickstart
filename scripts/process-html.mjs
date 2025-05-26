import fs from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";

// Recursively find all .html files in a directory
async function findHtmlFiles(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const res = path.resolve(dir, entry.name);
			if (entry.isDirectory()) {
				return findHtmlFiles(res);
			} else if (entry.isFile() && res.endsWith(".html")) {
				return res;
			} else {
				return [];
			}
		}),
	);
	return files.flat();
}

const distPath = "./dist";
const files = await findHtmlFiles(distPath);

await Promise.all(
	files.map(async (file) => {
		try {
			let html = await fs.readFile(file, "utf-8");

			// Add IDs to h2, h3, and h4 tags
			const dom = new JSDOM(html);
			const headings = dom.window.document.querySelectorAll("h2, h3, h4");
			for (let i = 0; i < headings.length; i++) {
				const heading = headings[i];
				const text = heading.textContent;
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
