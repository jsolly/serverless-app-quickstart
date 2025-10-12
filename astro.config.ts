import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: vercel({
        // Enable if you later use edge middleware helpers; keep serverless for Supabase SSR consistency
        edgeMiddleware: false,
    }),

	site:
		process.env.NODE_ENV === "development"
			? "http://localhost:4321"
			: "https://www.example.com",

	integrations: [sitemap({})],

	vite: {
		plugins: [tailwindcss()] as unknown as any,
	},
});
