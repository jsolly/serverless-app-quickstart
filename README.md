## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

##    Additional Packages/Tools added (These commands have already been run)

```shell
pnpm astro add tailwind
pnpm add --save-dev --save-exact @biomejs/biome
pnpm biome init
pnpm add --save-dev lint-staged husky
pnpm exec husky init
# See #biome-configuration-notes for additional properties added to biome.json

```

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Biome Configuration Notes

The project includes specific linting overrides for `.svelte`, `.astro`, and `.vue` files in `biome.json`. These overrides (disabling `useConst` and `useImportType` rules) are necessary due to limited Astro support as of January 1, 2025. See (Biome language support)[https://biomejs.dev/internals/language-support/#html-super-languages-support] for more information.

## Husky Configuration Notes

A pre-commit hook has been configured in `.husky/pre-commit` that runs lint-staged before each commit. The script:
- Runs lint-staged to format and lint staged files using Biome
- Provides visual feedback with status messages and emojis
- Checks the exit status of lint-staged
- Fails the commit if lint-staged reports any errors
- Includes helpful error messages to guide developers when linting fails

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 Running pre-commit hook..."
pnpm lint-staged
lint_status=$?

if [ $lint_status -ne 0 ]; then
  echo "❌ Lint-staged failed! Please fix the errors and try committing again."
  exit $lint_status
fi

echo "✅ Pre-commit hook completed successfully"
# Ensure the script exits with success if everything passed
exit 0
```

This ensures that all committed code meets the project's formatting and linting standards, with clear visual feedback during the commit process.

## Lint-staged Configuration Notes

Lint-staged is configured in `package.json` to run `biome format --write` and `biome lint --write` on all staged files. This ensures that all staged files are formatted and linted before each commit. The linter will fix any errors it can (e.g. missing semicolons, etc.) but will not fix errors that require manual intervention (e.g. unused imports, etc.). TEst

```json
"lint-staged": {
  "**/*.{js,jsx,ts,tsx,md,mdx,json,astro}": [
    "biome format --write",
    "biome lint --write"
  ]
}
```
