# barberkas-app

## Project Overview

- **Name**: barberkas-app
- **Current goal**: single-user cashier MVP for daily dogfooding at a barbershop.
- **Current phase**: Kasir MVP implemented locally; production migration and deployment are pending owner approval.
- **Scope**: one user, one device, no login, integer IDR amounts, Jakarta business date.
- **Paused work**: R1b Clerk authentication and multi-tenant SaaS architecture remain parked until after dogfood validation.

## Completed Features

- Mobile-first server-rendered cashier page at `/kasir`.
- Add one or more active services to a transaction.
- Optional capster name and transaction note.
- Server-side transaction total calculation.
- Service name and price snapshots on every sale item.
- Daily transaction history and revenue summary.
- Void transactions without deleting their records.
- Service management page at `/kasir/layanan`.
- Create, rename, reprice, and deactivate services.
- Normalized `ok()` / `fail()` API envelopes with request IDs.
- Local D1 migration verified from an empty database.

## URLs

- **Production base**: https://barberkas-app.pages.dev
- **Production health**: https://barberkas-app.pages.dev/health
- **Production cashier**: https://barberkas-app.pages.dev/kasir — not deployed yet
- **GitHub**: https://github.com/Sparkmind-obp-off/Barberkas-app

## Functional Routes

### Pages

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/kasir` | Record sales, view today's revenue, and void transactions |
| `GET` | `/kasir/layanan` | Add, edit, and deactivate cashier services |
| `GET` | `/health` | Report app environment and D1 reachability |

### API

All API responses use the standard success/error envelope and include `request_id`.

| Method | Path | Body / query |
|---|---|---|
| `GET` | `/api/v1/services` | Lists active services |
| `POST` | `/api/v1/services` | `{ "name": string, "price_idr": integer }` |
| `PATCH` | `/api/v1/services/:id` | Any of `name`, `price_idr`, `is_active` |
| `POST` | `/api/v1/sales` | `{ "items": [{ "service_id": string }], "capster_name"?: string, "note"?: string }` |
| `GET` | `/api/v1/sales?date=YYYY-MM-DD` | Lists sales for a Jakarta business date; defaults to today |
| `POST` | `/api/v1/sales/:id/void` | Marks a completed sale as void |
| `GET` | `/api/v1/reports/daily?date=YYYY-MM-DD` | Returns total, transaction count, and service breakdown |

## Data Architecture

- **Storage**: Cloudflare D1 database `barberkas-app-production`.
- **Migration 0001**: existing `tenants`, `tenant_members`, and append-only `audit_log`; untouched by the Kasir MVP.
- **Migration 0002**:
  - `services`: service name, integer IDR price, active state.
  - `sales`: optional capster/note, completed or void status, server-calculated total.
  - `sale_items`: immutable service name and price snapshots linked to a sale.
- **Data flow**: browser UI calls same-origin Hono APIs; Hono validates input and performs all D1 reads/writes. No runtime filesystem or in-memory persistence is used.

## User Guide

1. Open `/kasir/layanan` and add at least one service with its price.
2. Open `/kasir` and tap one or more service buttons.
3. Optionally enter the capster name and a note.
4. Confirm the displayed total and tap **Catat Transaksi**.
5. Review today's completed transactions and revenue below the form.
6. Use **Batalkan** to void an incorrect transaction; the record remains stored and is excluded from revenue.
7. Return to `/kasir/layanan` to update prices or deactivate services no longer offered.

## Local Development

```bash
npm ci
npm run db:migrate:local
npm run typecheck
npm run lint
npm run build
pm2 start ecosystem.config.cjs
curl http://localhost:3000/health
```

The sandbox preview listens on port `3000`. Build before starting or restarting Wrangler Pages dev.

## Not Yet Implemented

- Production application of migrations 0001 and 0002.
- Production deployment of the Kasir UI and APIs.
- Owner acceptance test from a real phone.
- Authentication, tenant isolation, booking, customer database, payment gateway, WhatsApp integration, subscription, AI staff, multi-outlet, and separate capster entities. These are explicitly outside this MVP.
- Full automated test suite and CI pipeline.

## Recommended Next Steps

1. Obtain owner approval to apply migrations 0001 and 0002 to production D1.
2. Choose the Cloudflare deployment path and deploy the verified build.
3. Smoke-test the production API and both Kasir pages.
4. Have the owner complete one real transaction flow from a phone.
5. Record dogfood feedback before expanding product scope.

## Deployment

- **Platform**: Cloudflare Pages / Workers with D1.
- **Stack**: Hono 4, strict TypeScript, Hono JSX, Vite, Wrangler.
- **Production status**: existing health endpoint active; Kasir MVP not deployed.
- **Local verification**: typecheck, lint, build, migrations, API lifecycle, static assets, and browser console checks passed.
- **Last updated**: 2026-07-22
