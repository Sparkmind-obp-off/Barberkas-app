---
id: C-082
title: Evidence Ledger
version: 2.0.0
status: approved
owner: Commercial
reviewers: [Founder]
classification: internal
type: register
last_updated: 2026-07-10
next_review: 2026-10-08
parent: C-080
related_docs: []
---
# C-082 — Evidence Ledger

| Field | Value |
|---|---|
| **ID** | C-082 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder (claim approver) |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [F-002 Governance](../00-foundation/002-governance.md), [P-022 Feature Matrix](../02-product/022-feature-matrix.md), [S-051 Risk Register](../05-security/051-risk-register.md) (CLAIM-01) |

## 1. Tujuan

Register tunggal yang memetakan **setiap klaim publik** (landing, README, deck, chat
penjualan) → **bukti** → **owner** → **masa berlaku**. Menjawab temuan audit v1 §12
(CLAIM-01 P0: landing mengklaim faktur auto-WA padahal outbound WA terblokir).

**Aturan inti:** klaim tanpa baris di ledger ini = **tidak boleh tayang**.

## 2. Skema ledger (mengikat)

| Kolom | Isi |
|---|---|
| Claim ID | `CLM-###` |
| Klaim (teks persis) | Kalimat yang tayang publik |
| Lokasi | URL/halaman/aset tempat klaim muncul |
| Bukti | Link telemetry / test / recording / dokumen (mengikuti source-of-truth hierarchy [00-INDEX](../00-INDEX.md)) |
| Label | VERIFIED / INFERRED / NOT VERIFIED |
| Owner | Penanggung jawab bukti |
| Berlaku sampai | Tanggal review ulang (maks 90 hari) |
| Status | Live / Corrected / Removed |

## 3. Ledger aktif (baseline 2026-07-10)

| Claim ID | Klaim | Lokasi | Bukti | Label | Owner | Review | Status |
|---|---|---|---|---|---|---|---|
| CLM-001 | "Faktur otomatis terkirim via WhatsApp" | Landing | **KONTRADIKSI** — README menyatakan outbound WA terblokir paket Fonnte | NOT VERIFIED | Founder | Segera | **Wajib Corrected/Removed** (CLAIM-01 P0) |
| CLM-002 | Kasir & transaksi berfungsi | Landing | Source code (VERIFIED code); belum ada E2E test formal | INFERRED | Engineering | 90 hari | Live — copy tidak boleh melebihi "tercatat & terlihat" |
| CLM-003 | Booking online berfungsi | Landing | Source code (VERIFIED code); concurrency belum diuji | INFERRED | Engineering | 90 hari | Live — hindari klaim "anti bentrok" sebelum load test |
| CLM-004 | Pembayaran QRIS/VA via Duitku | Landing | Callback code VERIFIED; E2E uang nyata belum dibuktikan | INFERRED | Founder | Pilot | Live — tanpa kata "terjamin" sebelum reconciliation jalan |
| CLM-005 | Testimoni / case study | Landing | Belum ada consent tertulis terdokumentasi | NOT VERIFIED | Founder | Segera | **Hold** sampai consent (S-052) |

> Baris baru ditambahkan lewat PR setiap kali copy publik berubah. Ledger ini adalah
> dokumen hidup; baseline di atas berasal dari audit v1 §5 & §12.

## 4. Proses klaim baru

1. Penulis copy mengusulkan klaim + bukti → PR ke dokumen ini.
2. Owner memberi label (VERIFIED / INFERRED / NOT VERIFIED) sesuai aturan bukti.
3. **NOT VERIFIED → tidak tayang.** INFERRED → boleh tayang dengan bahasa hati-hati
   (tanpa superlatif/garansi). VERIFIED → bebas dalam batas faktual.
4. Setiap klaim di-review ulang maksimal 90 hari; bukti kedaluwarsa → klaim turun label.

## 5. Larangan permanen (dari F-002 + B-011)

- Klaim "enterprise-grade / bank-grade security" sebelum [G-092](../09-governance/092-enterprise-gate.md).
- Angka hasil pelanggan ("omzet naik X%") tanpa data pelanggan nyata + consent.
- Jargon internal (Outcome Foundry, AaaS, Sovereign, Truth-Lock) di aset pembeli.
- "Unlimited" untuk kuota apa pun ([C-081 §3](081-pricing-catalog.md)).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Dokumen baru: skema ledger + baseline 5 klaim dari audit v1 §5/§12; proses & larangan permanen |
