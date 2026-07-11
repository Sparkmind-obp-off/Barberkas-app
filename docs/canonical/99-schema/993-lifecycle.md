---
id: Q-993
title: Document Lifecycle
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
# Q-993 — Document Lifecycle

| Field | Value |
|---|---|
| **ID** | Q-993 |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Standard |
| **References** | [Q-991 Metadata Schema](991-metadata-schema.md), [F-002 Governance](../00-foundation/002-governance.md), [G-094 Docs Governance Workflows](../09-governance/094-docs-governance-workflows.md) |

> SOP resmi perpindahan status dokumen. Status hidup di front-matter (`status:`)
> dan divalidasi CI.

## 1. State machine

```
draft ──► review ──► approved ──► deprecated ──► archived
  ▲          │           │
  └──────────┘           └──► review  (revisi mayor)
```

| Transisi | Syarat | Siapa yang memutuskan |
|---|---|---|
| (baru) → `draft` | Front-matter lengkap, masuk MANIFEST | Author |
| `draft` → `review` | Konten lengkap, self-check vs [Q-990](990-document-schema.md), validator hijau | Author |
| `review` → `approved` | Minimal 1 reviewer setuju; untuk `policy`/`standard`/`adr`: owner layer setuju | Owner |
| `review` → `draft` | Ada temuan mayor | Reviewer |
| `approved` → `review` | Revisi MAJOR diajukan | Owner |
| `approved` → `deprecated` | Ada pengganti; dokumen wajib memuat banner penunjuk pengganti | Owner + Founder |
| `deprecated` → `archived` | ≥ 30 hari deprecated & tidak ada inbound link dari dokumen approved | Founder |

## 2. Aturan per status

| Status | Boleh dijadikan acuan? | Boleh diedit? | Lokasi |
|---|---|---|---|
| `draft` | ❌ | ✅ bebas | `canonical/` |
| `review` | ❌ (kecuali disebut eksplisit "under review") | ✅ via feedback | `canonical/` |
| `approved` | ✅ satu-satunya yang boleh jadi acuan | Hanya PATCH/MINOR; MAJOR → kembali `review` | `canonical/` |
| `deprecated` | ⚠️ hanya via pengganti | ❌ (kecuali banner) | `canonical/` |
| `archived` | ❌ referensi sejarah saja | ❌ read-only | `archive/` |

## 3. Banner wajib

**Deprecated:**
```markdown
> ⚠️ DEPRECATED sejak YYYY-MM-DD. Digantikan oleh <link ID pengganti>.
```

**Archived:** file dipindah ke `archive/`, entri MANIFEST diberi status `archived`,
semua inbound link dari dokumen approved diarahkan ke pengganti.

## 4. Review berkala

- `next_review` lewat → validator memberi **warning**; owner wajib review dalam 14 hari.
- Hasil review: perpanjang `next_review` (tanpa perubahan = PATCH bump) atau revisi.
- Register (risk, evidence ledger): review 30 hari; standard/spec: 90 hari; foundation/strategy: 180 hari.

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 1: state machine lifecycle + SOP transisi |
