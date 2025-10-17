import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";

let SITE_URL = process.env.SITE_URL;

if (!SITE_URL && process.env.NODE_ENV === "development") {
	SITE_URL = loadEnv("development", process.cwd(), "").SITE_URL;
}

// Use placeholder URL in CI environments (builds are for validation only, not deployment).
// The placeholder URL allows build validation without breaking CI pipelines while still
// enabling sitemap generation and URL validation in the build process.
if (!SITE_URL && process.env.CI === "true") {
	SITE_URL = "https://example.com";
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
