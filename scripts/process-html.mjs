import fs from "node:fs/promises";
import { globby } from "globby";
import { JSDOM } from "jsdom";

// Get all HTML files from the output directory
const path = "./dist";
const files = await globby(`${path}/**/*.html`);

await Promise.all(
	files.map(async (file) => {
		console.info("Processing fil:", file);
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
	}),
);
