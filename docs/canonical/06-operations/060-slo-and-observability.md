---
id: O-060
title: SLO & Observability
version: 2.0.0
status: approved
owner: Operations
reviewers: [Founder]
classification: internal
type: standard
last_updated: 2026-07-10
next_review: 2026-10-08
parent: E-040
related_docs: []
---
# O-060 — SLO & Observability

| Field | Value |
|---|---|
| **ID** | O-060 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Operations (Founder acting) |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [S-051 Risk Register](../05-security/051-risk-register.md) (OPS-01), [O-061 Runbooks](061-runbooks-and-incident.md), [A-030 System Overview](../03-architecture/030-system-overview.md) |

## 1. Status jujur (audit v1 §9 — OPS-01 P1)

Belum ditemukan: SLO/SLI, alerting, error tracking, request ID end-to-end, structured
logs, metrics provider, runbook, on-call, status page, incident template, synthetic
transaction. Health 200 hanya membuktikan Worker aktif — **bukan** kesehatan
D1/Clerk/Duitku/Fonnte/LLM.

## 2. SLO minimum (mengikat untuk paket Growth)

| SLI | Target | Catatan |
|---|---|---|
| API availability | ≥ 99.5% / bulan | Diukur dari synthetic checks, bukan klaim |
| p95 read API | < 800 ms | |
| p95 write API | < 1.5 s | |
| Payment callback success | > 99.9% | Reconciliation mismatch = **0** |
| Cross-tenant data exposure | 0 insiden | Severity-1 security incident = 0 |
| Booking duplicate rate | < 0.1% | |
| WA delivery success | Diukur terpisah dari provider acceptance | Fonnte accept ≠ delivered |
| RPO / RTO | ≤ 24 jam / ≤ 4 jam (pilot) | Perketat saat scale — [O-062](062-backup-and-dr.md) |

## 3. Telemetry wajib (target implementasi)

1. **Request ID end-to-end** — dihasilkan di edge, dikembalikan di respons
   (`meta.request_id`, E-042), tercantum di semua log terkait.
2. **Structured logs** (JSON) — tanpa PII/secret (redaction, S-052 §3.4).
3. **Error tracking** — kelompokkan berdasarkan route + error code.
4. **Metrics minimum:** request rate/status per route, latency p50/p95, payment
   create/success/mismatch, WA send/delivered/failed, LLM call count + token cost per
   tenant, D1 query error rate.
5. **Synthetic checks:** health mendalam (D1 query ringan, provider reachability),
   login flow, booking flow — terjadwal.

## 4. Alerting minimum (roadmap 0–30 hari item 10)

| Alert | Kondisi |
|---|---|
| 5xx spike | Error rate > ambang pada window pendek |
| Auth anomaly | Lonjakan 401/403; percobaan bootstrap |
| Payment mismatch | ≥ 1 kejadian (PAY-01) — severity tinggi |
| Webhook failures | Callback gagal/timeout beruntun |
| WA delivery failure | Failure rate naik |
| Provider health | Synthetic check gagal |

Setiap alert → link runbook terkait ([O-061](061-runbooks-and-incident.md)).

## 5. Dashboard operasional (roadmap 31–60 hari item 7)

Satu dashboard: payment, WA, LLM cost, errors, latency, activation & retention
(north-star di [G-090](../09-governance/090-roadmap.md)). COGS per tenant terlihat
(guardrail credit-aware).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Konsolidasi audit v1 §9 (SLO minimum) + roadmap item telemetry/alerting + prinsip request-id E-042 |
