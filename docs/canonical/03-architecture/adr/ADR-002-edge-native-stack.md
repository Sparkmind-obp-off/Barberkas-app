---
id: ADR-002
title: Stack edge-native Cloudflare (zero VPS)
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: adr
last_updated: 2026-07-10
next_review: 2026-10-08
parent: ADR-INDEX
related_docs: []
---
# ADR-002 — Stack edge-native Cloudflare (zero VPS)

| Field | Value |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-10 |
| **Owner** | Engineering |
| **Evidence label** | VERIFIED (build & production surface) |

## Context

Doctrine yang telah terbukti dipakai (FM-01 hard constraint #1) menetapkan: 100%
genspark.ai/ai_developer + Cloudflare Workers/Pages; zero local dev, zero VPS,
zero AWS/GCP/Azure. Audit v1 memverifikasi stack nyata: Hono + TypeScript
(~5.200 LOC, bundle ~165 kB), Cloudflare Pages/Workers, D1 multi-tenant; `npm ci`
dan `npm run build` berhasil; `GET /health` 200 di production.

## Decision

1. Seluruh compute/hosting di Cloudflare Pages/Workers (edge-native).
2. Database utama: Cloudflare D1 (SQLite) multi-tenant.
3. Tidak menambah runtime/server di luar Cloudflare tanpa ADR baru.

## Rationale

- COGS infra mendekati nol (credit-aware, prinsip F-000) → memungkinkan harga agresif.
- Operasional 1-operator: tanpa patching VPS, tanpa manajemen server.
- Latensi edge untuk pasar Indonesia.

## Consequences

- (+) Biaya hampir nol, deploy cepat, skala otomatis.
- (−) Keterbatasan D1 (kapasitas, query plan, backup/restore **belum dibuktikan** —
  lihat [O-062](../../06-operations/062-backup-and-dr.md)); CPU limit Workers;
  tidak ada long-running process.
- Kewajiban lanjutan: buktikan backup/restore D1 + kapasitas sebelum scale
  (production gate G-091).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Kanonisasi hard constraint FM-01 #1 + verifikasi stack audit v1 §2 |
