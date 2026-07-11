---
id: B-011
title: Positioning & Messaging
version: 2.0.0
status: approved
owner: Commercial
reviewers: [Founder]
classification: internal
type: guideline
last_updated: 2026-07-10
next_review: 2026-10-08
parent: B-010
related_docs: []
---
# B-011 — Positioning & Messaging

| Field | Value |
|---|---|
| **ID** | B-011 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [B-010 Brand Architecture](010-brand-architecture.md), [C-082 Evidence Ledger](../08-commercial/082-evidence-ledger.md) |

## Positioning kanonik (satu kalimat)

> **BarberKas membantu pemilik barbershop mencatat transaksi, mengatur booking, dan
> menindaklanjuti pelanggan lewat WhatsApp dalam satu aplikasi.**

## Pesan per audiens

| Audiens | Pesan | Bahasa yang dipakai |
|---|---|---|
| Owner barbershop 1–3 outlet | "Kasir, booking, dan WhatsApp pelanggan — satu aplikasi, omzet kelihatan tiap hari." | Sederhana, hasil |
| Owner multi-outlet | "Semua outlet dalam satu laporan, peran staff terkontrol." | Kontrol & konsolidasi |
| Investor/partner (internal) | Outcome Foundry, model hibrida OaaS — lihat [C-080 GTM](../08-commercial/080-gtm-strategy.md) | Internal only |

## Aturan messaging (dari audit v1 §6 + CLAIM-01)

1. **Tidak ada klaim tanpa bukti.** "LIVE", "dipakai", "<15 menit", "faktur otomatis"
   hanya boleh tampil jika punya entry aktif di Evidence Ledger. Jika bukti kedaluwarsa,
   copy otomatis turun ke "pilot/beta/tidak tersedia".
2. **Kontradiksi terlarang.** Contoh kasus nyata: landing mengklaim faktur otomatis
   terkirim ke WhatsApp, sedangkan README menyatakan outbound Fonnte terblokir paket
   free → wajib disinkronkan (status: lihat [P-022 Feature Matrix](../02-product/022-feature-matrix.md)).
3. **Klaim "PWA" dilarang** sampai manifest + service worker terverifikasi (WEB-02).
4. **Target komprehensi:** pengguna target memahami penawaran dalam <10 detik (exit
   criteria BRAND-01).
5. FAQ trust wajib ada di landing: kepemilikan data, cancel/export, keamanan, biaya
   WhatsApp/AI, support, refund.

## Voice & tone

- Bahasa Indonesia sehari-hari yang sopan; hindari jargon teknis.
- Jujur tentang status (beta/pilot) — kejujuran adalah bagian dari brand.
- Fokus manfaat: pelanggan kembali, booking tidak bentrok, omzet terlihat.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Kanonisasi positioning audit v1 §4 + aturan klaim dari CLAIM-01 & UX gaps §6 |
