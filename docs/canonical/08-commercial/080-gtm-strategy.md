---
id: C-080
title: GTM Strategy
version: 2.0.0
status: approved
owner: Commercial
reviewers: [Founder]
classification: internal
type: strategy
last_updated: 2026-07-10
next_review: 2026-10-08
parent: P-020
related_docs: []
---
# C-080 — GTM Strategy

| Field | Value |
|---|---|
| **ID** | C-080 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Commercial |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [P-021 ICP & JTBD](../02-product/021-icp-and-jtbd.md), [B-011 Positioning](../01-brand/011-positioning-and-messaging.md), [C-081 Pricing Catalog](081-pricing-catalog.md), [C-082 Evidence Ledger](082-evidence-ledger.md), [G-090 Roadmap](../09-governance/090-roadmap.md) |

## 1. Strategi inti (konsolidasi B4-04 + audit v1 §13)

**Outcome-led + proof-led + partner-led, Indonesia-first — dengan urutan wajib:
pilot dulu, scale kemudian.**

- **Outcome-led:** semua materi menjual *hasil* ("booking rapi, kasir tercatat, pelanggan
  balik lagi") — bukan fitur teknis, bukan jargon internal
  ([B-011](../01-brand/011-positioning-and-messaging.md) melarang Outcome Foundry/AaaS/
  Sovereign di pesan pembeli).
- **Proof-led:** klaim publik hanya yang punya bukti di
  [C-082 Evidence Ledger](082-evidence-ledger.md). Case study lokal > janji.
- **Partner-led (fase berikutnya):** agency/komunitas/asosiasi sebagai pengganda
  distribusi untuk operasi 1-operator — **diaktifkan setelah pilot terbukti**.

## 2. Keputusan mengikat: beachhead & sequencing (audit v1 §13)

1. **Beachhead:** barbershop UMKM Indonesia. Vertikal lain (Toko Online, MomentKas,
   Nurani.OS, dst. dari B4-03) berstatus **DEFERRED** sampai activation & retention
   BarberKas terbukti.
2. **Pilot 3–5 barbershop** adalah gerbang sebelum akuisisi berbayar apa pun.
   Exit criteria pilot: activation, weekly usage, pembayaran nyata via Duitku,
   WA delivery terverifikasi, retention bulan-2.
3. **Jangan scale acquisition** sebelum [G-091 Production Gate](../09-governance/091-production-gate.md)
   lolos. Enterprise positioning ditunda sampai [G-092](../09-governance/092-enterprise-gate.md).

## 3. Mengapa menang (vs lawan nyata — dari B4-04 §2)

| Lawan | Cara menang |
|---|---|
| Freelancer/agensi (lambat, mahal) | Hasil dalam hari + harga transparan + langganan support |
| SaaS asing (mahal, bahasa Inggris) | IDR, Bahasa Indonesia, QRIS/VA, fitur lokal |
| Marketplace (tanpa brand/data) | Toko & data milik pelanggan sendiri |
| Pencatatan manual/chat | Migrasi mudah + implementation fee memasukkan training |

**Unfair advantages:** delivery diakselerasi agent (1 operator ≈ tim), MoR + Duitku
sudah jalan (VERIFIED code — E2E uang nyata masih harus dibuktikan di pilot),
stack edge ber-COGS sangat rendah → ruang harga agresif.

## 4. Channel (prioritas akuisisi murah)

| Prioritas | Channel | Taktik | Status |
|---|---|---|---|
| 1 | Komunitas barbershop (grup WA/asosiasi) | Direct outreach untuk pilot | Aktif (pilot) |
| 2 | Konten "hasil nyata" | Before-after reel/video dari pilot (dengan izin) | Menunggu pilot |
| 3 | SEO lokal | "aplikasi kasir barbershop", per-kota | Backlog |
| 4 | Referral | Pelanggan merujuk → komisi/kredit | Backlog |
| 5 | Agency reseller / white-label | Rev-share 30–50% | DEFERRED (pasca-pilot) |
| 6 | KOL mikro UMKM | Endorse murah, testimoni lokal | DEFERRED |

> **Anti-pattern (mengikat):** tidak ada iklan berbayar sebelum unit economics pilot
> terbukti (credit-aware, B4-04 §3).

## 5. Funnel & metrik

```
Awareness  : komunitas + konten hasil + SEO lokal
  → Interest : landing BarberKas (outcome copy, tanpa jargon internal)
  → Lead     : waitlist / konsultasi WA (intake)
  → Land     : implementation fee (setup + training + WA activation)
  → Core     : subscription Starter/Growth/Multi-Outlet   ← MRR
  → Expand   : upgrade paket, outlet tambahan, add-on AI
  → Partner  : referral → (nanti) agency reseller
```

| Tahap | Metrik | Target awal |
|---|---|---|
| Landing → lead | Conversion | > 5% |
| Lead → setup berbayar | Conversion | > 10% |
| Setup → langganan aktif bulan-2 | Retensi | > 60% |
| Pilot aktif | Jumlah | 3–5 (D30–D60) |
| Partner aktif | Jumlah | ≥ 1 (D90, jika pilot lolos) |

## 6. Pesan & copy (aturan)

- **Headline pattern:** masalah + hasil + kecepatan + lokal.
  Contoh: "Booking barbershop masih di chat? Punya sistem sendiri, jadi dalam sehari."
- **Tes 10-detik:** pemilik barbershop harus paham hero dalam 10 detik.
- **Trust strip wajib:** QRIS/VA + disclosure merchant-of-record + kebijakan refund/privasi.
- **Larangan:** klaim tanpa bukti (lihat CLAIM-01 di [S-051](../05-security/051-risk-register.md));
  jargon internal di halaman pembeli; positioning "enterprise" sebelum G-092.

## 7. Aset GTM yang dibutuhkan (checklist)

- [ ] Landing BarberKas final (outcome copy + harga + CTA) — copy diaudit vs C-082.
- [ ] 3–5 case study pilot (foto/video before-after, **dengan consent tertulis** — S-052).
- [ ] Halaman intake/konsultasi + WA.
- [ ] OG image untuk share sosial.
- [ ] Kit partner (deck, harga, rev-share) — disiapkan setelah pilot lolos.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Konsolidasi B4-04 (GTM broad) + audit v1 §13 (pilot-first) + guardrail evidence-led; multi-vertikal DEFERRED |
