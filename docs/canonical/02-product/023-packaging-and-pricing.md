---
id: P-023
title: Packaging & Entitlements
version: 2.0.0
status: approved
owner: Commercial
reviewers: [Founder]
classification: internal
type: specification
last_updated: 2026-07-10
next_review: 2026-10-08
parent: P-020
related_docs: []
---
# P-023 — Packaging & Entitlements

| Field | Value |
|---|---|
| **ID** | P-023 |
| **Version** | 2.0.0 |
| **Status** | Approved (struktur) / Draft (angka final) |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [C-081 Pricing Catalog](../08-commercial/081-pricing-catalog.md), [B-010 Brand Architecture](../01-brand/010-brand-architecture.md) |

## Struktur paket kanonik (dari audit v1 §4)

| # | Paket | Isi | Catatan |
|---|---|---|---|
| 1 | **Starter** | Kasir, customer, laporan harian | Entry |
| 2 | **Growth** | Starter + booking, reminder, WhatsApp assistant, marketing assistant | Core |
| 3 | **Multi-Outlet** | Growth + outlet/role management, consolidated reporting, audit log, priority support | Top |
| — | **Implementation fee** | Setup, import data, training, WhatsApp activation | **Terpisah** dari subscription |

## Aturan entitlement (mengikat)

Setiap paket **wajib** memiliki limit eksplisit untuk:
- Jumlah outlet & staff.
- Jumlah pesan WA / bulan.
- Jumlah AI call / bulan.
- Retensi data.
- Channel & jam support.
- Kebijakan overage.

Hindari rentang harga terlalu lebar tanpa feature entitlement presisi
(temuan audit v1). Harga final di [C-081 Pricing Catalog](../08-commercial/081-pricing-catalog.md);
**sumber kebenaran harga = kode** (`src/data/solutions.ts` di repo produk).

## Prinsip pricing (dari B5-03, dipertahankan)

1. **Hibrida:** base (sekali bayar/implementation fee) + langganan + jasa.
2. **Value-metric deterministik:** hasil yang jelas & terukur (app live, transaksi
   tercatat, pesan terbalas) — bukan metrik probabilistik ("revenue naik").
3. **IDR & QRIS-first** via Duitku.
4. **Tangga harga:** Starter → Growth → Multi-Outlet → implementation fee → (nanti) jasa.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Konsolidasi packaging audit v1 §4 + prinsip monetisasi B5-03; katalog multi-vertikal B4-03 di-DEFER |
