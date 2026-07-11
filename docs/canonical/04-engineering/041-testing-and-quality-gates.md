---
id: E-041
title: Testing & Quality Gates
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: standard
last_updated: 2026-07-10
next_review: 2026-10-08
parent: E-040
related_docs: []
---
# E-041 — Testing & Quality Gates

| Field | Value |
|---|---|
| **ID** | E-041 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Engineering |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [E-040 Engineering Standards](040-engineering-standards.md), [S-051 Risk Register](../05-security/051-risk-register.md), [G-091 Production Gate](../09-governance/091-production-gate.md) |

## 1. Status jujur saat ini (VERIFIED, audit v1 §2)

- `package.json` **tidak memiliki** unit/integration/E2E test runner; script `test`
  hanya `curl` server lokal.
- Hanya ada satu test `.mjs` spesifik sanitasi Fonnte, dan **tidak menjadi quality gate**.
- Tidak ada CI (**QA-01, P0**). Build lulus ≠ kualitas terjamin.

## 2. Test pyramid target

| Layer | Cakupan wajib | Prioritas |
|---|---|---|
| **Unit** | Logic murni: kalkulasi harga, FSM booking, sanitasi input, mapping tenant | P0 |
| **Integration** | Route + D1 lokal: auth matrix, CRUD per tenant, payment callback, webhook idempotency | P0 |
| **E2E (smoke)** | Alur kritis production-like: login → transaksi → laporan; booking → reminder | P1 |
| **Migration** | Migration smoke: apply dari nol + apply incremental, data invariant | P0 |
| **Security** | Negative authorization (cross-tenant), fail-closed config, header checks | P0 |

## 3. Suite kritis yang diwajibkan risk register

| Suite | Membuktikan | Risk |
|---|---|---|
| Auth matrix | Setiap route terlindungi menolak anonim & role salah; missing config → 503/401 | SEC-01 |
| Bootstrap | Unknown first user tetap unprivileged | SEC-02 |
| Cross-tenant | Read/write lintas tenant selalu ditolak | isolation |
| Payment | create/callback/duplicate/**amount mismatch**/failure/refund | PAY-01 |
| Webhook | Idempotency + signature invalid ditolak | ABUSE/PAY |
| Booking | Duplicate/concurrency rate < 0.1% | OPS |
| Rate limit | 429 behavior pada public/AI/payment surfaces | ABUSE-01 |
| Headers | CSP/HSTS/nosniff dll. hadir di semua respons HTML/API | WEB-01 |

## 4. Quality gates

### Gate merge (CI required checks)
`npm ci` → typecheck/build → unit → integration → lint → dependency/secret scan.
Merah = tidak boleh merge. Tanpa pengecualian untuk area auth/payment/tenant.

### Gate release
Semua gate merge + migration smoke + E2E smoke hijau pada preview deployment.

### Gate launch publik berbayar
Didefinisikan penuh di [G-091 Production Gate](../09-governance/091-production-gate.md);
suite §3 semuanya hijau adalah prasyarat.

## 5. Konvensi

- Test data tenant memakai tenant sintetis (`tenant_test_*`) — tidak pernah tenant nyata.
- Golden dataset untuk AI output (lihat [AI-070](../07-ai/070-ai-agents-policy.md)).
- Setiap bugfix P0/P1 wajib disertai regression test.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Sintesis audit v1 §2/§8, risk register QA-01/SEC/PAY/ABUSE, roadmap v1 P0 item 4–5 |
