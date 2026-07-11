---
id: B-010
title: Brand Architecture
version: 2.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: strategy
last_updated: 2026-07-10
next_review: 2026-10-08
parent: F-000
related_docs: []
---
# B-010 — Brand Architecture

| Field | Value |
|---|---|
| **ID** | B-010 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [F-001 Glossary](../00-foundation/001-glossary.md), [B-011 Positioning](011-positioning-and-messaging.md) |

## Masalah yang diselesaikan dokumen ini

Audit v1 (BRAND-01, skor brand architecture **1.5/5**) menemukan: BarberKas, AaaS,
Foundry, SparkMind, Sovereign, Curator, Oasis/MoR **bersaing dalam satu layar** di
hadapan pembeli barbershop. Pembeli butuh bahasa sederhana: *kasir, booking, WhatsApp,
pelanggan kembali, omzet terlihat*.

## Hierarki brand kanonik

```
SparkMind  (company/master brand — cukup di footer & legal)
   └── BarberKas  (product brand — satu-satunya wajah komersial)
         ├── Modul: Kasir
         ├── Modul: Booking
         ├── Modul: Pelanggan
         ├── Modul: WhatsApp Assistant
         ├── Modul: Marketing Assistant
         └── Modul: Insight
```

| Level | Nama | Peran | Visibilitas |
|---|---|---|---|
| Company | **SparkMind** | Legal entity, footer, kontrak | Publik minimal |
| Product | **BarberKas** | Brand utama semua pemasaran | Publik penuh |
| Category | Aplikasi kasir, booking, dan otomasi WhatsApp untuk barbershop | Kategori pasar | Publik |
| Enterprise offer | **BarberKas Multi-Outlet** | Paket >1 outlet (bukan "AI Company in a Box") | Publik |
| Internal platform | **Outcome Foundry** | Mesin produksi internal — tidak dijual terpisah | Internal only |

## Aturan keras

1. Istilah internal (Outcome Foundry, AaaS, OaaS, Sovereign, Curator, D-1 Truth-Lock,
   MoR, F0–F7, DoO) **dilarang** muncul di landing, app UI pembeli, atau materi sales.
2. Sub-brand vertikal lain dari legacy (Toko Online+CS, PaceLokal, MomentKas, Nurani.OS,
   KuratorKas — lihat B4-03) berstatus **DEFERRED**: tidak dipasarkan sampai BarberKas
   membuktikan activation & retention. Jangan tampilkan di ekosistem BarberKas.
3. Satu domain utama. Duplikasi konten `barberkas-aaas.pages.dev` dan
   `barberkas-foundry.biz.id` wajib diselesaikan dengan canonical URL + redirect
   (lihat [ADR-005](../03-architecture/adr/ADR-005-primary-domain.md)).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Kanonisasi arsitektur brand dari audit v1 §4 + supersede cross-brand map AaaS bundle |
