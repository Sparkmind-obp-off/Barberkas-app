---
id: G-096
title: Responsibility & Stakeholder Matrix
version: 3.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: register
last_updated: 2026-07-10
next_review: 2026-10-08
parent: G-095
related_docs: [F-002, G-094, S-051]
---
# G-096 — Responsibility & Stakeholder Matrix

| Field | Value |
|---|---|
| **ID** | G-096 |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Register |
| **References** | [G-095 Capability Map](095-capability-map-operating-model.md), [F-002 Governance](../00-foundation/002-governance.md), [G-094 Docs Workflows](094-docs-governance-workflows.md) |

> RACI per capability + peta stakeholder. Selama tim = 1 orang, role dipegang
> Founder (acting) — tetapi **akuntabilitas per role tetap dipisah** agar handover
> ke hire pertama tidak mengubah struktur dokumen.

## 1. Role yang diakui

| Role | Scope | Saat ini |
|---|---|---|
| Founder | Strategi, keputusan final, gate approval | Founder |
| Product | Product brief, feature matrix, packaging | Founder (acting) |
| Engineering | Arsitektur, kode, testing, ADR teknis | Founder (acting) |
| Security | Baseline, risk register, privacy | Founder (acting) |
| Operations | SLO, runbook, backup/DR | Founder (acting) |
| Commercial | GTM, pricing, evidence ledger | Founder (acting) |
| AI Agents | Eksekusi terikat [AI-070](../07-ai/070-ai-agents-policy.md) | Genspark dkk. |

## 2. RACI per capability (ref: G-095)

R = Responsible, A = Accountable, C = Consulted, I = Informed. **Satu A per baris.**

| Capability | Founder | Product | Engineering | Security | Operations | Commercial |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| C1.1 Booking & scheduling | A | R | R | C | I | I |
| C1.2 Tenant management | A | C | R | C | I | — |
| C1.3 WhatsApp automation | A | C | R | C | I | I |
| C1.4 Payment & billing | A | C | R | C | I | C |
| C1.5 AI assistance | A | C | R | C | I | — |
| C1.6 Platform engineering | A | I | R | C | C | — |
| C2.1 Identity & access | A | I | R | R | I | — |
| C2.2 Risk management | A | I | C | R | C | I |
| C2.3 Privacy & data protection | A | C | C | R | I | I |
| C3.1 Reliability (SLO) | A | I | C | I | R | — |
| C3.2 Incident management | A | I | C | C | R | I |
| C3.3 Backup & DR | A | — | C | C | R | — |
| C4.1 GTM & positioning | A | C | — | — | — | R |
| C4.2 Pricing & packaging | A | C | I | — | — | R |
| C4.3 Evidence-based claims | A | C | C | — | — | R |
| C5.1 Decision governance | A | C | C | C | C | C |
| C5.2 Docs-as-code | A | C | R | C | C | C |

## 3. Stakeholder Matrix

| Stakeholder | Kepentingan | Pengaruh | Strategi engagement | Kanal |
|---|---|:---:|---|---|
| Pemilik barbershop (tenant) | Produk andal, harga jelas | Tinggi | Onboarding, changelog produk, support | WA, in-app |
| Pelanggan akhir (booking) | Booking lancar, data aman | Sedang | Privacy policy, UX, notifikasi | WA, web |
| Payment provider (Duitku) | Kepatuhan integrasi MoR | Tinggi | Kontrak, rekonsiliasi callback ([ADR-003](../03-architecture/adr/ADR-003-duitku-mor-payment.md)) | API, dashboard |
| WA gateway (Fonnte) | Pemakaian sesuai ToS | Sedang | Mapping device–tenant ([ADR-004](../03-architecture/adr/ADR-004-wa-device-tenant-mapping.md)), rate limit | API |
| Platform (Cloudflare, Clerk) | Pemakaian sesuai plan | Sedang | Monitoring kuota, upgrade path | Dashboard |
| Regulator (UU PDP) | Perlindungan data pribadi | Tinggi | [S-052 Privacy](../05-security/052-privacy-and-data-protection.md) compliance | Dokumen |
| Calon hire pertama | Onboarding cepat | Rendah→Tinggi | Repo ini sebagai onboarding SSOT | Repo |

## 4. Eskalasi

1. Konflik antar role → keputusan **Founder (A)**, dicatat sebagai ADR bila arsitektural.
2. Risiko baru P0/P1 → daftarkan di [S-051](../05-security/051-risk-register.md) dalam ≤ 24 jam.
3. Exception terhadap policy → jalur exception [G-094 §6](094-docs-governance-workflows.md).

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 7: RACI 17 capability + stakeholder matrix + eskalasi |
