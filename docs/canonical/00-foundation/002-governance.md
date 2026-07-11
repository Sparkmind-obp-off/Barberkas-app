---
id: F-002
title: Governance
version: 2.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: policy
last_updated: 2026-07-10
next_review: 2027-01-06
parent: F-000
related_docs: []
---
# F-002 — Governance

| Field | Value |
|---|---|
| **ID** | F-002 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [F-000 Charter](000-charter.md), [F-003 Documentation Policy](003-documentation-policy.md), [G-093 DoR/DoD](../09-governance/093-definition-of-ready-done.md) |

## Hierarki keputusan

```
Vision / Mission
   ↓
Principles (Truth-Lock, Indonesia-first, Security by Design, Credit-aware)
   ↓
Policies (dokumen 00-foundation, 05-security, 09-governance)
   ↓
Standards (04-engineering, 07-ai)
   ↓
Guidelines & Runbooks (06-operations)
   ↓
Implementation (kode di repo produk)
```

## Vision

Menjadi platform digital paling terpercaya untuk barbershop dan bisnis grooming di
Indonesia — melalui teknologi yang andal, operasional yang unggul, dan klaim yang jujur.

## Mission

1. Menyederhanakan operasional barbershop: kasir, booking, pelanggan, WhatsApp.
2. Meningkatkan retensi pelanggan dan visibilitas omzet pemilik usaha.
3. Menghadirkan platform aman, cepat, dan andal (edge-native).
4. Menjaga kualitas melalui standar engineering dan bukti — bukan klaim.

## Aturan governance

1. Tidak boleh ada dokumen yang bertentangan dengan Charter atau Principles.
2. **Perubahan signifikan wajib ADR** (arsitektur, data model, pembayaran, auth, brand positioning).
3. Setiap dokumen memiliki **owner** dan **status** jelas (Draft/Review/Approved/Deprecated/Archived).
4. Perubahan pada dokumen `Approved` melalui PR + review minimal 1 reviewer.
5. Klaim publik baru wajib melewati [Evidence Ledger](../08-commercial/082-evidence-ledger.md).
6. Launch/label mengikuti gate: [Production Gate](../09-governance/091-production-gate.md),
   [Enterprise Gate](../09-governance/092-enterprise-gate.md).

## Kepemilikan (role saat ini dipegang founder + agent, siap dipisah saat tim tumbuh)

| Area | Owner role |
|---|---|
| Positioning, packaging, claim ledger, pilot, pricing | Founder / Product |
| Auth, payment, API, data, CI, reliability | Engineering |
| Threat model, policies, security testing, incident readiness | Security/Privacy owner |
| Onboarding, runbooks, SLO, provider escalation | Operations/Support |
| Owner workflow, guest demo, aksesibilitas | Design/Research |
| Halaman berbasis bukti, case study ber-consent | Sales/Marketing |

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Sintesis governance draft Batch-1 + suggested ownership canonical v1 |
