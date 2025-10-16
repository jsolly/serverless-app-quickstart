import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";

let SITE_URL = process.env.SITE_URL;

if (!SITE_URL && process.env.NODE_ENV === "development") {
	SITE_URL = loadEnv("development", process.cwd(), "").SITE_URL;
}

if (!SITE_URL) {
	throw new Error("SITE_URL environment variable is required");
}

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
