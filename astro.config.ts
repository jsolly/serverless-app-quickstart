import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "server",

	site:
		process.env.NODE_ENV === "development"
			? "http://localhost:4321"
			: "https://www.example.com",

	integrations: [sitemap({})],

	vite: {
		plugins: [tailwindcss()],
	},
});
