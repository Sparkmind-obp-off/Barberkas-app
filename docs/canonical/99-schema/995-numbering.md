---
id: Q-995
title: Numbering & ID Convention
version: 3.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: standard
last_updated: 2026-07-10
next_review: 2026-10-08
parent: Q-990
related_docs: []
---
# Q-995 — Numbering & ID Convention

| Field | Value |
|---|---|
| **ID** | Q-995 |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Standard |
| **References** | [Q-990 Document Schema](990-document-schema.md), [Q-991 Metadata Schema](991-metadata-schema.md) |

> Aturan tunggal penomoran folder, file, dan ID dokumen. ID bersifat **permanen** —
> tidak pernah dipakai ulang meski dokumen di-archive.

## 1. Skema layer & prefix

| Layer folder | Prefix ID | Rentang nomor file | Contoh |
|---|---|---|---|
| `00-foundation/` | `F-` | 000–009 | F-000 Charter |
| `01-brand/` | `B-` | 010–019 | B-010 Brand Architecture |
| `02-product/` | `P-` | 020–029 | P-022 Feature Matrix |
| `03-architecture/` | `A-` | 030–039 | A-031 Data Architecture |
| `03-architecture/adr/` | `ADR-` | 001+ (sekuensial) | ADR-003 Duitku MoR |
| `04-engineering/` | `E-` | 040–049 | E-042 API Standards |
| `05-security/` | `S-` | 050–059 | S-051 Risk Register |
| `06-operations/` | `O-` | 060–069 | O-062 Backup & DR |
| `07-ai/` | `AI-` | 070–079 | AI-071 Session OS |
| `08-commercial/` | `C-` | 080–089 | C-082 Evidence Ledger |
| `09-governance/` | `G-` | 090–099 | G-091 Production Gate |
| `10-rfc/` | `RFC-` | 001+ (sekuensial) | RFC-001 |
| `99-schema/` | `Q-` | 990–999 | Q-991 Metadata Schema |

## 2. Aturan

1. **Nama file** = `<nomor>-<slug-kebab-case>.md`; nomor = 3 digit sesuai rentang layer.
2. **ID** = `<prefix><nomor>` dan wajib sama dengan front-matter `id` dan H1.
3. ID **tidak pernah di-reuse**. Dokumen archived tetap memegang ID-nya selamanya.
4. ADR & RFC memakai nomor **sekuensial global** (bukan rentang), tidak pernah reset.
5. Nomor habis dalam satu layer → gunakan sub-folder + nomor 4 digit (mis. `0601-...`), diputuskan via RFC.
6. Index/manifest memakai ID khusus: `SSOT-00-INDEX`, `SSOT-MANIFEST`, `ADR-INDEX`, `RFC-INDEX`.

## 3. Reserved

| Rentang | Dicadangkan untuk |
|---|---|
| `10-rfc/` RFC-001+ | RFC layer (Hardening Phase 2) |
| 11–89 layer baru | Ekspansi domain (perlu RFC + update dokumen ini) |
| Q-996–Q-999 | Skema tambahan (glossary schema, template registry, dll.) |

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 1: konvensi penomoran & ID permanen |
