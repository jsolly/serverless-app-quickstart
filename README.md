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
├── config/
│   ├── astro.config.mjs
│   ├── biome.jsonc
│   ├── tsconfig.json
│   └── vitest.config.ts
├── scripts/
│   ├── process-html.mjs
├── tests/
├── .husky/
│   └── pre-commit.sh
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
| `npm type-check`         | Run TypeScript type checking                     |
| `npm validate`           | Run all checks                                   |
| `npm outdated`           | Check for outdated packages                     |
| `npm update`             | Update all packages to the latest versions      |

## Additional Packages/Tools added (These commands have already been run)

```shell
npm astro add tailwind sitemap
npm add --save-dev --save-exact @biomejs/biome
npm biome init
npm add --save-dev lint-staged husky
npm exec husky init
```

## Husky Configuration Notes

A pre-commit hook has been configured in `.husky/pre-commit` that runs `npm run validate` on all staged files.

## Additional Resources

[Astro documentation](https://docs.astro.build)

[Biome documentation](https://biomejs.dev/guides/getting-started/)

[Discord server](https://astro.build/chat)
