---
id: ADR-001
title: Auth production wajib fail-closed
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
# ADR-001 — Auth production wajib fail-closed

| Field | Value |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-10 |
| **Owner** | Engineering |
| **Evidence label** | VERIFIED (temuan kode) / target perbaikan |

## Context

Audit v1 (§8.1, risk **SEC-01 P0**) menemukan: middleware auth (`src/middleware/auth.ts`)
**membuka route** bila konfigurasi Clerk hilang (fail-open). Di production, secret/config
drift bisa membuat seluruh route terlindungi menjadi terbuka tanpa disadari.

## Decision

1. Environment production ditandai eksplisit via `APP_ENV=production`.
2. Di production, konfigurasi auth hilang/invalid → **selalu fail-closed**: route
   terlindungi mengembalikan `503`/`401`, bukan membuka akses.
3. Perilaku fail-open hanya boleh di lingkungan dev lokal yang eksplisit.

## Consequences

- (+) Config drift tidak lagi menjadi jalur bypass auth.
- (−) Misconfiguration menyebabkan downtime route terlindungi — dapat diterima; downtime
  lebih aman daripada data exposure.
- Kewajiban lanjutan: automated test membuktikan missing/invalid config → 503/401 untuk
  **setiap** route terlindungi (exit criteria SEC-01, lihat [S-051](../../05-security/051-risk-register.md)).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Diangkat dari audit v1 §8.1 + SEC-01 |
