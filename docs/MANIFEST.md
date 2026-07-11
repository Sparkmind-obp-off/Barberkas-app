---
id: SSOT-MANIFEST
title: Canonical SSOT Registry
version: 3.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: index
last_updated: 2026-07-10
next_review: 2027-01-06
parent: F-000
related_docs: []
---
# MANIFEST — Canonical SSOT Registry

| Field | Value |
|---|---|
| **ID** | SSOT-MANIFEST |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Index |
| **References** | [00-INDEX](canonical/00-INDEX.md), [Q-990 Document Schema](canonical/99-schema/990-document-schema.md), [Q-994 Knowledge Graph](canonical/99-schema/994-knowledge-graph.md) |

> Registry resmi seluruh folder & dokumen canonical: ownership, tipe, maturity, status,
> dan dependency. Dokumen yang **tidak terdaftar di sini = orphan** (gagal quality gate).

## 1. Registry folder

| Folder | Domain | Owner | Maturity | Depends on |
|---|---|---|---|---|
| `canonical/00-foundation/` | Charter, glossary, governance, doc policy | Founder | Stable | — |
| `canonical/01-brand/` | Brand architecture, positioning | Founder | Stable | 00 |
| `canonical/02-product/` | Product brief, ICP, feature matrix, packaging | Product | Stable | 00, 01 |
| `canonical/03-architecture/` | System, data, ADR | Engineering | Stable | 02 |
| `canonical/04-engineering/` | Standards, testing, API | Engineering | Stable | 03 |
| `canonical/05-security/` | Baseline, risk, privacy | Security | Stable | 03, 04 |
| `canonical/06-operations/` | SLO, runbook, DR | Operations | Stable | 04, 05 |
| `canonical/07-ai/` | AI policy, session OS, skills | Engineering | Stable | 03, 04 |
| `canonical/08-commercial/` | GTM, pricing, evidence ledger | Commercial | Stable | 01, 02 |
| `canonical/09-governance/` | Roadmap, gates, DoR/DoD, workflows | Founder | Stable | 00 |
| `canonical/10-rfc/` | Usulan sebelum keputusan (RFC) | Founder | Incubating | 00 |
| `canonical/99-schema/` | Docs schema, taxonomy, lifecycle, graph | Founder | Stable | 00 |
| `migration/` | Audit & migration reports (immutable) | Founder | Frozen | — |
| `archive/` | Legacy read-only | Founder | Frozen | — |
| `tools/` | Validator & quality gates ([tools/README](tools/README.md)) | Engineering | Stable | 99 |
| `tools/ci/` | CI workflow quality gate ([docs-quality.yml](tools/ci/docs-quality.yml)) — aktifkan dengan menyalin ke `.github/workflows/` | Engineering | Stable | tools |

## 2. Registry dokumen

| ID | Dokumen | Type | Owner | Status | Parent |
|---|---|---|---|---|---|
| SSOT-00-INDEX | [Master Index](canonical/00-INDEX.md) | index | Founder | Approved | F-000 |
| SSOT-MANIFEST | MANIFEST (dokumen ini) | index | Founder | Approved | F-000 |
| F-000 | [Charter](canonical/00-foundation/000-charter.md) | strategy | Founder | Approved | — (root) |
| F-001 | [Glossary](canonical/00-foundation/001-glossary.md) | standard | Founder | Approved | F-000 |
| F-002 | [Governance](canonical/00-foundation/002-governance.md) | policy | Founder | Approved | F-000 |
| F-003 | [Documentation Policy](canonical/00-foundation/003-documentation-policy.md) | policy | Founder | Approved | F-002 |
| F-004 | [Decision Framework](canonical/00-foundation/004-decision-framework.md) | standard | Founder | Approved | F-002 |
| B-010 | [Brand Architecture](canonical/01-brand/010-brand-architecture.md) | strategy | Founder | Approved | F-000 |
| B-011 | [Positioning & Messaging](canonical/01-brand/011-positioning-and-messaging.md) | guideline | Commercial | Approved | B-010 |
| P-020 | [Product Brief](canonical/02-product/020-product-brief.md) | specification | Product | Approved | B-010 |
| P-021 | [ICP & JTBD](canonical/02-product/021-icp-and-jtbd.md) | specification | Product | Approved | P-020 |
| P-022 | [Feature Matrix](canonical/02-product/022-feature-matrix.md) | register | Product | Approved | P-020 |
| P-023 | [Packaging & Entitlements](canonical/02-product/023-packaging-and-pricing.md) | specification | Commercial | Approved | P-020 |
| A-030 | [System Overview](canonical/03-architecture/030-system-overview.md) | specification | Engineering | Approved | P-020 |
| A-031 | [Data Architecture](canonical/03-architecture/031-data-architecture.md) | specification | Engineering | Approved | A-030 |
| ADR-INDEX | [ADR Index](canonical/03-architecture/adr/ADR-INDEX.md) | index | Engineering | Approved | A-030 |
| ADR-001 | [Fail-closed Auth](canonical/03-architecture/adr/ADR-001-fail-closed-auth.md) | adr | Engineering | Accepted | ADR-INDEX |
| ADR-002 | [Edge-native Stack](canonical/03-architecture/adr/ADR-002-edge-native-stack.md) | adr | Engineering | Accepted | ADR-INDEX |
| ADR-003 | [Duitku MoR Payment](canonical/03-architecture/adr/ADR-003-duitku-mor-payment.md) | adr | Engineering | Accepted | ADR-INDEX |
| ADR-004 | [WA Device–Tenant Mapping](canonical/03-architecture/adr/ADR-004-wa-device-tenant-mapping.md) | adr | Engineering | Accepted | ADR-INDEX |
| ADR-005 | [Primary Domain](canonical/03-architecture/adr/ADR-005-primary-domain.md) | adr | Founder | Accepted | ADR-INDEX |
| ADR-006 | [Admin Bootstrap](canonical/03-architecture/adr/ADR-006-admin-bootstrap.md) | adr | Engineering | Accepted | ADR-INDEX |
| E-040 | [Engineering Standards](canonical/04-engineering/040-engineering-standards.md) | standard | Engineering | Approved | A-030 |
| E-041 | [Testing & Quality Gates](canonical/04-engineering/041-testing-and-quality-gates.md) | standard | Engineering | Approved | E-040 |
| E-042 | [API Standards](canonical/04-engineering/042-api-standards.md) | standard | Engineering | Approved | E-040 |
| S-050 | [Security Baseline](canonical/05-security/050-security-baseline.md) | policy | Security | Approved | A-030 |
| S-051 | [Risk Register](canonical/05-security/051-risk-register.md) | register | Security | Approved | S-050 |
| S-052 | [Privacy & Data Protection](canonical/05-security/052-privacy-and-data-protection.md) | policy | Security | Approved | S-050 |
| O-060 | [SLO & Observability](canonical/06-operations/060-slo-and-observability.md) | standard | Operations | Approved | E-040 |
| O-061 | [Runbooks & Incident](canonical/06-operations/061-runbooks-and-incident.md) | runbook | Operations | Approved | O-060 |
| O-062 | [Backup & DR](canonical/06-operations/062-backup-and-dr.md) | runbook | Operations | Approved | O-060 |
| AI-070 | [AI Agents Policy](canonical/07-ai/070-ai-agents-policy.md) | policy | Engineering | Approved | A-030 |
| AI-071 | [Session OS](canonical/07-ai/071-session-os.md) | standard | Engineering | Approved | AI-070 |
| AI-072 | [Skill Authoring Standard](canonical/07-ai/072-skill-authoring-standard.md) | standard | Engineering | Approved | AI-070 |
| C-080 | [GTM Strategy](canonical/08-commercial/080-gtm-strategy.md) | strategy | Commercial | Approved | P-020 |
| C-081 | [Pricing Catalog](canonical/08-commercial/081-pricing-catalog.md) | specification | Commercial | Approved | C-080 |
| C-082 | [Evidence Ledger](canonical/08-commercial/082-evidence-ledger.md) | register | Commercial | Approved | C-080 |
| G-090 | [Roadmap 30/60/90](canonical/09-governance/090-roadmap.md) | strategy | Founder | Approved | F-000 |
| G-091 | [Production Gate](canonical/09-governance/091-production-gate.md) | procedure | Founder | Approved | G-090 |
| G-092 | [Enterprise Gate](canonical/09-governance/092-enterprise-gate.md) | procedure | Founder | Approved | G-090 |
| G-093 | [DoR / DoD](canonical/09-governance/093-definition-of-ready-done.md) | procedure | Engineering | Approved | G-090 |
| G-094 | [Docs Governance Workflows](canonical/09-governance/094-docs-governance-workflows.md) | procedure | Founder | Approved | F-002 |
| G-095 | [Capability Map & Operating Model](canonical/09-governance/095-capability-map-operating-model.md) | strategy | Founder | Approved | F-000 |
| G-096 | [Responsibility & Stakeholder Matrix](canonical/09-governance/096-responsibility-stakeholder-matrix.md) | register | Founder | Approved | G-095 |
| G-097 | [Risk & Compliance Matrix](canonical/09-governance/097-risk-compliance-matrix.md) | register | Founder | Approved | G-095 |
| RFC-INDEX | [RFC Register](canonical/10-rfc/RFC-INDEX.md) | index | Founder | Approved | F-002 |
| RFC-000 | [Template RFC](canonical/10-rfc/RFC-000-template.md) | rfc | Founder | Approved | RFC-INDEX |
| RFC-001 | [Docs Hardening v3](canonical/10-rfc/RFC-001-docs-hardening-v3.md) | rfc | Founder | Accepted | RFC-INDEX |
| Q-990 | [Document Schema](canonical/99-schema/990-document-schema.md) | standard | Founder | Approved | F-003 |
| Q-991 | [Metadata Schema](canonical/99-schema/991-metadata-schema.md) | standard | Founder | Approved | Q-990 |
| Q-992 | [Taxonomy](canonical/99-schema/992-taxonomy.md) | standard | Founder | Approved | Q-990 |
| Q-993 | [Lifecycle](canonical/99-schema/993-lifecycle.md) | standard | Founder | Approved | Q-990 |
| Q-994 | [Knowledge Graph](canonical/99-schema/994-knowledge-graph.md) | index | Founder | Approved | Q-990 |
| Q-995 | [Numbering & ID](canonical/99-schema/995-numbering.md) | standard | Founder | Approved | Q-990 |
| MIG-MAP | [Migration Map](migration/MIGRATION-MAP.md) | report | Founder | Frozen | F-000 |
| MIG-AUDIT | [Audit Report v2](migration/AUDIT-REPORT-V2.md) | report | Founder | Frozen | F-000 |

> Registry lengkap per Hardening Phase 4+7 (Batch H4): 56 dokumen terdaftar.

## 3. Aturan manifest

1. Setiap file `.md` baru di `canonical/` wajib terdaftar di §2 pada commit yang sama.
2. Perubahan status lifecycle wajib tercermin di kolom Status.
3. Validator ([tools/validate_docs.py](tools/validate_docs.py)) memverifikasi:
   file tanpa entri manifest = **orphan → error**; entri tanpa file = **dangling → error**.
4. Quality gate berjalan otomatis di CI ([docs-quality.yml](tools/ci/docs-quality.yml),
   aktifkan via salin ke `.github/workflows/`) pada setiap push & PR ke `main`.

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 1: registry penuh 45 dokumen + 15 folder |
| 3.0.0 | 2026-07-10 | Hardening Phase 3: tools/ + CI aktif; retrofit front-matter YAML 53 dokumen |
| 3.0.0 | 2026-07-10 | Hardening Phase 4+7: registrasi G-095/G-096/G-097; Q-994 Draft → Approved |
