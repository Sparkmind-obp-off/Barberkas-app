---
id: ADR-003
title: Pembayaran via Duitku dengan pola MoR internal
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
# ADR-003 — Pembayaran via Duitku dengan pola MoR internal

| Field | Value |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-10 |
| **Owner** | Engineering + Founder |
| **Evidence label** | VERIFIED (code) — E2E uang nyata NOT VERIFIED |

## Context

- Pasar Indonesia-first membutuhkan QRIS/VA/e-wallet dan harga IDR (prinsip F-000).
- Legacy doctrine (AaaS bundle, FM-01 hard constraint #5) menetapkan MoR = Oasis BI Pro
  via Duitku Pop (merchant `D20919`).
- Audit v1 memverifikasi di kode: Duitku invoice + callback + signature verification +
  idempotency dasar. **Belum diverifikasi:** E2E uang nyata, refund, dispute, settlement,
  rekonsiliasi (PAY-01 P0: amount callback tidak dibandingkan dengan amount order).

## Decision

1. Semua pembayaran melalui Duitku (pola Merchant-of-Record internal).
2. "MoR" adalah **istilah internal** (F-001) — tidak dipakai di hadapan pembeli.
3. Callback payment **wajib** rekonsiliasi: merchant, amount, currency, reference,
   order state — sebelum menandai paid (menutup PAY-01).
4. Event pembayaran & webhook disimpan sebagai ledger append-only (aturan A-031 §3).

## Consequences

- (+) Kepatuhan pembayaran lokal tanpa membangun payment infra sendiri.
- (−) Ketergantungan satu provider; belum ada bukti E2E uang nyata → wajib dibuktikan
  sebelum production gate (G-091).
- Kewajiban lanjutan: automated tests payment create/callback/duplicate/mismatch/
  failure/refund (exit criteria PAY-01).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Kanonisasi dari AaaS bundle + FM-01 #5 + temuan PAY-01 audit v1 |
