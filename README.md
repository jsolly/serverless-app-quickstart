# App Quickstart ⚡️

A serverless web application template built with Astro, deployed on Vercel, with Supabase authentication and PostgreSQL database.

## Dependencies

- [Astro](https://astro.build/) - Web framework with server-side rendering
- [Vercel](https://vercel.com/) - Serverless deployment platform
- [Supabase](https://supabase.com/) - Authentication and PostgreSQL database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Biome](https://biomejs.dev/) - Fast linter and formatter
- [Vitest](https://vitest.dev/) - Unit testing framework
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Setup

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://postgres.your-project:your-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Where to find these:**
- `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`: Supabase Dashboard → Project Settings → API (PUBLIC_ prefix makes them available in browser)
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Dashboard → Project Settings → API (under "Service role")
- `DATABASE_URL`: Supabase Dashboard → Project Settings → Database → Connection String → Transaction mode (pooler)

**Note:** `DATABASE_URL` is only needed for running the database setup script. The application itself uses the Supabase URL and auth keys.

**Security Note:** The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. Never expose it on the client side. It's only used in server-side API endpoints.

### Database Setup

Run the database setup script to create the users table with triggers and RLS policies:

```bash
./db/setup-database.sh
```

This creates:
- `users` table with email and bio fields
- Row Level Security (RLS) policies
- Automatic profile creation trigger on user signup
- Automatic profile deletion trigger on user deletion

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
│   │   │   └── profile/    # Profile management
│   │   ├── index.astro     # Landing page
│   │   ├── register.astro
│   │   ├── dashboard.astro
│   │   └── profile.astro
│   ├── styles/
│   │   └── global.css      # Global styles
│   └── types/
│       └── database.ts     # TypeScript types for database
├── tests/                  # Vitest unit tests
├── db/                     # Database setup scripts
│   ├── users-table.sql
│   └── setup-database.sh
├── astro.config.ts         # Astro + Vercel configuration
├── biome.jsonc             # Linter/formatter config
├── tsconfig.json
└── package.json
```

**Key Features:**
- 🔐 Authentication and PostgreSQL database with Supabase
- 👤 User profile management
- 🎨 Modern UI with Tailwind CSS
- 🚀 Serverless deployment on Vercel
- ✅ Type-safe database queries
- 🧪 Pre-configured testing setup

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
| `npm run check:iac`      | Run Terraform validation                         |
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

## 🚢 Deployment

### Deploying to Vercel

This project is configured for Vercel serverless deployment using the `@astrojs/vercel` adapter.

**Environment Variables on Vercel:**

Add these environment variables in your Vercel project settings:
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Deploy via GitHub:**
1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the Astro framework
4. Add environment variables
5. Deploy

**Deploy via CLI:**
```bash
npm i -g vercel
vercel --prod
```

### 🔓 Disable Vercel Deployment Protection (Production)

**Important:** By default, Vercel may enable Deployment Protection (SSO Authentication) which blocks access to all resources, including static assets like favicons and manifests, causing 401 errors.

**To fix this:**

1. Go to your Vercel project settings:
   ```
   https://vercel.com/[your-team]/[your-project]/settings/deployment-protection
   ```

2. Under **Vercel Authentication**, change the setting to:
   - **"Preview Deployments Only"** (recommended) - Keeps preview branches protected while making production public
   - **"Standard Protection"** - Protects all domains except Production Custom Domains
   - **"Disabled"** - Completely turns off protection

3. Save changes - takes effect immediately

**Why disable for production?**
- Your app needs to be publicly accessible
- Static assets (favicons, images, manifests) must load without authentication
- Your application handles its own authentication via Supabase
- Vercel protection is meant for internal/staging environments, not public websites

**Recommended:** Keep protection enabled for preview deployments to secure your work-in-progress branches.

### 🌐 Adding a Custom Domain (Cloudflare)

**Step 1: Add Domain in Vercel**

1. Go to your Vercel project → **Settings** → **Domains**
2. Add your domain (e.g., `yourdomain.com` and `www.yourdomain.com`)
3. Vercel will provide DNS records

**Step 2: Configure DNS in Cloudflare**

1. Log into Cloudflare and select your domain
2. Go to **DNS** → **Records**
3. Add the DNS records provided by Vercel:

   **For apex domain (yourdomain.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   Proxy status: DNS only (gray cloud)
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   Proxy status: DNS only (gray cloud)
   ```

4. **Important:** Turn off Cloudflare proxy (gray cloud icon) initially
   - Vercel needs to verify domain ownership
   - After verification, you can optionally enable proxy (orange cloud)

**Step 3: Wait for DNS Propagation**

- DNS changes typically take 5-30 minutes
- Vercel will automatically verify and issue SSL certificates
- You can check status in Vercel's Domains settings

**Step 4: (Optional) Enable Cloudflare Proxy**

After Vercel verifies the domain and SSL is active:
1. Return to Cloudflare DNS settings
2. Click the gray cloud icon to enable proxy (turns orange)
3. This enables Cloudflare's CDN and DDoS protection

**Troubleshooting:**
- If domain won't verify, ensure Cloudflare proxy is disabled (gray cloud)
- Check that you're using the correct DNS records from Vercel
- Wait at least 24 hours for full DNS propagation before troubleshooting

## Additional Resources

[Astro documentation](https://docs.astro.build)

[Biome documentation](https://biomejs.dev/guides/getting-started/)

[Discord server](https://astro.build/chat)
