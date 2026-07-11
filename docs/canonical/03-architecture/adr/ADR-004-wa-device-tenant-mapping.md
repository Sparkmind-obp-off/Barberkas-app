---
id: ADR-004
title: Pemetaan tenant WA dari device penerima, bukan payload pengirim
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
# ADR-004 — Pemetaan tenant WA dari device penerima, bukan payload pengirim

| Field | Value |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-10 |
| **Owner** | Engineering |
| **Evidence label** | VERIFIED (desain sesi integrasi Fonnte) — round-trip WA nyata NOT VERIFIED |

## Context

Integrasi Fonnte membuka **surface publik baru**: webhook `/webhooks/fonnte` menerima
request dari luar tanpa Clerk auth. Jika tenant ditentukan dari data yang dikirim
pengirim pesan, penyerang dapat memalsukan payload dan berpura-pura menjadi
customer/tenant lain (pelajaran dari bug isolasi tenant sebelumnya).

## Decision

1. Pemetaan pesan masuk → tenant hanya melalui tabel resmi **`tenant_wa_devices`**
   (device/nomor WA Fonnte → `tenant_id`; **satu nomor WA = satu tenant**, tidak ambigu).
2. Device tidak dikenal → log & tolak; **tidak boleh** fallback diam-diam ke tenant manapun.
3. Webhook wajib diverifikasi keasliannya (token/signature Fonnte); request tak
   terverifikasi tidak diproses.
4. Idempotency: pesan dengan ID sama tidak diproses dua kali (Fonnte dapat retry —
   mencegah booking dobel).
5. **Reuse, bukan duplikasi:** webhook memanggil function FSM yang sama dengan yang
   dipakai simulator AI Resepsionis — dilarang menulis versi kedua logic booking.
6. Token Fonnte disimpan sebagai Cloudflare secret (`wrangler secret put` / `.dev.vars`
   ter-gitignore) — tidak pernah di repo/dokumen.

## Consequences

- (+) Isolasi tenant di jalur WA aman by-design; anti-spoofing.
- (−) Menambah tenant WA baru butuh entry mapping (dapat diterima; eksplisit lebih aman).
- Kewajiban lanjutan: bukti round-trip WA nyata dari HP customer (status P-022:
  outbound **NOT VERIFIED** — laporan owner: pesan masuk hanya "read", belum dibalas).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Kanonisasi desain sesi integrasi Fonnte (tenant_wa_devices + aturan keamanan webhook) |
