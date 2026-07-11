# barberkas-app

## Project Overview
- **Name**: barberkas-app (SparkMind — BarberKas v2 rebuild, full dari nol)
- **Goal**: SaaS kasir/manajemen barbershop multi-tenant. Rebuild sesuai canonical docs `Barberkas-foundry-doc` v3.0.0 (SSOT — working copy di `docs/`, lihat `docs/SOURCE.md`).
- **Batch status**: R1a ✅ selesai. R1b (auth Clerk + tenant isolation) in progress.

## URLs
- **Production**: https://barberkas-app.pages.dev
- **Health**: https://barberkas-app.pages.dev/health (public by design — env + D1 reachability)
- **GitHub**: https://github.com/Sparkmind-obp-off/Barberkas-app

## Data Architecture
- **Storage**: Cloudflare D1 `barberkas-app-production` (id `bf1cb0d4-9ae2-416f-943f-cdae2f4261fb`)
- **Tables (migration 0001)**: `tenants`, `tenant_members`, `audit_log` (append-only per ADR-006), FK+CHECK+index per A-031
- **API shape**: response envelope `ok/fail` per E-042 §2.2, `request_id` end-to-end, stable ErrorCode set

## Tech Stack
- Hono 4 + TypeScript (strict) + Cloudflare Pages/Workers + D1
- Build: Vite + `@hono/vite-build/cloudflare-pages` (pengganti `@hono/vite-cloudflare-pages` yang deprecated — plugin lama bikin 500 di semua unmatched route)

## Aturan Kerja (wajib, semua batch)
- **`git push origin main` setelah SETIAP commit.** Commit tanpa push = belum selesai.
- Secrets via `wrangler pages secret put` — TIDAK PERNAH di-commit ke repo.
- Auth fail-closed (ADR-001): config missing/invalid di production → 503/401, bukan buka akses.
- SSOT docs tetap `Barberkas-foundry-doc`; `docs/` di sini working copy, jangan diedit langsung.

## Deployment
- **Platform**: Cloudflare Pages (project `barberkas-app`)
- **Status**: ✅ Active — `GET /health` 200, `db: up`
- **Last Updated**: 2026-07-11
