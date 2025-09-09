# Repository Guidelines

## Project Structure & Module Organization
- `src/` — React app (TypeScript). Key areas: `components/`, `routes/` (TanStack Router file routes), `server/` (tRPC, Prisma, MinIO, utilities), `trpc/` (client), `generated/` (auto‑generated router artifacts), `styles.css` (Tailwind).
- `prisma/schema.prisma` — database schema.
- `public/` — static assets. `docker/` — container tooling. `scripts/` — helper scripts.

## Build, Test, and Development Commands
- `pnpm dev` — start dev server (vinxi + Vite) with router codegen.
- `pnpm build` — production build.
- `pnpm start` — run built app.
- `pnpm typecheck` — TypeScript no‑emit check.
- `pnpm lint` — ESLint with repo config.
- `pnpm format` — Prettier write.
- Database: `pnpm db:generate` (migrate dev), `pnpm db:migrate` (deploy), `pnpm db:push`, `pnpm db:studio`.
 - Data: `pnpm seed:products` (scrape from `data/products.json`), `pnpm update:prices` (refresh prices via Playwright).

## Coding Style & Naming Conventions
- Language: TypeScript, React 19, file‑based routing (TanStack).
- Indentation: 2 spaces; single quotes or repo default; keep imports sorted logically.
- Components: PascalCase files in `src/components` (e.g., `ProductGrid.tsx`).
- Routes: `src/routes/**/index.tsx` using `createFileRoute`.
- Use ESLint (`eslint.config.mjs`) and Prettier (`prettier.config.mjs`); Tailwind ordering via plugin.

## Testing Guidelines
- No unit test runner is configured. If adding tests, prefer Vitest (`*.test.ts[x]`) mirroring `src/` structure.
- Playwright is available for e2e; place specs under `tests/e2e` and add a script (e.g., `"test:e2e": "playwright test"`).

## Commit & Pull Request Guidelines
- Use clear, imperative messages (optionally Conventional Commits, e.g., `feat: add purchase flow`).
- PRs should include: purpose, screenshots for UI changes, migration notes for Prisma, and linked issues.
- Keep diffs focused; update docs and types alongside code.

## Security & Configuration Tips
- Env vars in `.env` power DB, auth, and providers. Do not commit secrets; use per‑developer files and CI secrets.
- After schema changes: update `schema.prisma`, run migrations, and regenerate client.

## Architecture Overview
- Frontend: React + TanStack Router + Tailwind.
- API: tRPC (`src/server/trpc`) with SuperJSON and Zod.
- Data: Prisma (`src/server/db.ts`) and object storage via MinIO (`src/server/minio.ts`).

## Data Ingestion & Worker
- Admin-only scraping: `addProductByUrl` (tRPC) scrapes real prices using Playwright for known stores. UI at `/admin/add-product` (requires admin login).
- Batch import: Copy `data/products.json.example` → `data/products.json`, then run `pnpm seed:products`.
- Price updates: `pnpm update:prices` or run the background agent in a separate process.
