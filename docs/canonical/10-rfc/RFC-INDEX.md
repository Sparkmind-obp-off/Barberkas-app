---
id: RFC-INDEX
title: Request for Comments Register
version: 3.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: index
last_updated: 2026-07-10
next_review: 2026-10-08
parent: F-002
related_docs: []
---
# RFC-INDEX — Request for Comments Register

| Field | Value |
|---|---|
| **ID** | RFC-INDEX |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Index |
| **References** | [RFC-000 Template](RFC-000-template.md), [ADR-INDEX](../03-architecture/adr/ADR-INDEX.md), [G-094 Docs Governance Workflows](../09-governance/094-docs-governance-workflows.md) |

> **RFC = usulan sebelum diputuskan. ADR = keputusan setelah diputuskan.**
> Setiap perubahan signifikan (arsitektur, kebijakan, struktur docs, pricing)
> dimulai dari RFC di sini; keputusan finalnya dicatat sebagai ADR (teknis)
> atau revisi dokumen policy/standard.

## Register

| RFC | Judul | Status | Author | Decided via | Tanggal |
|---|---|---|---|---|---|
| [RFC-000](RFC-000-template.md) | Template RFC | Approved (template) | Founder | — | 2026-07-10 |
| [RFC-001](RFC-001-docs-hardening-v3.md) | Docs Hardening Program v2 → v3 | Implemented | Founder | Batch H1–H5 selesai; repo v3.0.0 | 2026-07-10 |

## Status RFC

`proposed → discussion → accepted | rejected | withdrawn → (accepted) implemented`

| Status | Arti |
|---|---|
| `proposed` | Diajukan, belum dibahas |
| `discussion` | Sedang dibahas; komentar dicatat di seksi Discussion |
| `accepted` | Disetujui — wajib ditindaklanjuti ADR / revisi dokumen / implementasi |
| `rejected` | Ditolak dengan alasan tercatat (tetap disimpan, tidak dihapus) |
| `withdrawn` | Ditarik author |
| `implemented` | Sudah dieksekusi; tautan ke ADR/commit/dokumen hasil |

## Aturan

1. Nomor RFC sekuensial global, tidak pernah reset atau reuse ([Q-995](../99-schema/995-numbering.md)).
2. RFC **tidak pernah diedit setelah decided** — koreksi = RFC baru.
3. RFC bukan acuan implementasi; hanya ADR/standard hasil keputusannya ([Q-992 §2](../99-schema/992-taxonomy.md)).
4. Workflow lengkap: [G-094 Docs Governance Workflows](../09-governance/094-docs-governance-workflows.md).

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 2: RFC layer + register |
