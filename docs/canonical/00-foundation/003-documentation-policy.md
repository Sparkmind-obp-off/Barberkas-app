---
id: F-003
title: Documentation Policy
version: 2.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: policy
last_updated: 2026-07-10
next_review: 2027-01-06
parent: F-002
related_docs: []
---
# F-003 — Documentation Policy

| Field | Value |
|---|---|
| **ID** | F-003 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [F-002 Governance](002-governance.md) |

## Metadata wajib

Setiap dokumen canonical wajib memiliki tabel metadata di bagian atas:

```
| Field | Value |
|---|---|
| **ID** | <prefix>-<nomor> |
| **Version** | semver |
| **Status** | Draft | Review | Approved | Deprecated | Archived |
| **Owner** | role |
| **Created** | YYYY-MM-DD |
| **Updated** | YYYY-MM-DD |
| **Classification** | Internal | Public-safe | Confidential |
| **References** | link ke dokumen terkait |
```

Dokumen tanpa metadata **tidak memenuhi standar** Canonical SSOT dan tidak boleh
dijadikan acuan.

## Skema ID

| Prefix | Domain |
|---|---|
| F-0xx | Foundation |
| B-01x | Brand |
| P-02x | Product |
| A-03x / ADR-xxx | Architecture |
| E-04x | Engineering |
| S-05x | Security |
| O-06x | Operations |
| AI-07x | AI |
| C-08x | Commercial |
| G-09x | Governance |

## Lifecycle

`Draft → Review → Approved → Deprecated → Archived`

- **Deprecated**: masih terlihat, ada penunjuk ke pengganti.
- **Archived**: dipindah ke `archive/`, read-only, tidak boleh diedit.

## Aturan konten

1. **Satu konsep, satu tempat.** Duplikasi = bug dokumentasi.
2. **Bahasa:** Indonesia untuk narasi; istilah teknis boleh Inggris. Konsisten per dokumen.
3. **Klaim status wajib berlabel** VERIFIED / INFERRED / NOT VERIFIED.
4. **Tidak ada secret/credential** di dokumen manapun (termasuk contoh).
5. **Cross-reference** memakai relative link dan wajib valid (tidak ada dead link).
6. **Change History** di akhir setiap dokumen.
7. Dokumen strategi dipisah dari dokumen implementasi (jangan dicampur).

## Quality gate dokumen (sebelum status Approved)

- [ ] Metadata lengkap dan ID unik.
- [ ] Tidak bertentangan dengan glossary (F-001).
- [ ] Semua link internal valid.
- [ ] Tidak menduplikasi konsep dokumen lain (atau menyebut dokumen kanonik + link).
- [ ] Klaim berbukti diberi label.
- [ ] Change History terisi.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Baseline dari draft 008-documentation-policy (Batch-1 GPT) + hardening checklist |
