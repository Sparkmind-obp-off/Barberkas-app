---
id: G-095
title: Capability Map & Operating Model
version: 3.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: strategy
last_updated: 2026-07-10
next_review: 2026-10-08
parent: F-000
related_docs: [P-022, A-030, G-096]
---
# G-095 — Capability Map & Operating Model

| Field | Value |
|---|---|
| **ID** | G-095 |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Strategy |
| **References** | [P-022 Feature Matrix](../02-product/022-feature-matrix.md), [A-030 System Overview](../03-architecture/030-system-overview.md), [G-096 Responsibility Matrix](096-responsibility-stakeholder-matrix.md) |

> Peta kapabilitas bisnis Barberkas dan bagaimana organisasi (saat ini: founder-led)
> mengoperasikannya. Level maturity memakai skala 1–5 (1 = ad-hoc, 3 = terdefinisi,
> 5 = teroptimasi). Klaim maturity wajib berlabel bukti (VERIFIED / INFERRED / NOT VERIFIED).

## 1. Capability Map (Level 1 → Level 2)

### C1 — Product & Engineering
| Capability | Deskripsi | Maturity | Dokumen kanonik |
|---|---|:---:|---|
| C1.1 Booking & scheduling | Inti produk: reservasi barbershop | 3 | [P-020](../02-product/020-product-brief.md), [P-022](../02-product/022-feature-matrix.md) |
| C1.2 Tenant management | Multi-tenant isolation & lifecycle | 2 | [A-031](../03-architecture/031-data-architecture.md) |
| C1.3 WhatsApp automation | Notifikasi/reminder via WA gateway | 2 | [ADR-004](../03-architecture/adr/ADR-004-wa-device-tenant-mapping.md) |
| C1.4 Payment & billing | Pembayaran via Duitku (MoR) | 2 | [ADR-003](../03-architecture/adr/ADR-003-duitku-mor-payment.md) |
| C1.5 AI assistance | Agent/skill layer produk & internal | 2 | [AI-070](../07-ai/070-ai-agents-policy.md) |
| C1.6 Platform engineering | Edge-native stack, CI/CD, quality gates | 2 | [ADR-002](../03-architecture/adr/ADR-002-edge-native-stack.md), [E-041](../04-engineering/041-testing-and-quality-gates.md) |

### C2 — Security & Trust
| Capability | Deskripsi | Maturity | Dokumen kanonik |
|---|---|:---:|---|
| C2.1 Identity & access | Auth fail-closed, admin bootstrap | 2 | [ADR-001](../03-architecture/adr/ADR-001-fail-closed-auth.md), [ADR-006](../03-architecture/adr/ADR-006-admin-bootstrap.md) |
| C2.2 Risk management | Register + mitigasi P0–P2 | 3 | [S-051](../05-security/051-risk-register.md) |
| C2.3 Privacy & data protection | Consent, retention, export/delete | 1 | [S-052](../05-security/052-privacy-and-data-protection.md) |

### C3 — Operations
| Capability | Deskripsi | Maturity | Dokumen kanonik |
|---|---|:---:|---|
| C3.1 Reliability (SLO) | SLO, observability, alerting | 1 | [O-060](../06-operations/060-slo-and-observability.md) |
| C3.2 Incident management | Runbooks, postmortem | 2 | [O-061](../06-operations/061-runbooks-and-incident.md) |
| C3.3 Backup & DR | RPO/RTO, restore drill | 1 | [O-062](../06-operations/062-backup-and-dr.md) |

### C4 — Commercial
| Capability | Deskripsi | Maturity | Dokumen kanonik |
|---|---|:---:|---|
| C4.1 GTM & positioning | Segmentasi, kanal, pesan | 2 | [C-080](../08-commercial/080-gtm-strategy.md), [B-011](../01-brand/011-positioning-and-messaging.md) |
| C4.2 Pricing & packaging | Katalog harga & entitlement | 3 | [C-081](../08-commercial/081-pricing-catalog.md), [P-023](../02-product/023-packaging-and-pricing.md) |
| C4.3 Evidence-based claims | Klaim publik = fitur VERIFIED | 3 | [C-082](../08-commercial/082-evidence-ledger.md) |

### C5 — Governance & Docs
| Capability | Deskripsi | Maturity | Dokumen kanonik |
|---|---|:---:|---|
| C5.1 Decision governance | ADR/RFC, decision framework | 4 | [F-004](../00-foundation/004-decision-framework.md), [G-094](094-docs-governance-workflows.md) |
| C5.2 Docs-as-code | Schema, lifecycle, quality gates CI | 4 | [Q-990](../99-schema/990-document-schema.md)–[Q-995](../99-schema/995-numbering.md) |

> Maturity di atas berlabel **INFERRED** dari audit v1/v2; angka diverifikasi ulang
> setiap review kuartalan bersama [G-090 Roadmap](090-roadmap.md).

## 2. Operating Model

### 2.1 Struktur (saat ini)
```
Founder (acting: Product, Engineering, Security, Operations, Commercial)
   └── AI Agents (pelaksana terikat AI-070 policy, output selalu direview Founder)
```

### 2.2 Prinsip operasi
1. **Docs-first:** perubahan signifikan lewat RFC → ADR → implementasi (G-094).
2. **Single-threaded owner:** setiap capability punya tepat satu owner role (G-096).
3. **Gate-driven:** rilis mengikuti Production Gate (G-091) & Enterprise Gate (G-092).
4. **Evidence-based:** klaim status hanya dari P-022 / C-082.
5. **AI-leveraged, human-accountable:** agent mengeksekusi, akuntabilitas tetap di role manusia.

### 2.3 Ritme operasional
| Ritme | Frekuensi | Output |
|---|---|---|
| Review roadmap & risk | Bulanan | Update G-090, S-051 |
| Review docs (`next_review`) | Per jadwal front-matter | Bump version / re-approve |
| Restore drill DR | Kuartalan (target) | Bukti di O-062 |
| Audit capability maturity | Kuartalan | Update dokumen ini |

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 7: capability map 5 domain + operating model |
