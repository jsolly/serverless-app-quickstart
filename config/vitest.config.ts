/// <reference types="vitest" />

import { resolve } from "node:path";
import { config } from "dotenv";
import { defineConfig } from "vite";

// Load environment variables from .env file
config({ path: resolve(__dirname, "../.env") });

export default defineConfig({
	test: {
		include: [resolve(__dirname, "../tests/**/*.test.ts")],
		silent: false,
	},
});
