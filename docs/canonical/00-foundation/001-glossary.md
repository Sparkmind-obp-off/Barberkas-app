---
id: F-001
title: Glossary (Terminologi Resmi Tunggal)
version: 2.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: standard
last_updated: 2026-07-10
next_review: 2027-01-06
parent: F-000
related_docs: []
---
# F-001 — Glossary (Terminologi Resmi Tunggal)

| Field | Value |
|---|---|
| **ID** | F-001 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [B-010 Brand Architecture](../01-brand/010-brand-architecture.md) |

> Glossary ini **mengakhiri konflik terminologi** yang ditemukan pada audit
> (BRAND-01): istilah "Foundry", "AaaS", "Sovereign", "Curator", "MoR" dipakai
> berganti-ganti di dokumen legacy. Mulai v2, definisi di bawah adalah satu-satunya
> yang sah.

## Istilah publik (boleh muncul di hadapan pembeli)

| Term | Definisi resmi | Visibilitas |
|---|---|---|
| **SparkMind** | Company/master brand (legal entity di footer/legal). | Publik (footer) |
| **BarberKas** | Product brand: aplikasi kasir, booking, dan otomasi WhatsApp untuk barbershop Indonesia. | Publik (utama) |
| **Kasir / Booking / Pelanggan / WhatsApp Assistant / Marketing Assistant / Insight** | Nama modul produk BarberKas. | Publik |
| **BarberKas Multi-Outlet** | Paket tertinggi untuk pemilik >1 outlet. | Publik |
| **Starter / Growth / Multi-Outlet** | Nama paket harga. | Publik |

## Istilah internal (DILARANG di UI/landing pembeli)

| Term | Definisi resmi | Sumber legacy |
|---|---|---|
| **Outcome Foundry** | Platform/kapabilitas internal untuk memproduksi outcome bisnis dari skill agentik. Bukan produk yang dijual terpisah. | B5-02 |
| **OaaS / AaaS / RaaS / SaS** | Kategori model bisnis internal (Outcome/Result-as-a-Service, hibrida software+jasa). | B5-01, B5-03 |
| **Sovereign (skill/agent)** | Sebutan internal untuk skill/agent agentik dalam ekosistem. | B4/B5 |
| **MoR (Merchant of Record)** | Model kepatuhan pembayaran via Duitku (Oasis BI Pro). Detail implementasi internal. | AaaS bundle |
| **Curator, D-1 Truth-Lock, F0–F7, DoO, OVERRIDE-CLOSE-OUT** | Istilah doctrine/pipeline internal. | B5-04, FM |
| **Session OS / FM layer** | Sistem boot/handoff/sprint/resume antar sesi kerja agentik. | FM-00..04 |
| **Truth-Lock** | Aturan bukti: klaim wajib berlabel VERIFIED / INFERRED / NOT VERIFIED. | Doctrine v8.0 |

## Istilah teknis

| Term | Definisi |
|---|---|
| **Canonical SSOT** | Repository ini — satu-satunya sumber kebenaran dokumentasi. |
| **ADR** | Architecture Decision Record — catatan resmi keputusan arsitektur. |
| **Tenant** | Satu barbershop/bisnis pelanggan di sistem multi-tenant. |
| **Activation** | Dalam 24 jam onboarding: tenant login, atur layanan/capster, catat transaksi pertama, terima booking pertama, lihat laporan harian — tanpa bantuan engineer. |
| **North-star metric** | Jumlah outlet aktif mingguan yang mencatat transaksi dan menjalankan ≥1 workflow booking/retention. |
| **Evidence Ledger** | Register klaim marketing → bukti → owner → masa berlaku. Lihat [C-082](../08-commercial/082-evidence-ledger.md). |
| **Production Gate / Enterprise Gate** | Checklist wajib sebelum launch publik / label enterprise. Lihat [G-091](../09-governance/091-production-gate.md), [G-092](../09-governance/092-enterprise-gate.md). |

## Aturan penggunaan

1. Dokumen baru **wajib** memakai istilah dari glossary ini.
2. Menambah istilah baru = PR + review owner + update glossary (bukan sekadar dipakai diam-diam).
3. Istilah internal yang muncul di UI/landing pembeli = pelanggaran BRAND-01 dan wajib diperbaiki.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Konsolidasi glossary dari draft Batch-1 (GPT), B5-02, FM-00, dan audit canonical v1 |
