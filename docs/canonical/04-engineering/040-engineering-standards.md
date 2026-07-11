---
id: E-040
title: Engineering Standards
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: standard
last_updated: 2026-07-10
next_review: 2026-10-08
parent: A-030
related_docs: []
---
# E-040 — Engineering Standards

| Field | Value |
|---|---|
| **ID** | E-040 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Engineering |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [A-030 System Overview](../03-architecture/030-system-overview.md), [E-041 Testing & Quality Gates](041-testing-and-quality-gates.md), [ADR Register](../03-architecture/adr/ADR-INDEX.md) |

## 1. Prinsip engineering (mengikat)

1. **Edge-native, zero VPS** (ADR-002) — seluruh workload berjalan di Cloudflare
   Pages/Workers + D1; tidak ada server tradisional.
2. **Fail-closed di production** (ADR-001) — keamanan menang atas availability.
3. **Reuse, jangan duplikasi** — transport/integrasi baru menyambung ke logic yang sudah
   teruji (contoh: webhook Fonnte → FSM yang ada), bukan menulis versi kedua.
4. **Truth-Lock** — status fitur di dokumen/marketing mengikuti kode & telemetry, bukan
   sebaliknya (hierarki source-of-truth di [00-INDEX](../00-INDEX.md)).
5. **Credit-aware** — kerja bertahap, commit kecil dan sering, hemat resource free-tier.

## 2. Stack & konvensi kode

| Aspek | Standar |
|---|---|
| Bahasa | TypeScript (strict) di seluruh backend/SSR |
| Framework | Hono di Cloudflare Workers |
| Struktur | `src/routes/` (HTTP), `src/middleware/`, `src/services/` (logic), `src/data/` (konstanta kanonik, mis. pricing) |
| Static assets | `public/` (build-time; tidak ada fs runtime) |
| Konfigurasi | `wrangler.jsonc`; secret via `wrangler secret` / `.dev.vars` (tidak pernah di-commit) |
| Error contract | Format error ternormalisasi (lihat [E-042 API Standards](042-api-standards.md)) |
| Validasi input | Schema validator (typed) untuk body/query/params di semua route publik |

## 3. Git workflow

- Branch utama: `main`. Perubahan kecil boleh langsung ke `main` selama CI hijau;
  perubahan berisiko (auth, payment, migration) lewat PR + review.
- Commit message: imperative, jelas, menyebut scope (`auth: fail-closed guard for missing config`).
- **Dilarang commit**: secret/credential, dump PII, file build (`dist/`, `.wrangler/`).
- Migration DB bersifat **append-only** (expand-contract); rollback/repair path wajib
  didokumentasikan di PR description.

## 4. CI/CD (target wajib — saat ini BELUM ADA, temuan QA-01 P0)

Status: **NOT VERIFIED — belum ada GitHub Actions workflow** (audit v1 §2).

Required checks minimum sebelum merge/deploy:

1. `npm ci` — install reproducible.
2. Typecheck + build.
3. Unit + integration tests (lihat E-041).
4. Lint.
5. Dependency audit + secret scanning.

Deploy production hanya dari `main` yang hijau. Preview deployment untuk PR berisiko.

## 5. Dependency & supply chain

- `npm audit --omit=dev` harus bersih (saat audit v1: bersih — VERIFIED).
- Temuan dev-tooling (Wrangler/Miniflare/Undici/ws — 1 low, 4 high) wajib di-upgrade
  (risk SUPPLY-01 P2).
- Aktifkan Dependabot/Renovate setelah CI ada.

## 6. Definition of Done teknis (ringkas)

Lihat [G-093](../09-governance/093-definition-of-ready-done.md) untuk versi lengkap.
Minimum: code reviewed, CI hijau, test relevan lulus, migration backward-compatible,
logging/metrics tanpa bocor secret/PII, dokumen + evidence ledger ter-update.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Sintesis dari audit v1 §2/§7/§11, doctrine FM-01 (reuse, credit-aware), risk register QA-01/SUPPLY-01 |
