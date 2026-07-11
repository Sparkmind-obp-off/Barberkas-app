---
id: P-022
title: Feature Matrix (Truth-Lock)
version: 2.0.0
status: approved
owner: Product
reviewers: [Founder]
classification: internal
type: register
last_updated: 2026-07-10
next_review: 2026-10-08
parent: P-020
related_docs: []
---
# P-022 — Feature Matrix (Truth-Lock)

| Field | Value |
|---|---|
| **ID** | P-022 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Engineering + Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [P-020 Product Brief](020-product-brief.md), [C-082 Evidence Ledger](../08-commercial/082-evidence-ledger.md) |

> Tabel ini adalah **satu-satunya** referensi status fitur. Marketing copy wajib
> diturunkan dari sini, bukan sebaliknya. Update setiap kali status berubah dengan bukti.

## Matrix (baseline audit 2026-07-10)

| Capability | Status | Catatan |
|---|---|---|
| Landing + solutions + case study | **VERIFIED** | Live; SEO/canonical/schema/sitemap belum lengkap (SEO-01) |
| Multi-tenant D1 | **VERIFIED (code)** | Tenant guard ada; perlu test isolation otomatis |
| Kasir/transaksi | **VERIFIED (code)** | Perlu audit accounting, void/refund, shift close, reconciliation |
| Booking | **VERIFIED (code)** | Perlu concurrency/load test, timezone/business-hours policy |
| Clerk authentication | **VERIFIED (production surface)** | RBAC masih sederhana (owner/staff/admin) |
| Duitku invoice callback | **VERIFIED (code)** | E2E uang nyata & amount reconciliation **belum** diverifikasi (PAY-01) |
| Fonnte inbound webhook | **VERIFIED (code)** | Integrasi webhook sudah dikerjakan (sesi Fonnte); round-trip WA nyata dari HP customer **belum terbukti** |
| Fonnte outbound (balasan WA nyata) | **NOT VERIFIED** | Laporan owner: pesan masuk hanya "read", tidak dibalas — perlu debugging (lihat AI-070 §known-issue) |
| AI Stylist/Marketing/Receptionist | **VERIFIED (code)** | Kualitas, safety, cost ceiling, eval suite belum ada |
| Simulator AI Resepsionis | **VERIFIED** | Simulasi saja — "pesan TIDAK dikirim ke WA nyata" |
| PWA | **NOT VERIFIED** | Manifest 404, tidak ditemukan service worker (WEB-02) |
| Recurring billing | **NOT IMPLEMENTED** | README: per-invoice |
| Invoice auto-send WA | **CONTRADICTED** | Landing klaim otomatis; README: outbound terblokir → copy wajib diperbaiki (CLAIM-01) |
| Onboarding <15 menit | **NOT VERIFIED** | Belum diuji tanpa engineer |
| Transaksi pertama tenant AlfaCut auditable | **NOT VERIFIED** | Perlu bukti independen |
| Duitku E2E uang nyata (refund/dispute/settlement) | **NOT VERIFIED** | |
| Backup/restore D1, RPO/RTO, load capacity | **NOT VERIFIED** | Lihat O-062 |
| Enterprise controls (SSO, SCIM, granular RBAC, DPA/SLA, audit export) | **NOT IMPLEMENTED** | Lihat G-092 |

## Prosedur update

1. Bukti baru (test, telemetry, screenshot, curl) → ubah status + link bukti.
2. Status turun (regresi) → wajib buka issue + update Evidence Ledger + koreksi copy publik.
3. Review matrix minimal setiap rilis.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Diangkat dari audit v1 §5 + evidence scope §2 + status integrasi Fonnte dari sesi terakhir |
