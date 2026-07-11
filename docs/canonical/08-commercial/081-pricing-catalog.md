---
id: C-081
title: Pricing Catalog
version: 2.0.0
status: approved
owner: Commercial
reviewers: [Founder]
classification: internal
type: specification
last_updated: 2026-07-10
next_review: 2026-10-08
parent: C-080
related_docs: []
---
# C-081 — Pricing Catalog

| Field | Value |
|---|---|
| **ID** | C-081 |
| **Version** | 2.0.0 |
| **Status** | Approved (struktur) / Draft (angka final) |
| **Owner** | Founder / Commercial |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [P-023 Packaging & Entitlements](../02-product/023-packaging-and-pricing.md), [C-080 GTM](080-gtm-strategy.md), [ADR-003 Duitku MoR](../03-architecture/adr/ADR-003-duitku-mor-payment.md) |

## 1. Aturan sumber kebenaran (mengikat)

1. **Harga yang tampil ke publik = harga di kode** (`src/data/solutions.ts` di repo
   produk). Dokumen ini adalah **cermin** kode, bukan sebaliknya.
2. Jika dokumen ini dan kode berbeda → **kode menang**, dokumen ini wajib diperbarui
   dalam PR yang sama dengan perubahan harga.
3. Perubahan harga = perubahan berisiko: wajib PR + update dokumen ini + cek
   entitlement ([P-023](../02-product/023-packaging-and-pricing.md)).

## 2. Katalog kanonik BarberKas (struktur audit v1 §4)

> Status angka: **Draft** — angka final di-lock saat pilot pricing test selesai.
> Angka di bawah adalah baseline dari legacy (B4-03 / Monetization Matrix), dinormalisasi
> ke struktur 3-paket audit v1.

| Paket | Baseline harga (IDR) | Isi | Catatan |
|---|---|---|---|
| **Starter** | 49.000/bln | Kasir, customer, laporan harian | Entry |
| **Growth** | 149.000/bln | Starter + booking, reminder, WhatsApp assistant, marketing assistant | Core / MRR driver |
| **Multi-Outlet** | 499.000/bln | Growth + outlet/role management, consolidated reporting, audit log, priority support | Top; **bukan** "enterprise" sebelum [G-092](../09-governance/092-enterprise-gate.md) |
| **Implementation fee** | 199.000–1.500.000 (one-time) | Setup, import data, training, WhatsApp activation | **Terpisah** dari subscription; range tergantung scope |

## 3. Entitlement matrix (wajib presisi — audit v1 §4)

| Limit | Starter | Growth | Multi-Outlet |
|---|---|---|---|
| Outlet | 1 | 1 | ≥ 2 (per kontrak) |
| Staff | ≤ 3 | ≤ 10 | Custom |
| Pesan WA / bulan | — (tanpa WA) | Kuota eksplisit* | Kuota eksplisit* |
| AI call / bulan | — | Kuota eksplisit* | Kuota eksplisit* |
| Retensi data | 12 bulan | 24 bulan | Custom |
| Support | Email/WA jam kerja | Prioritas jam kerja | Priority + eskalasi |
| Overage | N/A | Degradasi jelas + opsi top-up | Idem |

\* Angka kuota final ditetapkan dari data biaya Fonnte & LLM saat pilot
(guardrail COGS — [AI-070 §4](../07-ai/070-ai-agents-policy.md)). **Dilarang** menjual
paket dengan kuota "unlimited".

## 4. SKU legacy yang di-DEFER (dari B4-03 / Monetization Matrix)

| SKU legacy | Status | Alasan |
|---|---|---|
| Template DIY (490k one-time) | DEFERRED | Fokus beachhead subscription |
| AI Staff tambahan (490k/bln/staff) | DEFERRED | Menunggu bukti retensi core |
| App Custom / AI Company in a Box (5–15 jt) | DEFERRED | High-ticket menunggu kapasitas delivery |
| Canon Course / edukasi | DEFERRED | Bukan prioritas 90 hari |
| Founder Pass / katalog skill developer | DEFERRED | Jalur developer bukan beachhead |
| Multi-vertikal (Toko Online, MomentKas, dll.) | DEFERRED | Lihat [C-080 §2](080-gtm-strategy.md) |

Legacy pricing lengkap tetap terdokumentasi di
`archive/barberkas-aaas-bundle/03-...MONETIZATION-MATRIX-v1.0.md` dan
`archive/ssot/B4-03-PRODUCTIZED-OFFERS-DOC.md` (read-only).

## 5. Prinsip unit economics (mengikat)

1. Setiap paket harus punya **contribution margin positif** setelah COGS variabel
   (Fonnte + LLM + payment fee Duitku).
2. Payment fee Duitku dan biaya WA per pesan masuk model harga sebelum angka di-lock.
3. Diskon > 20% atau custom deal wajib approval Founder + catatan di dokumen ini.
4. Refund policy publik wajib ada sebelum penjualan berbayar
   ([S-052](../05-security/052-privacy-and-data-protection.md), production gate).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Katalog kanonik 3-paket + implementation fee; entitlement matrix eksplisit; SKU legacy B4-03/AaaS di-DEFER dengan jejak |
