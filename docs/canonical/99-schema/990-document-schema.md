---
id: Q-990
title: Document Schema
version: 3.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: standard
last_updated: 2026-07-10
next_review: 2026-10-08
parent: F-003
related_docs: []
---
# Q-990 — Document Schema

| Field | Value |
|---|---|
| **ID** | Q-990 |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Standard |
| **References** | [Q-991 Metadata Schema](991-metadata-schema.md), [Q-992 Taxonomy](992-taxonomy.md), [Q-993 Lifecycle](993-lifecycle.md), [F-003 Documentation Policy](../00-foundation/003-documentation-policy.md) |

> Dokumen ini mendefinisikan **struktur wajib** setiap dokumen canonical.
> Semua dokumen baru wajib mengikuti skema ini; dokumen lama di-retrofit
> bertahap (lihat [Q-993 Lifecycle](993-lifecycle.md)).

## 1. Anatomi dokumen canonical

Setiap dokumen `canonical/**/*.md` wajib memiliki, berurutan:

```
1. YAML front-matter        (machine-readable — dibaca validator/CI/AI agent)
2. # <ID> — <Title>         (H1 tunggal, sama dengan front-matter)
3. Tabel metadata           (human-readable — mirror dari front-matter)
4. Blockquote ringkasan     (opsional tapi direkomendasikan: 1–3 kalimat "dokumen ini untuk apa")
5. Body                     (H2 bernomor bila prosedural)
6. ## Version history       (tabel: Version | Date | Change)
```

## 2. Aturan struktur

| # | Aturan | Enforcement |
|---|---|---|
| 1 | Tepat **satu H1** per dokumen, format `# <ID> — <Title>` | Validator (error) |
| 2 | Front-matter YAML valid & lengkap sesuai [Q-991](991-metadata-schema.md) | Validator (error) |
| 3 | Heading tidak melompat level (H2 → H4 dilarang) | Validator (warning) |
| 4 | Tidak ada heading duplikat pada level yang sama | Validator (warning) |
| 5 | Semua link relatif harus resolve (no broken links) | Validator (error) |
| 6 | Setiap dokumen tercantum di [MANIFEST](../../MANIFEST.md) & terhubung di [Knowledge Graph](994-knowledge-graph.md) | Validator (error — orphan detection) |
| 7 | Klaim status fitur/produk wajib berlabel `VERIFIED` / `INFERRED` / `NOT VERIFIED` | Review manual |
| 8 | Version history wajib ada minimal 1 baris | Validator (warning) |

## 3. Bahasa & gaya

1. Bahasa Indonesia untuk narasi; istilah teknis boleh Inggris; konsisten per dokumen.
2. Satu konsep = satu dokumen sumber; dokumen lain **menautkan**, tidak menyalin.
3. Tabel lebih diutamakan daripada prosa panjang untuk data terstruktur.
4. Tautan internal wajib relatif (bukan URL GitHub absolut) agar portable.

## 4. Penamaan file

```
<nomor 3 digit>-<slug-kebab-case>.md      → 991-metadata-schema.md
ADR-<nomor 3 digit>-<slug>.md             → ADR-001-fail-closed-auth.md
RFC-<nomor 3 digit>-<slug>.md             → RFC-001-example.md
```

Detail penomoran: [Q-995 Numbering](995-numbering.md).

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 1: skema struktur dokumen kanonik |
