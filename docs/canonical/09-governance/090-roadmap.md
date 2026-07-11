---
id: G-090
title: Roadmap 30/60/90
version: 2.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: strategy
last_updated: 2026-07-10
next_review: 2026-10-08
parent: F-000
related_docs: []
---
# G-090 — Roadmap 30/60/90

| Field | Value |
|---|---|
| **ID** | G-090 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [S-051 Risk Register](../05-security/051-risk-register.md), [G-091 Production Gate](091-production-gate.md), [G-093 DoR/DoD](093-definition-of-ready-done.md), [P-021 ICP & JTBD](../02-product/021-icp-and-jtbd.md) |

## 1. North-star & guardrails

- **North-star:** jumlah outlet aktif mingguan yang mencatat transaksi dan menjalankan
  minimal satu workflow booking/retention.
- **Activation:** dalam 24 jam pasca-onboarding, tenant login, atur layanan/capster,
  catat transaksi pertama, terima booking pertama, lihat laporan harian — tanpa engineer.
- **Guardrails:** cross-tenant incident = 0 · payment mismatch = 0 · WA failed rate
  terlihat · COGS per tenant < batas paket · support burden terukur.

## 2. 0–30 hari — *Make it truthful and safe*

### P0
1. Fail-closed auth production + hapus first-user auto-admin ([ADR-001](../03-architecture/adr/ADR-001-fail-closed-auth.md), [ADR-006](../03-architecture/adr/ADR-006-admin-bootstrap.md)).
2. Rekonsiliasi amount/merchant/reference payment callback + callback event ledger (PAY-01).
3. Rate limit, quotas, body-size limit, anti-abuse di route public/AI/payment/webhook (ABUSE-01).
4. Automated tests: auth matrix, cross-tenant reads/writes, payment, webhook idempotency, booking duplicate, migration smoke (QA-01).
5. CI required checks: install, type/build, unit, integration, lint, dependency/secret scan ([E-041](../04-engineering/041-testing-and-quality-gates.md)).
6. Sinkronkan semua marketing claims — outbound WA/invoice & PWA jadi "beta/tidak tersedia" sampai terbukti (CLAIM-01 → [C-082](../08-commercial/082-evidence-ledger.md)).
7. Aktifkan paket outbound WA valid; ukur delivery/failure/retry.

### P1
8. Security headers/CSP + CORS allowlist.
9. Typed request validation + normalized error contract ([E-042](../04-engineering/042-api-standards.md)).
10. Error tracking, structured logs, request ID, synthetic health, alerting ([O-060](../06-operations/060-slo-and-observability.md)).
11. Privacy Policy, ToS, refund/cancel, AI disclosure, consent case study ([S-052](../05-security/052-privacy-and-data-protection.md)).
12. Backup + restore drill D1; tetapkan RPO/RTO ([O-062](../06-operations/062-backup-and-dr.md)).
13. Guest demo terisolasi dari tenant nyata.

**Exit 30 hari:** semua P0 ditutup; satu release lewat CI; payment & tenant-isolation
tests hijau; copy bebas klaim kontradiktif.

## 3. 31–60 hari — *Make it operable and sellable*

1. Pisahkan navigasi owner daily-ops vs operator/admin console.
2. Finalisasi entitlements Starter/Growth/Multi-Outlet + overage + implementation fee ([C-081](../08-commercial/081-pricing-catalog.md)).
3. Onboarding wizard, sample import, guided checklist, lifecycle trial→active→suspended→churned.
4. Customer export/delete, tenant offboarding, retention jobs.
5. Normalisasi transaction line items + DB CHECK/FK constraints ([A-031](../03-architecture/031-data-architecture.md)).
6. OpenAPI contract, pagination/idempotency, versioning policy.
7. Operational dashboard: payment, WA, LLM, errors, latency, activation, retention.
8. Runbooks: provider outage, payment mismatch, leaked webhook secret, tenant isolation, restore ([O-061](../06-operations/061-runbooks-and-incident.md)).
9. SEO: satu primary domain ([ADR-005](../03-architecture/adr/ADR-005-primary-domain.md)), redirects/canonical, sitemap, OG/JSON-LD, case study berbukti.
10. Pilot onboarding 3–5 barbershop dengan consent & measurement plan ([C-080](../08-commercial/080-gtm-strategy.md)).

**Exit 60 hari:** 3 pilot aktif; median activation < 24 jam; weekly usage terlihat;
support & provider cost tercatat.

## 4. 61–90 hari — *Prove retention and controlled scale*

1. Automated dunning/renewal atau invoice workflow yang dikelola eksplisit.
2. Cancellation/churn reason + win-back experiments.
3. Role permissions per action/outlet; konfirmasi & audit untuk sensitive action.
4. Load/concurrency test terhadap volume pilot yang disepakati.
5. Incident drill + restore drill kedua.
6. COGS & gross-margin dashboard per paket.
7. Eval AI dengan golden datasets, safety rules, latency/cost caps, fallback metrics ([AI-070](../07-ai/070-ai-agents-policy.md)).
8. Publikasikan status/support/security pages.
9. Konversi minimal 2 pilot → pelanggan berbayar recurring.
10. Keputusan ekspansi berdasarkan bukti activation/retention — bukan jumlah fitur.

**Exit 90 hari:** bukti paid retention ada; tidak ada P0/P1 terbuka; beban operasional
& unit economics dapat diterima.

## 5. 6–12 bulan — Enterprise path (hanya jika ada demand)

Multi-outlet hierarchy + granular RBAC · SSO/SAML/OIDC · immutable audit log ·
SLA/DPA/subprocessor/security package · DR/capacity program + status page · pen-test +
vulnerability disclosure · configurable retention/residency/export · procurement-ready
contracts. Semua diikat ke [G-092 Enterprise Gate](092-enterprise-gate.md).

## 6. Keputusan backlog (Build / Fix / Remove / Defer)

| Kategori | Item |
|---|---|
| **Build now** | Trust/security/quality/ops controls; reliabilitas kasir/booking/WA/retensi; guest demo, onboarding, reporting |
| **Fix now** | Kontradiksi klaim; payment reconciliation; auth bootstrap; fail-open; rate limiting; security headers; CORS; tests |
| **Remove/hide** | Internals F0–F7/DoO/Foundry dari dashboard owner; label "Enterprise"/"PWA"/"auto-send"/"live" tanpa bukti; tenant nyata di demo publik tanpa consent |
| **Defer** | 6 agent tambahan; ekspansi salon/klinik/laundry/cafe; cross-shop benchmarking; "AI Company in a Box" |

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Konsolidasi canonical v1 (03-ROADMAP) + traceability penuh ke risk register, ADR, gate, dan dokumen v2 |
