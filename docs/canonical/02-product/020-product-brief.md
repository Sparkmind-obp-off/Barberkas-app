---
id: P-020
title: Product Brief
version: 2.0.0
status: approved
owner: Product
reviewers: [Founder]
classification: internal
type: specification
last_updated: 2026-07-10
next_review: 2026-10-08
parent: B-010
related_docs: []
---
# P-020 — Product Brief

| Field | Value |
|---|---|
| **ID** | P-020 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [P-021 ICP](021-icp-and-jtbd.md), [P-022 Feature Matrix](022-feature-matrix.md), [A-030 System Overview](../03-architecture/030-system-overview.md) |

## Apa itu BarberKas

Aplikasi multi-tenant untuk barbershop Indonesia: **kasir (pencatatan transaksi),
booking, manajemen pelanggan, dan otomasi WhatsApp** — berjalan edge-native di
Cloudflare (Pages/Workers + D1), auth via Clerk, pembayaran via Duitku, WhatsApp via
Fonnte, plus asisten AI (LLM).

## Masalah yang dipecahkan

Owner barbershop independen mengelola transaksi, booking, dan follow-up pelanggan
secara manual atau terpencar di WhatsApp pribadi — akibatnya: booking bentrok,
pelanggan tidak kembali, omzet tidak terlihat.

## Status jujur saat baseline v2 (Truth-Lock)

| Pernyataan | Status |
|---|---|
| Source code adalah aplikasi multi-tenant nyata (bukan mock) — Hono, CF Pages/Workers, D1, Clerk, Duitku, Fonnte, LLM | VERIFIED |
| Build produksi hijau; `/health` 200; Clerk production aktif; dashboard anonim → 401 | VERIFIED |
| ~112 file non-git, ~5.200 LOC TypeScript, bundle Worker ~165 kB | VERIFIED |
| Layak **pilot berbayar terkontrol** 3–10 barbershop (onboarding manual, SLA terbatas, disclosure jelas) | Keputusan audit v1 |
| Layak self-serve SaaS massal | **BELUM** — lihat [G-091 Production Gate](../09-governance/091-production-gate.md) |
| Enterprise-grade | **BELUM** — lihat [G-092 Enterprise Gate](../09-governance/092-enterprise-gate.md) |
| Skor readiness keseluruhan | **1.9/5 (pilot-grade)** — detail per domain di [AUDIT-REPORT-V2](../../migration/AUDIT-REPORT-V2.md) |

## Non-goals (keputusan DEFER yang mengikat)

- Ekspansi vertikal salon/klinik/laundry/cafe.
- Enam agent AI tambahan.
- Cross-shop benchmarking.
- "AI Company in a Box" & penjualan Outcome Foundry sebagai produk terpisah.

Semua dibuka kembali **hanya** setelah activation & retention BarberKas inti terbukti
(lihat [F-004 Decision Framework](../00-foundation/004-decision-framework.md)).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Sintesis executive verdict audit v1 + evidence scope |
