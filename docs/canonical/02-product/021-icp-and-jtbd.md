---
id: P-021
title: ICP & Jobs-to-be-Done
version: 2.0.0
status: approved
owner: Product
reviewers: [Founder]
classification: internal
type: specification
last_updated: 2026-07-10
next_review: 2026-10-08
parent: P-020
related_docs: []
---
# P-021 — ICP & Jobs-to-be-Done

| Field | Value |
|---|---|
| **ID** | P-021 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [P-020 Product Brief](020-product-brief.md), [C-080 GTM](../08-commercial/080-gtm-strategy.md) |

## ICP (Ideal Customer Profile)

**Owner barbershop independen 1–3 outlet di Indonesia** yang masih mengelola
transaksi/booking/retensi secara manual atau terpencar di WhatsApp.

Karakteristik:
- Bahasa Indonesia, harga sensitif (IDR), pembayaran QRIS/VA.
- Tidak teknis; menilai produk dari "jalan atau tidak", bukan cara dibuatnya.
- Nilai tertinggi: pelanggan kembali, booking rapi, omzet terlihat.

## Jobs-to-be-Done

| Job | Modul |
|---|---|
| "Catat transaksi tiap kepala tanpa buku tulis" | Kasir |
| "Booking tidak bentrok antar capster" | Booking |
| "Pelanggan lama diingatkan supaya balik" | Pelanggan + WhatsApp Assistant |
| "Balas chat WhatsApp tanpa pegang HP terus" | WhatsApp Assistant |
| "Promo tersampaikan tanpa mikir konten" | Marketing Assistant |
| "Tahu omzet & layanan terlaris harian" | Insight |

## Activation (definisi mengikat)

Dalam **24 jam** setelah onboarding, tenant berhasil: login → atur layanan/capster →
catat transaksi pertama → terima booking pertama → lihat laporan harian —
**tanpa bantuan engineer**.

## North-star metric

**Jumlah outlet aktif mingguan** yang mencatat transaksi dan menjalankan minimal satu
workflow booking/retention.

### Guardrails

- Cross-tenant incident = 0.
- Payment mismatch = 0.
- WA failed rate terpantau (delivery diukur terpisah dari provider acceptance).
- COGS per tenant di bawah batas paket.
- Support burden terukur.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Diangkat dari canonical v1 roadmap §north-star + B4-02 target market (disempitkan ke barbershop) |
