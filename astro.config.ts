import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site:
		process.env.NODE_ENV === "development"
			? "http://localhost:4321"
			: "https://www.example.com",

	integrations: [sitemap({})],

	vite: {
		// @ts-expect-error - TailwindCSS Vite plugin type incompatibility
		plugins: [tailwindcss()],
	},
});
