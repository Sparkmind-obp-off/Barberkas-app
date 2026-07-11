---
id: AI-071
title: Session OS (Boot / Handoff / Sprint / Resume)
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: standard
last_updated: 2026-07-10
next_review: 2026-10-08
parent: AI-070
related_docs: []
---
# AI-071 — Session OS (Boot / Handoff / Sprint / Resume)

| Field | Value |
|---|---|
| **ID** | AI-071 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | Legacy FM-01..FM-04 (archive/ssot/foundry-master/), [F-000 Charter](../00-foundation/000-charter.md), [AI-072 Skill Authoring](072-skill-authoring-standard.md) |

> Dokumen ini adalah penerus resmi **layer Foundry-Master (FM)**: sistem operasi kerja
> antar-sesi agentik. Template lengkap tetap di `archive/ssot/foundry-master/` dan
> **masih valid dipakai**; dokumen ini merangkum aturan yang mengikat.

## 1. Masalah yang dipecahkan

Kerja dengan agent AI bersifat sesi-per-sesi; konteks hilang saat sesi berakhir.
Session OS menjamin: **akhir sesi → handoff tertulis; awal sesi → resume dari handoff**,
sehingga tidak ada keputusan/status yang hidup hanya di ingatan.

## 2. Siklus sesi (mengikat)

```
BOOT ──► SPRINT (scope + anggaran kredit + OMTM + exit-gate) ──► CLOSE-OUT (handoff)
  ▲                                                                    │
  └──────────────── resume dari handoff terbaru ◄──────────────────────┘
```

### 2.1 Boot / Resume
- Baca handoff terbaru (`archive/ssot/foundry-master/handoffs/LATEST.md` era legacy;
  handoff baru ikut konvensi §3).
- Verifikasi posisi nyata: `git log`, build status, route health — **Truth-Lock: status
  diverifikasi, bukan diingat**. Script `resume_boot.py` (FM-04) tersedia di archive.

### 2.2 Sprint credit-aware (dari FM-03)
Setiap sprint sesi wajib menyatakan:
1. **Scope** — apa yang dirakit (locked; scope creep = keputusan baru).
2. **Anggaran kredit** — estimasi rendah/sedang/tinggi sebelum eksekusi.
3. **OMTM** — satu metrik terpenting sesi itu.
4. **Exit-gate** — definisi selesai yang bisa diverifikasi.

Prinsip: batch edits, verify sekali benar, stop-loss bila anggaran terlampaui
(STOP → handoff → keputusan owner), reuse engine yang ada.

### 2.3 Close-out / Handoff (dari FM-02)
Setiap sesi yang menyentuh kode/doc **wajib** diakhiri satu file handoff berisi:
misi sesi, apa yang SELESAI (dengan bukti: commit/file/route), apa yang BELUM,
blocker & gate HITL, status verifikasi build/test/deploy, anggaran kredit terpakai,
dan NEXT STEP eksplisit. Maksimal ~1 layar; detail → tunjuk commit.

## 3. Konvensi penamaan

- Session-ID: `BKF-YYYYMMDD-NN`.
- Handoff: `HANDOFF-BKF-YYYYMMDD-NN.md`; yang terbaru = aktif.
- Sprint log: `SPRINT-KAS-BKF-YYYYMMDD-NN.md` bila sprint formal dibuka.
- Lokasi baru (pasca-v2): direktori kerja repo produk atau `archive/ssot/foundry-master/`
  sampai diputuskan lain — jangan membuat lokasi ketiga.

## 4. Gate HITL (human-in-the-loop)

Agent **berhenti dan minta keputusan owner** untuk: secrets/credentials, perubahan schema
D1 production, pembayaran/payment config, legal/pricing publik, dan domain/brand.
(Diadopsi dari doctrine FM; selaras F-002 Governance.)

## 5. Hubungan dengan dokumen lain

- Prinsip Truth-Lock & credit-aware berasal dari charter ([F-000](../00-foundation/000-charter.md)).
- Hard constraints legacy (edge-only, niche-first, dst.) yang masih berlaku sudah
  diserap ke ADR-002 dan dokumen brand/product; FM archive tidak lagi menjadi sumber
  kebenaran bila bertentangan dengan v2 (aturan preseden F-000).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Sintesis FM-01..FM-04 menjadi satu kebijakan Session OS; template detail tetap di archive |
