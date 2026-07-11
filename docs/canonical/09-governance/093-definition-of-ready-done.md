---
id: G-093
title: Definition of Ready / Definition of Done
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: procedure
last_updated: 2026-07-10
next_review: 2026-10-08
parent: G-090
related_docs: []
---
# G-093 — Definition of Ready / Definition of Done

| Field | Value |
|---|---|
| **ID** | G-093 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Engineering + Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [E-041 Testing & Quality Gates](../04-engineering/041-testing-and-quality-gates.md), [F-004 Decision Framework](../00-foundation/004-decision-framework.md), [C-082 Evidence Ledger](../08-commercial/082-evidence-ledger.md) |

## 1. Definition of Ready (DoR)

Backlog item **ready** hanya jika semua ada:

| # | Elemen | Pertanyaan yang dijawab |
|---|---|---|
| 1 | User & problem | Siapa terbantu, masalah apa |
| 2 | Owner | Siapa penanggung jawab |
| 3 | Scope & non-scope | Apa masuk, apa eksplisit tidak |
| 4 | Threat/privacy impact | Ada dampak keamanan/PII? ([S-050](../05-security/050-security-baseline.md), [S-052](../05-security/052-privacy-and-data-protection.md)) |
| 5 | API/data impact | Kontrak/migration berubah? ([E-042](../04-engineering/042-api-standards.md), [A-031](../03-architecture/031-data-architecture.md)) |
| 6 | Acceptance criteria | Kondisi lulus yang bisa diuji |
| 7 | Telemetry | Metrik/log apa yang membuktikan bekerja |
| 8 | Test plan | Unit/integration/E2E/negative yang dibutuhkan |
| 9 | Rollout/rollback | Cara deploy & cara mundur |
| 10 | Dependencies | Provider/dokumen/item lain yang diblok |
| 11 | Copy/status effect | Klaim publik berubah? → jalur [C-082](../08-commercial/082-evidence-ledger.md) |

Item tanpa salah satu elemen → kembali ke refinement, tidak masuk sprint.

## 2. Definition of Done (DoD)

Item **done** hanya jika semua TRUE:

- [ ] Code reviewed + CI hijau (semua required checks [E-041](../04-engineering/041-testing-and-quality-gates.md)).
- [ ] Unit/integration/E2E + **negative authorization tests** lulus.
- [ ] Migration backward-compatible; rollback/repair terdokumentasi.
- [ ] Logging/metrics/alerts ada, tanpa bocor secret/PII.
- [ ] Security/privacy review selesai untuk perubahan sensitif.
- [ ] Dokumentasi + evidence ledger diperbarui.
- [ ] Verifikasi staged/canary selesai.
- [ ] Bukti production acceptance ter-link.
- [ ] Status marketing (roadmap/beta/live) diperbarui **berdasarkan bukti**.

## 3. Ownership matrix (audit v1 §Suggested ownership)

| Peran | Tanggung jawab |
|---|---|
| Founder/Product | Positioning, packaging, claim ledger, pilot, pricing |
| Engineering | Auth, payment, API, data, CI, reliability |
| Security/Privacy owner | Threat model, policies, testing, incident readiness |
| Operations/Support | Onboarding, runbooks, SLO, eskalasi provider |
| Design/Research | Owner workflow, guest demo, accessibility, usability |
| Sales/Marketing | Halaman berbasis bukti, case study ber-consent, nol klaim tak terverifikasi |

> Saat ini semua peran dipegang Founder (1-operator) — matrix ini adalah pemisahan
> *tanggung jawab*, bukan headcount. Eskalasi konflik peran: [F-002 Governance](../00-foundation/002-governance.md).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Dokumen baru dari canonical v1 §DoR/DoD + ownership matrix; ditautkan ke quality gates & evidence ledger v2 |
