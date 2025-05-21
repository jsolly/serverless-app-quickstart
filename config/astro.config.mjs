import path from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
// @ts-nocheck
import { defineConfig } from "astro/config";
import dotenv from "dotenv";

// Load environment variables from the root directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// https://astro.build/config
export default defineConfig({
	site:
		process.env.NODE_ENV === "development"
			? "http://localhost:4321"
			: "https://www.example.com",
	integrations: [sitemap({}), vue()],
	vite: {
		plugins: [tailwindcss()],
	},
});
