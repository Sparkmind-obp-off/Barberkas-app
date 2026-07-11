---
id: G-094
title: Docs Governance Workflows
version: 3.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: procedure
last_updated: 2026-07-10
next_review: 2026-10-08
parent: F-002
related_docs: []
---
# G-094 — Docs Governance Workflows

| Field | Value |
|---|---|
| **ID** | G-094 |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Procedure |
| **References** | [F-002 Governance](../00-foundation/002-governance.md), [Q-993 Lifecycle](../99-schema/993-lifecycle.md), [RFC-INDEX](../10-rfc/RFC-INDEX.md), [ADR-INDEX](../03-architecture/adr/ADR-INDEX.md) |

> SOP resmi seluruh alur governance dokumentasi: review, approval, RFC, ADR,
> deprecation, dan exception. Melengkapi state machine [Q-993](../99-schema/993-lifecycle.md).

## 1. Governance board

Selama tim kecil, board = **Founder** (final authority) + owner layer terkait.
Saat tim tumbuh: minimal Founder + Engineering lead + 1 domain owner; keputusan
kuorum 2/3, Founder memegang veto.

| Peran | Tanggung jawab |
|---|---|
| Author | Menulis draft, memenuhi Q-990/Q-991, mengajukan review |
| Reviewer | Memeriksa substansi + kepatuhan schema; approve/request changes |
| Owner (layer) | Approve final untuk dokumen di layernya |
| Founder | Veto, approve policy/strategy, transisi deprecated→archived |

## 2. Review & approval workflow

```
Author: draft ──► PR / commit dengan status: review
                        │
        Validator CI hijau? ──► ❌ perbaiki dulu
                        │ ✅
        Reviewer: substansi + schema check
                        │
        approve ──► Owner set status: approved, bump version
        request-changes ──► kembali draft
```

Aturan:
1. `policy` / `standard` / `strategy` → wajib approval **Owner + Founder**.
2. `guideline` / `runbook` / `register` → cukup Owner.
3. Approval dicatat di Version history dokumen (bukan hanya di git).

## 3. RFC workflow (usulan → keputusan)

```
Ide ──► RFC-XXX (proposed) ──► discussion ──► decided
                                              ├─ accepted ──► ADR / revisi dokumen ──► implemented
                                              ├─ rejected  (alasan dicatat, disimpan)
                                              └─ withdrawn
```

Wajib RFC bila perubahan menyangkut: struktur repo/layer baru, skema metadata,
keputusan arsitektur baru, perubahan pricing kanonik, kebijakan keamanan/privacy,
atau penghapusan/penggabungan dokumen approved.

## 4. ADR workflow

1. ADR lahir dari RFC accepted (atau langsung untuk keputusan teknis mendesak — catat alasannya).
2. Status ADR: `Proposed → Accepted → (Superseded by ADR-YYY | Deprecated)`.
3. ADR **immutable** setelah Accepted; perubahan = ADR baru yang men-supersede.
4. ADR baru wajib: masuk [ADR-INDEX](../03-architecture/adr/ADR-INDEX.md), MANIFEST, dan Knowledge Graph.

## 5. Deprecation workflow

1. Owner mengajukan deprecation + dokumen pengganti (atau alasan tanpa pengganti).
2. Founder approve → status `deprecated`, banner wajib ([Q-993 §3](../99-schema/993-lifecycle.md)).
3. Semua inbound link dari dokumen approved dialihkan ke pengganti (validator memverifikasi).
4. ≥ 30 hari & tanpa inbound link → `archived`: file pindah ke `archive/`, MANIFEST diupdate.

## 6. Exception policy

1. Exception terhadap policy/standard hanya boleh **tertulis**, dicatat di tabel berikut,
   dengan scope + expiry (maksimal 90 hari, boleh diperpanjang sekali via review ulang).
2. Exception tanpa catatan = pelanggaran governance.

| # | Dokumen/aturan | Exception | Alasan | Owner | Expiry |
|---|---|---|---|---|---|
| 1 | Q-991 front-matter wajib | Dokumen `archive/` & `migration/` dibebaskan | Immutable legacy/report | Founder | Permanen (by design) |

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 2: board, review/approval, RFC, ADR, deprecation, exception |
