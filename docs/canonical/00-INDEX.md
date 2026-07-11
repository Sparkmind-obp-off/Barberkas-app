---
id: SSOT-00-INDEX
title: Master Index
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
# Canonical SSOT v3 — Master Index

| Field | Value |
|---|---|
| **ID** | SSOT-00-INDEX |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |

## Peta dokumen

### 00 — Foundation (jarang berubah)
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| F-000 | [Charter](00-foundation/000-charter.md) | Kenapa repo ini ada, scope, dan otoritasnya |
| F-001 | [Glossary](00-foundation/001-glossary.md) | Terminologi resmi tunggal (mengakhiri konflik istilah) |
| F-002 | [Governance](00-foundation/002-governance.md) | Hierarki keputusan & aturan perubahan |
| F-003 | [Documentation Policy](00-foundation/003-documentation-policy.md) | Standar metadata, lifecycle, kualitas dokumen |
| F-004 | [Decision Framework](00-foundation/004-decision-framework.md) | Cara mengevaluasi keputusan strategis |

### 01 — Brand
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| B-010 | [Brand Architecture](01-brand/010-brand-architecture.md) | Hierarki SparkMind → BarberKas → modul; istilah internal vs publik |
| B-011 | [Positioning & Messaging](01-brand/011-positioning-and-messaging.md) | Positioning kanonik, pesan pembeli, larangan jargon |

### 02 — Product
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| P-020 | [Product Brief](02-product/020-product-brief.md) | Apa BarberKas, masalah yang dipecahkan, status jujur |
| P-021 | [ICP & JTBD](02-product/021-icp-and-jtbd.md) | Siapa pembeli, job-to-be-done, activation & north-star |
| P-022 | [Feature Matrix](02-product/022-feature-matrix.md) | Status fitur terverifikasi (Truth-Lock) |
| P-023 | [Packaging & Entitlements](02-product/023-packaging-and-pricing.md) | Paket Starter/Growth/Multi-Outlet + limits |

### 03 — Architecture
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| A-030 | [System Overview](03-architecture/030-system-overview.md) | Stack, komponen, konteks sistem |
| A-031 | [Data Architecture](03-architecture/031-data-architecture.md) | Model data, multi-tenancy, gap & target |
| A-ADR | [ADR Register](03-architecture/adr/ADR-INDEX.md) | Keputusan arsitektur & rasionalnya |

### 04 — Engineering
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| E-040 | [Engineering Standards](04-engineering/040-engineering-standards.md) | Prinsip, konvensi, workflow git/CI |
| E-041 | [Testing & Quality Gates](04-engineering/041-testing-and-quality-gates.md) | Test pyramid, CI checks, DoD teknis |
| E-042 | [API Standards](04-engineering/042-api-standards.md) | Kontrak OpenAPI, error, versioning, idempotency |

### 05 — Security
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| S-050 | [Security Baseline](05-security/050-security-baseline.md) | Temuan P0/P1 & kontrol wajib |
| S-051 | [Risk Register](05-security/051-risk-register.md) | Register risiko terprioritisasi + acceptance criteria |
| S-052 | [Privacy & Data Protection](05-security/052-privacy-and-data-protection.md) | PII, consent, retention, export/delete |

### 06 — Operations
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| O-060 | [SLO & Observability](06-operations/060-slo-and-observability.md) | SLO minimum, telemetry, alerting |
| O-061 | [Runbooks & Incident](06-operations/061-runbooks-and-incident.md) | Runbook wajib & proses insiden |
| O-062 | [Backup & DR](06-operations/062-backup-and-dr.md) | RPO/RTO, restore drill |

### 07 — AI
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| AI-070 | [AI Agents Policy](07-ai/070-ai-agents-policy.md) | Agent yang ada, evaluasi, safety, cost caps |
| AI-071 | [Session OS](07-ai/071-session-os.md) | Boot/handoff/sprint/resume antar sesi agentik (eks-FM layer) |
| AI-072 | [Skill Authoring Standard](07-ai/072-skill-authoring-standard.md) | Standar penulisan skill internal |

### 08 — Commercial
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| C-080 | [GTM Strategy](08-commercial/080-gtm-strategy.md) | Beachhead, pilot, jalur penjualan |
| C-081 | [Pricing Catalog](08-commercial/081-pricing-catalog.md) | Katalog harga kanonik (cermin kode) |
| C-082 | [Evidence Ledger](08-commercial/082-evidence-ledger.md) | Governance klaim marketing berbasis bukti |

### 09 — Governance
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| G-090 | [Roadmap 30/60/90](09-governance/090-roadmap.md) | Prioritas eksekusi & exit criteria |
| G-091 | [Production Gate](09-governance/091-production-gate.md) | Syarat launch publik berbayar |
| G-092 | [Enterprise Gate](09-governance/092-enterprise-gate.md) | Syarat memakai label "enterprise" |
| G-093 | [Definition of Ready/Done](09-governance/093-definition-of-ready-done.md) | DoR & DoD backlog |
| G-094 | [Docs Governance Workflows](09-governance/094-docs-governance-workflows.md) | Board, review/approval, RFC, ADR, deprecation, exception |
| G-095 | [Capability Map & Operating Model](09-governance/095-capability-map-operating-model.md) | Peta 17 capability (5 domain) + cara organisasi beroperasi |
| G-096 | [Responsibility & Stakeholder Matrix](09-governance/096-responsibility-stakeholder-matrix.md) | RACI per capability + peta stakeholder + eskalasi |
| G-097 | [Risk & Compliance Matrix](09-governance/097-risk-compliance-matrix.md) | Heatmap risiko (render S-051) + 7 kewajiban compliance |

### 10 — RFC (usulan sebelum keputusan)
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| RFC-INDEX | [RFC Register](10-rfc/RFC-INDEX.md) | Daftar seluruh usulan + statusnya |
| RFC-000 | [Template RFC](10-rfc/RFC-000-template.md) | Format standar RFC baru |
| RFC-001 | [Docs Hardening v3](10-rfc/RFC-001-docs-hardening-v3.md) | Payung program hardening v2 → v3 |

### 99 — Schema (Docs-as-Code)
| ID | Dokumen | Jawaban untuk |
|---|---|---|
| Q-990 | [Document Schema](99-schema/990-document-schema.md) | Struktur wajib setiap dokumen canonical |
| Q-991 | [Metadata Schema](99-schema/991-metadata-schema.md) | Front-matter YAML wajib & validasinya |
| Q-992 | [Taxonomy](99-schema/992-taxonomy.md) | 12 tipe dokumen + aturan otoritas |
| Q-993 | [Lifecycle](99-schema/993-lifecycle.md) | State machine Draft→Review→Approved→Deprecated→Archived |
| Q-994 | [Knowledge Graph](99-schema/994-knowledge-graph.md) | Parent/child/dependency antar dokumen |
| Q-995 | [Numbering & ID](99-schema/995-numbering.md) | Konvensi penomoran & ID permanen |

### Root
| Dokumen | Jawaban untuk |
|---|---|
| [MANIFEST](../MANIFEST.md) | Registry resmi seluruh folder & dokumen (ownership, maturity, status) |

### Migration
| Dokumen | Jawaban untuk |
|---|---|
| [MIGRATION-MAP](../migration/MIGRATION-MAP.md) | Peta seluruh dokumen legacy → v2 |
| [AUDIT-REPORT-V2](../migration/AUDIT-REPORT-V2.md) | Audit & sintesis yang mendasari v2 |

## Aturan bukti (berlaku untuk seluruh repo)

- **VERIFIED** — diperiksa langsung melalui situs, endpoint produksi, build, atau source code.
- **INFERRED** — kesimpulan kuat dari bukti tetapi belum diuji end-to-end.
- **NOT VERIFIED** — klaim belum memiliki bukti independen yang cukup.

## Source-of-truth hierarchy

1. Production telemetry & payment/provider records.
2. Automated tests & CI release evidence.
3. Source code + migrations + infrastructure config.
4. API/OpenAPI contract.
5. Product specification & runbook.
6. Website/README/marketing copy. *(Terendah — tidak pernah jadi sumber kebenaran status fitur.)*
