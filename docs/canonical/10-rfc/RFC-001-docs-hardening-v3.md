---
id: RFC-001
title: Docs Hardening Program v2 → v3
version: 3.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: rfc
last_updated: 2026-07-10
next_review: 2026-10-08
parent: RFC-INDEX
related_docs: []
---
# RFC-001 — Docs Hardening Program v2 → v3

| Field | Value |
|---|---|
| **ID** | RFC-001 |
| **Status** | accepted |
| **Author** | Founder |
| **Created** | 2026-07-10 |
| **Decided** | 2026-07-10 |
| **Decision** | Accepted — dieksekusi sebagai Batch H1–H5 (**selesai 2026-07-10**) |
| **Type** | RFC |
| **References** | [RFC-INDEX](RFC-INDEX.md), [Q-990 Document Schema](../99-schema/990-document-schema.md), [SSOT-MANIFEST](../../MANIFEST.md) |

## 1. Summary

Menaikkan Canonical SSOT v2 (audit eksternal: **9.1/10**) menjadi v3 enterprise-grade
(target **9.8–10/10**) melalui **Hardening Program** — tanpa merombak struktur yang
sudah dinilai baik.

## 2. Motivation

Audit eksternal 2026-07-10 (INFERRED — review pihak ketiga atas ZIP repo) menilai
repo di atas rata-rata startup namun mengidentifikasi 8 gap enterprise:

1. Metadata belum seragam (belum machine-readable) — impact **sangat tinggi**.
2. Belum ada Docs Schema (`99-schema/`).
3. Belum ada Quality Gate otomatis (lint, broken link, orphan, metadata validation).
4. Belum ada Knowledge Graph (parent/child/dependency).
5. Belum ada Canonical MANIFEST.
6. Belum ada RFC layer (usulan sebelum keputusan).
7. Belum ada Docs Lifecycle formal + SOP transisi.
8. Belum ada Taxonomy tipe dokumen.

## 3. Proposal

Eksekusi bertahap, **setiap batch commit+push**:

| Batch | Isi | Menutup gap |
|---|---|---|
| H1 | `99-schema/` (990–995) + `MANIFEST.md` + index update | 1, 2, 4, 5, 7, 8 |
| H2 | `10-rfc/` (RFC layer) + `G-094` workflows governance | 6 |
| H3 | `tools/validate_docs.py` + CI GitHub Actions + retrofit front-matter YAML seluruh dokumen | 1, 3 |
| H4 | `G-095` enterprise matrices (capability, responsibility, risk, compliance) | pelengkap Phase 7 |
| H5 | Validasi penuh + CHANGELOG 3.0.0 + README v3 | penutup |

## 4. Alternatives considered

| Alternatif | Kelebihan | Kekurangan | Kenapa tidak dipilih |
|---|---|---|---|
| Rewrite total v3 | Bersih | Buang struktur 9.1/10, riwayat hilang, mahal | Auditor eksplisit tidak menyarankan |
| Status quo | Nol effort | Gap enterprise tetap; AI/CI tidak bisa validasi | Target enterprise tidak tercapai |
| Tooling eksternal (docusaurus dsb.) | Fitur banyak | Overhead; repo ini docs-only markdown | Premature; bisa via RFC nanti |

## 5. Impact & risks

- Terdampak: seluruh `canonical/**` (tambah front-matter), root (`MANIFEST.md`, README, CHANGELOG), CI baru.
- Risiko: front-matter salah format merusak render → mitigasi: validator di CI.
- Effort: **M** (5 batch).

## 6. Rollout plan

Sesuai tabel §3. Setelah H5: repo versi **3.0.0**, semua commit tervalidasi CI.

## 7. Discussion

| Tanggal | Role | Komentar | Resolusi |
|---|---|---|---|
| 2026-07-10 | Founder | Setuju full program, wajib commit+push per batch | Diadopsi |

## 8. Decision

**Accepted 2026-07-10.** Implementasi selesai penuh 2026-07-10:

| Batch | Commit | Isi |
|---|---|---|
| H1 | `07d0e39` | 99-schema (Q-990..995) + MANIFEST + index |
| H2 | `10207e5` | 10-rfc layer + G-094 workflows |
| H3 | `e6d9046` | tools/validate_docs.py + CI + retrofit front-matter 53 dokumen |
| H4 | `08c0fae` | G-095 capability map + G-096 RACI + G-097 risk/compliance + Q-994 expand |
| H5 | (commit ini) | Validasi penuh + CHANGELOG 3.0.0 + README v3 |

Struktur & aturan hasil program ini dikanonisasi di `99-schema/` dan `G-094`.
Quality gate akhir: **PASSED** — 56 dokumen terdaftar & tervalidasi.

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | RFC pertama — payung program hardening v3 |
| 3.0.0 | 2026-07-10 | Batch H5: seluruh program H1–H5 selesai — tabel commit implementasi ditambahkan |
