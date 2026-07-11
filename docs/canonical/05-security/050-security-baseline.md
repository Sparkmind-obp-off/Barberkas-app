---
id: S-050
title: Security Baseline
version: 2.0.0
status: approved
owner: Security
reviewers: [Founder]
classification: internal
type: policy
last_updated: 2026-07-10
next_review: 2026-10-08
parent: A-030
related_docs: []
---
# S-050 — Security Baseline

| Field | Value |
|---|---|
| **ID** | S-050 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Security (Founder acting) |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [S-051 Risk Register](051-risk-register.md), [ADR-001](../03-architecture/adr/ADR-001-fail-closed-auth.md), [ADR-006](../03-architecture/adr/ADR-006-admin-bootstrap.md), [E-042 API Standards](../04-engineering/042-api-standards.md) |

## 1. Temuan P0 (audit v1 §8 — wajib ditutup sebelum launch publik berbayar)

| # | Temuan | Kontrol wajib | ADR/Risk |
|---|---|---|---|
| 1 | **Fail-open auth** saat Clerk config hilang | `APP_ENV=production` eksplisit; production selalu fail-closed (503/401) | ADR-001 / SEC-01 |
| 2 | **No rate limiting/abuse control** pada public intake, checkout, auth bootstrap, webhook, LLM, payment status | Per-IP/tenant/user limits, WAF rules, bounded body size, quotas | ABUSE-01 |
| 3 | **Payment amount reconciliation missing** — callback signature diverifikasi tetapi `amount` tidak dibandingkan dengan order | Bandingkan merchant, amount, currency, reference, order state; callback event ledger; mismatch → reject + alert | PAY-01 / ADR-003 |
| 4 | **First-user auto-admin** | Hapus promosi otomatis; bootstrap eksplisit + audit | ADR-006 / SEC-02 |

## 2. Temuan P1

| # | Temuan | Kontrol wajib | Risk |
|---|---|---|---|
| 5 | Security headers absent | CSP (nonce/hash), HSTS, `X-Content-Type-Options: nosniff`, Referrer-Policy, Permissions-Policy, frame-ancestors | WEB-01 |
| 6 | CORS terlalu luas (`/api/*` generik) | Explicit origin allowlist; methods/headers minimal | API-01 |
| 7 | Input validation inkonsisten | Schema validator typed; batas panjang, format phone/email, enum, request-size limit | API-01 |
| 8 | Webhook secret di query string | Bila provider tidak dukung signature/header: secret rotatable, scoped, redacted dari logs, rate-limited | — |
| 9 | PII governance missing | Consent, purpose limitation, retention, export/delete, role access review → detail di [S-052](052-privacy-and-data-protection.md) | PRIV-01 |
| 10 | Dev tooling vulnerabilities (Wrangler/Miniflare/Undici/ws: 1 low, 4 high) | Upgrade + lockfile; Dependabot/Renovate | SUPPLY-01 |

## 3. Kontrol yang sudah ada (VERIFIED — jangan diregresikan)

- Clerk JWT production aktif; endpoint dashboard anonim → 401.
- Server-side tenant guard (tenant_id di semua tabel).
- Signature verification pada webhook payment (Duitku).
- `npm audit --omit=dev` bersih untuk production dependencies (saat audit).
- Idempotency dasar pada payment callback.

## 4. Prinsip keamanan (mengikat)

1. **Fail-closed by default** di production (ADR-001).
2. **Least privilege** — RBAC saat ini owner/staff/admin sederhana; granular per
   outlet/action adalah prasyarat enterprise ([G-092](../09-governance/092-enterprise-gate.md)).
3. **Tenant isolation by design** — identitas eksternal tidak boleh dipetakan dari data
   yang bisa dipalsukan pengirim (ADR-004).
4. **Secrets tidak pernah di repo/dokumen** — hanya `wrangler secret` / `.dev.vars`.
5. **Audit trail** untuk aksi sensitif: bootstrap admin, refund, perubahan harga, role change.

## 5. Jalur eskalasi enterprise (defer sampai ada demand)

SSO/SAML/OIDC, SCIM, immutable audit export, pen-test, SBOM/SAST/secret scanning,
vulnerability disclosure — daftar lengkap di [G-092 Enterprise Gate](../09-governance/092-enterprise-gate.md).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Konsolidasi audit v1 §8 (10 temuan) + kontrol eksisting §2 + prinsip ADR-001/004/006 |
