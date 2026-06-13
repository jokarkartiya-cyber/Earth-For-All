# Earth For All — धरती सबकी है

A large global mission website for environmental conservation, animal welfare, forest protection, and water conservation — with community ideas board, problem reporting, educational articles, and platform stats.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/earth-for-all run dev` — run the frontend (port assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, shadcn/ui, Framer Motion, Recharts, wouter routing
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/earth-for-all/src/pages/` — all route pages (home, ideas, report, articles, clean-earth, animals, forest, water, technology)
- `artifacts/earth-for-all/src/components/layout/` — Navbar, Footer, MainLayout
- `artifacts/api-server/src/routes/` — all Express route handlers
- `lib/db/src/schema.ts` — DB schema (ideas, reports, articles tables)
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/api-client-react/src/generated/` — Orval-generated React Query hooks
- `lib/api-zod/src/generated/` — Orval-generated Zod schemas

## Architecture decisions

- Contract-first API: OpenAPI spec → codegen → React Query hooks + Zod schemas. Never hand-write API calls.
- Dark deep-earth theme: background `hsl(152 50% 4%)`, primary emerald, accent amber. CSS Google Fonts `@import url(...)` MUST be the very first line in `index.css` (before `@import "tailwindcss"`).
- All routes handled by wouter with base path from `import.meta.env.BASE_URL`.
- API and frontend served through the shared reverse proxy; API at `/api`, frontend at `/`.

## Product

- **Home** — hero, 6-cause grid, community stats + donut chart, recent ideas/reports/articles
- **Clean Earth** — waste/plastic facts, solutions, actions
- **Animals** — street animal problems, tech solutions, how to help
- **Forest** — deforestation facts, reforestation solutions
- **Water** — water scarcity data, conservation methods
- **Technology** — AI & innovation for Earth
- **Ideas Board** — submit and upvote community ideas, filterable by category
- **Report** — submit environmental/animal problems with location and type
- **Articles / Education Hub** — filterable knowledge base

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- CSS Google Fonts `@import url(...)` MUST be the very first line in `index.css` — if placed after `@import "tailwindcss"` PostCSS will throw an error.
- Do NOT run `pnpm dev` at workspace root — use `restart_workflow` instead.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
