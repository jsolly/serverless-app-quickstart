import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
	{
		extends: "./config/vitest.config.ts",
		test: {
			name: "root",
			include: ["test/**/*.test.ts"],
			environment: "node",
		},
	},
]);
