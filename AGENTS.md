# AGENTS.md

## Cursor Cloud specific instructions

This is a single-product **Vite + React + TypeScript** marketing landing page ("VideoForge"), bootstrapped by Lovable, with a Supabase backend. The only thing you develop/run locally is the Vite frontend (Node + npm). Dependencies are installed by the startup update script (`npm install`), so you don't need to install them again.

### Services

| Service | Required | How to run | Notes |
|---------|----------|------------|-------|
| Vite dev server (frontend) | Yes | `npm run dev` | Serves the app on **http://localhost:8080** (port + host `::` are set in `vite.config.ts`). |
| Supabase (Postgres / Edge Functions / Resend email) | Backend, hosted | n/a locally | See limitation below. |

Standard scripts live in `package.json`: `dev`, `build`, `build:dev`, `preview`, `lint` (`eslint .`), `test` (`vitest run`), `test:watch`.

### Backend limitation (important)

The active Supabase client URL is **hard-coded** in `src/integrations/supabase/client.ts` (an auto-generated "do not edit" file) and points at the hosted project `eejnkddyhrxzaunlksag.supabase.co`. As of this setup that host returns **NXDOMAIN** (the hosted project no longer exists), so the order-form submission (insert into `dfy_orders` + the `send-dfy-order-notification` edge function / Resend email) **cannot complete end-to-end**. The frontend still renders fully and all client-side logic (form validation, theme toggles, dropdowns, scrolling/CTAs) works; only the final network write fails with `net::ERR_NAME_NOT_RESOLVED`.

To exercise the backend end-to-end you would need a live Supabase project: either restore/recreate it via Lovable and update the hard-coded URL + anon key in `src/integrations/supabase/client.ts`, or run a local Supabase stack (requires Docker + the Supabase CLI, apply `supabase/migrations/*.sql`, then repoint that same client file). Neither is wired up by default.

### Lint note

`npm run lint` currently reports **3 pre-existing errors** in committed boilerplate (`src/components/ui/command.tsx`, `src/components/ui/textarea.tsx`, `tailwind.config.ts`) plus several `react-refresh` warnings. These exist on a clean checkout and are unrelated to environment setup.
