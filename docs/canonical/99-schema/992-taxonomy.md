---
id: Q-992
title: Document Taxonomy
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
# Q-992 — Document Taxonomy

| Field | Value |
|---|---|
| **ID** | Q-992 |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Standard |
| **References** | [Q-991 Metadata Schema](991-metadata-schema.md), [Q-993 Lifecycle](993-lifecycle.md) |

> Taxonomy resmi tipe dokumen. Setiap dokumen canonical wajib mendeklarasikan
> **tepat satu** `type` di front-matter. Tipe menentukan otoritas, siklus review,
> dan siapa yang boleh menyetujui.

## 1. Tipe dokumen

| Type | Definisi | Sifat | Contoh di repo | Review cycle |
|---|---|---|---|---|
| `strategy` | Arah jangka panjang & why | Direktif | F-000 Charter, C-080 GTM | 180 hari |
| `policy` | Aturan wajib (what must) | **Binding** | F-003 Doc Policy, AI-070 Agents Policy, S-052 Privacy | 180 hari |
| `standard` | Spesifikasi teknis wajib (how, terukur) | **Binding** | E-040 Eng Standards, E-042 API Standards, Q-99x | 90 hari |
| `guideline` | Rekomendasi (should) | Non-binding | Bagian messaging B-011 | 90 hari |
| `procedure` | Langkah operasional berurutan | Binding saat dieksekusi | G-093 DoR/DoD, workflow governance | 90 hari |
| `runbook` | Prosedur insiden/operasi darurat | Binding saat insiden | O-061 Runbooks, O-062 Backup/DR | 90 hari |
| `adr` | Keputusan arsitektur + konteks + konsekuensi | Immutable setelah Accepted | ADR-001..006 | Tidak direview ulang; superseded oleh ADR baru |
| `rfc` | Usulan **sebelum** diputuskan | Proposal | RFC-001+ (`canonical/10-rfc/`) | Sampai decided |
| `specification` | Deskripsi presisi sistem/data | Binding | A-030 System Overview, A-031 Data Architecture | 90 hari |
| `register` | Daftar hidup yang terus diperbarui | Living doc | S-051 Risk Register, C-082 Evidence Ledger | 30 hari |
| `index` | Navigasi/peta | Living doc | 00-INDEX, MANIFEST, ADR-INDEX | Setiap perubahan struktur |
| `report` | Snapshot analisis pada satu titik waktu | Immutable | AUDIT-REPORT-V2, MIGRATION-MAP | Tidak direview ulang |

## 2. Aturan otoritas antar tipe

```
strategy > policy > standard > guideline
adr  = keputusan final atas RFC        (RFC → ADR)
register & report = data, bukan aturan
```

1. Bila `guideline` bertentangan dengan `standard`/`policy` → standard/policy menang.
2. `adr` hanya boleh diubah dengan ADR baru yang men-supersede (bukan edit in-place).
3. `rfc` tidak pernah menjadi acuan implementasi — hanya `adr`/`standard` hasil keputusannya.
4. `report` tidak boleh diedit setelah publish; koreksi = report baru.

## 3. Pemetaan tipe → prefix ID

| Type dominan | Layer | Prefix |
|---|---|---|
| strategy/policy | 00-foundation, 01-brand | F-, B- |
| specification | 02-product, 03-architecture | P-, A- |
| standard | 04-engineering, 99-schema | E-, Q- |
| policy/register | 05-security | S- |
| runbook | 06-operations | O- |
| policy/standard | 07-ai | AI- |
| strategy/register | 08-commercial | C- |
| procedure | 09-governance | G- |
| rfc | 10-rfc | RFC- |
| adr | 03-architecture/adr | ADR- |

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 1: taxonomy 12 tipe + aturan otoritas |
