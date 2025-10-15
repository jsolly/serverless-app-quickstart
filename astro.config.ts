import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: vercel({
        // Enable if you later use edge middleware helpers; keep serverless for Supabase SSR consistency
        edgeMiddleware: false,
    }),

	site: process.env.SITE_URL,

	integrations: [sitemap({})],

	vite: {
		plugins: [tailwindcss()] as unknown as any,
	},
});
