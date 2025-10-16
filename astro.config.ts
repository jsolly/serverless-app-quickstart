import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite"; // Astro doesn't support process.env directly

const { SITE_URL } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: vercel({
        // Enable if you later use edge middleware helpers; keep serverless for Supabase SSR consistency
        edgeMiddleware: false,
    }),

	site: SITE_URL,

	integrations: [sitemap({})],

	vite: {
		plugins: [tailwindcss()] as unknown as any,
	},
});
