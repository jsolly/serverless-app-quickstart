# App Quickstart ⚡️

## Dependencies

- [Astro](https://astro.build/)
- [Biome](https://biomejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [Husky](https://typicode.github.io/husky/)
- [Terraform](https://www.terraform.io/) # I use tfenv to manage my terraform versions

## Setup

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://postgres:password@host:5432/database
```

**Where to find these:**
- `SUPABASE_URL` and `SUPABASE_ANON_KEY`: Supabase Dashboard → Project Settings → API
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Dashboard → Project Settings → API (under "Service role")
- `DATABASE_URL`: Supabase Dashboard → Project Settings → Database → Connection String (Direct connection)

**Security Note:** The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. Never expose it on the client side. It's only used in server-side API endpoints.

### Database Setup

Run the database setup script to create the users table with triggers and RLS policies:

```bash
./scripts/setup-database.sh
```

This creates:
- `users` table with email and bio fields
- Row Level Security (RLS) policies
- Automatic profile creation trigger on user signup
- Automatic profile deletion trigger on user deletion

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
├── astro.config.ts
├── biome.jsonc
├── tsconfig.json
├── vitest.config.ts
├── .nvmrc
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
| `npm check`              | Run Biome formatting and linting checks         |
| `npm check:fix`          | Run Biome formatting and linting checks and fix issues |
| `npm type-check`         | Run TypeScript type checking                     |
| `npm validate`           | Run all checks                                   |
| `npm outdated`           | Check for outdated packages                     |
| `npm update`             | Update all packages to the latest versions      |

## Additional Packages/Tools added (These commands have already been run)

```shell
npm astro add tailwind sitemap
npm add --save-dev --save-exact @biomejs/biome
npm biome init
npm add --save-dev husky
npm exec husky init
```

## Pre-commit Hook Configuration

A pre-commit hook has been configured in `.husky/pre-commit` that runs biome check, tsc and astro check before each commit to format, lint and type check the code.

## Additional Resources

[Astro documentation](https://docs.astro.build)

[Biome documentation](https://biomejs.dev/guides/getting-started/)

[Discord server](https://astro.build/chat)
