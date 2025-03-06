# Static Astro Website

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

To learn more about the folder structure of an Astro project, refer to [Astro's guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`            | Installs dependencies                            |
| `npm dev`                | Starts local dev server at `localhost:4321`      |
| `npm build`              | Build your production site to `./dist/`          |
| `npm preview`            | Preview your build locally, before deploying     |
| `npm astro ...`          | Run CLI commands like `astro add`, `astro check` |
| `npm lint`               | Run Biome linter                                 |
| `npm lint-fix`           | Run Biome linter and fix issues                  |
| `npm format`             | Format files using Biome                         |
| `npm check`              | Run Biome checks with auto-fixes                 |

## Additional Packages/Tools added (These commands have already been run)

```shell
npm astro add tailwind sitemap
npm add --save-dev --save-exact @biomejs/biome
npm biome init
npm add --save-dev lint-staged husky
npm exec husky init
```

## Biome Configuration Notes

The project includes specific linting overrides for `.svelte`, `.astro`, and `.vue` files in `biome.json`. These overrides (disabling `useConst` and `useImportType` rules) are necessary due to limited Astro support as of January 1, 2025. See [Biome language support](https://biomejs.dev/internals/language-support/#html-super-languages-support) for more information.

## Husky Configuration Notes

A pre-commit hook has been configured in `.husky/pre-commit` that runs lint-staged before each commit. The script:

- Runs lint-staged to format and lint staged files using Biome
- Fails the commit if lint-staged reports any errors

```shell
echo "🚀 Running pre-commit hook..."
echo "Files to be processed:"
git diff --cached --name-only
echo "---"
npm lint-staged
lint_status=$?

if [ $lint_status -ne 0 ]; then
  echo "❌ Lint-staged failed! Please fix the errors and try committing again."
  exit $lint_status
fi

echo "✅ Pre-commit hook completed successfully"
```

This ensures that all committed code meets the project's formatting and linting standards, with clear visual feedback during the commit process.

## Lint-staged Configuration Notes

Lint-staged is configured in `package.json` to run `biome check` on all staged files. The configuration uses the `--no-errors-on-unmatched` flag to prevent errors when processing unsupported file types, and `--write` to allow automatic fixes where possible.

```json
"lint-staged": {
    "*": ["biome check --no-errors-on-unmatched --write"]
}
```

This ensures that all staged files are checked and formatted before each commit, with Biome gracefully handling files it doesn't support. The check command combines both formatting and linting in a single pass.

## Additional Resources

[Astro documentation](https://docs.astro.build)

[Biome documentation](https://biomejs.dev/guides/getting-started/)

[Discord server](https://astro.build/chat)
