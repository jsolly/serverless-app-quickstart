# App Quickstart ⚡️

A serverless web application template built with AstroJS, deployed on Vercel, with Supabase authentication and PostgreSQL database.

## Dependencies

- [Astro](https://astro.build/) - Web framework with server-side rendering
- [Vercel](https://vercel.com/) - Serverless deployment platform
- [Supabase](https://supabase.com/) - Authentication and PostgreSQL database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Biome](https://biomejs.dev/) - Fast linter and formatter
- [Vitest](https://vitest.dev/) - Unit testing framework
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Development Setup

### 1. Clone and Install

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/serverless-app-quickstart.git
cd serverless-app-quickstart
npm install
```

### 2. Create Supabase and Vercel Projects

**Supabase:**
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a project name, database password, and region
3. Wait for the project to finish provisioning

**Vercel:**
1. Push your code to GitHub (if you haven't already)
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will automatically detect the Astro framework
4. Don't deploy yet - we'll add environment variables first

### 3. Environment Variables

**For local development**, create a `.env.local` file in the root directory with the following variables:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://postgres.your-project:your-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
SITE_URL=http://localhost:4321
```

**Where to find these:**
- `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`: Supabase Dashboard → Project Settings → API (the PUBLIC_ prefix makes them available in the browser)
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Dashboard → Project Settings → API (under "Service role")
- `DATABASE_URL`: Supabase Dashboard → Project Settings → Database → Connection String → Transaction mode (pooler)
- `SITE_URL`: Must be a full URL including the protocol scheme. Use `http://localhost:4321` for local development or `https://yourdomain.com` for production.
**Note:** `DATABASE_URL` is only needed for running the database setup script. The application itself uses the Supabase URL and auth keys.

**Security Note:** The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. Never expose it on the client side. It's only used in server-side API endpoints.

**For production deployment**, you'll add these same environment variables to Vercel in step 5 (except `DATABASE_URL`, which is only needed locally for the setup script).

### 4. Database Setup

Run the database setup script to create the users table with triggers and RLS policies:

```bash
./db/apply-schema.sh
```

This creates:
- `users` table with email and bio fields
- Row Level Security (RLS) policies
- Automatic profile creation trigger on user signup
- Automatic profile deletion trigger on user deletion

### 5. Deploy to Vercel

Add environment variables to your Vercel project and deploy:

1. In your Vercel project settings (Settings → Environment Variables), add these:
   - `PUBLIC_SUPABASE_URL` - Same value as in your `.env.local`
   - `PUBLIC_SUPABASE_ANON_KEY` - Same value as in your `.env.local`
   - `SUPABASE_SERVICE_ROLE_KEY` - Same value as in your `.env.local`
   - `SITE_URL` - Your production URL (e.g., `https://yourdomain.com`)
2. Trigger a deployment (push to your main branch or click "Redeploy" in Vercel)
3. Vercel will automatically build and deploy your application

## 🚀 Project Structure

```text
/
├── public/
│   └── favicons/           # Favicon files
├── src/
│   ├── components/         # Reusable Astro components
│   │   ├── Navigation.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   └── CTA.astro
│   ├── layouts/
│   │   └── Layout.astro    # Main layout with meta tags
│   ├── lib/                # Utility functions and clients
│   │   ├── supabase.ts     # Supabase client configuration
│   │   └── users.ts        # User service functions
│   ├── pages/              # File-based routing
│   │   ├── api/            # API endpoints
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   │   ├── delete-account.ts
│   │   │   │   ├── forgot-password.ts
│   │   │   │   ├── register.ts
│   │   │   │   ├── resend-verification.ts
│   │   │   │   ├── signin.ts
│   │   │   │   └── signout.ts
│   │   │   └── profile/    # Profile management
│   │   │       └── update.ts
│   │   ├── index.astro     # Landing page
│   │   ├── register.astro
│   │   ├── forgot.astro
│   │   ├── recover.astro
│   │   ├── unconfirmed.astro
│   │   ├── dashboard.astro
│   │   └── profile.astro
│   ├── styles/
│   │   └── safelist-tailwindcss.txt
│   ├── global.css          # Global styles
│   └── env.d.ts            # TypeScript environment types
├── tests/                  # Vitest unit tests
├── db/                     # Database setup scripts
│   ├── users-table.sql
│   └── apply-schema.sh
├── astro.config.ts         # Astro + Vercel configuration
├── biome.jsonc             # Linter/formatter config
├── tsconfig.json
├── env.example             # Environment variables template
└── package.json
```

**Key Features:**
- 🔐 Authentication and PostgreSQL database with Supabase
- 👤 User profile management
- 🎨 Modern UI with Tailwind CSS
- 🚀 Serverless deployment on Vercel

To learn more about the folder structure of an Astro project, refer to [Astro's guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`            | Installs dependencies                            |
| `npm run dev`            | Starts local dev server at `localhost:4321`      |
| `npm run build`          | Build your production site to `./dist/`          |
| `npm run preview`        | Preview your build locally, before deploying     |
| `npm run test:unit`      | Run unit tests with Vitest                       |
| `npm run check:ts`       | Run TypeScript type checking                     |
| `npm run check:biome`    | Run Biome linter and formatter (auto-fix)        |
| `npm run fix`            | Run linter + type checking (fixes what it can)   |
| `npm run outdated`       | Check for outdated packages                      |
| `npm run update`         | Update all packages to latest versions           |

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