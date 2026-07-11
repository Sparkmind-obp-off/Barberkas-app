---
id: Q-991
title: Metadata Schema
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
# Q-991 — Metadata Schema

| Field | Value |
|---|---|
| **ID** | Q-991 |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Standard |
| **References** | [Q-990 Document Schema](990-document-schema.md), [Q-992 Taxonomy](992-taxonomy.md), [Q-993 Lifecycle](993-lifecycle.md) |

> Skema metadata **machine-readable** (YAML front-matter) yang wajib ada di setiap
> dokumen canonical mulai v3. Front-matter adalah sumber kebenaran metadata;
> tabel metadata human-readable adalah mirror-nya.

## 1. Front-matter wajib

```yaml
---
id: S-051
title: Risk Register
version: 3.0.0
status: approved          # draft | review | approved | deprecated | archived
owner: Security
reviewers: [Founder]
classification: internal  # internal | public-safe | confidential
type: register            # lihat Q-992 Taxonomy
last_updated: 2026-07-10
next_review: 2026-10-10
parent: S-050
related_docs: [G-091, G-092]
---
```

## 2. Definisi field

| Field | Wajib | Tipe | Aturan |
|---|---|---|---|
| `id` | ✅ | string | Unik seluruh repo; sesuai skema prefix [Q-995](995-numbering.md) |
| `title` | ✅ | string | Sama dengan H1 (tanpa ID) |
| `version` | ✅ | semver | Naik sesuai kebijakan versi (§4) |
| `status` | ✅ | enum | `draft` / `review` / `approved` / `deprecated` / `archived` |
| `owner` | ✅ | string | Role (bukan nama orang) — Founder, Engineering, Security, Operations, Commercial |
| `reviewers` | ✅ | list | Minimal 1 role; boleh `[Founder]` selama tim kecil |
| `classification` | ✅ | enum | `internal` / `public-safe` / `confidential` |
| `type` | ✅ | enum | Taxonomy [Q-992](992-taxonomy.md): strategy/policy/standard/guideline/procedure/runbook/adr/rfc/specification/register/index/report |
| `last_updated` | ✅ | date | YYYY-MM-DD |
| `next_review` | ✅ | date | Default: `last_updated` + 90 hari (foundation: + 180 hari) |
| `parent` | ✅ | string\|null | ID dokumen induk di Knowledge Graph ([Q-994](994-knowledge-graph.md)); `null` hanya untuk F-000 |
| `related_docs` | ✅ | list | ID dokumen terkait (boleh kosong `[]`) |

## 3. Aturan validasi (dijalankan CI)

1. Semua field wajib ada dan tipe valid → **error** bila tidak.
2. `id` unik di seluruh `canonical/` → **error** bila duplikat.
3. `parent` dan `related_docs` harus merujuk ID yang ada → **error** bila dangling.
4. `status: approved` mensyaratkan `reviewers` tidak kosong.
5. `next_review` < hari ini → **warning** "review overdue".

## 4. Kebijakan versi dokumen

| Perubahan | Kenaikan |
|---|---|
| Perubahan makna/keputusan/angka kanonik | **MAJOR** |
| Penambahan seksi/konten tanpa mengubah keputusan | **MINOR** |
| Typo, format, perbaikan link | **PATCH** |

Versi repo (CHANGELOG) mengikuti dokumen dengan perubahan tertinggi pada rilis tsb.

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 1: skema metadata YAML front-matter wajib |
