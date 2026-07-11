---
id: ADR-005
title: Satu domain utama + canonical URL + redirect
version: 2.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: adr
last_updated: 2026-07-10
next_review: 2026-10-08
parent: ADR-INDEX
related_docs: []
---
# ADR-005 — Satu domain utama + canonical URL + redirect

| Field | Value |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-10 |
| **Owner** | Founder / Product + Engineering |
| **Evidence label** | VERIFIED (kedua domain menampilkan konten sama) |

## Context

Audit v1 (§6.4, risk **SEO-01 P2**) memverifikasi: `barberkas-aaas.pages.dev` dan
`barberkas-foundry.biz.id` menampilkan konten landing yang sama **tanpa canonical URL**.
Ini membagi SEO authority, membingungkan brand, dan sitemap 404.

## Decision

1. Tetapkan **satu domain utama** (kandidat: `barberkas-foundry.biz.id` sebagai
   custom domain; keputusan final oleh Founder — sampai diputuskan, status INFERRED).
2. Domain sekunder → 301 redirect ke domain utama.
3. Tambahkan `rel=canonical`, `sitemap.xml`, `robots.txt`, OpenGraph/Twitter card,
   JSON-LD (Product/SoftwareApplication).

## Consequences

- (+) SEO authority terkonsolidasi; brand jelas.
- (−) Perlu konfigurasi redirect + verifikasi ulang link materi lama.
- Kewajiban lanjutan: crawl check "search-console-ready" lulus (exit criteria SEO-01).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Diangkat dari audit v1 §6.4 + SEO-01 |
