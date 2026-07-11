---
id: E-042
title: API Standards
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
# E-042 — API Standards

| Field | Value |
|---|---|
| **ID** | E-042 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Engineering |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [A-030 System Overview](../03-architecture/030-system-overview.md), [A-031 Data Architecture](../03-architecture/031-data-architecture.md), [S-050 Security Baseline](../05-security/050-security-baseline.md) |

## 1. Status jujur saat ini (audit v1 §7)

- **Belum ada** OpenAPI schema, generated client, versioning policy, pagination standard,
  atau idempotency key umum — semuanya **target wajib** dokumen ini.
- CORS diterapkan generik pada seluruh `/api/*` (API-01 P1) — harus allowlist.

## 2. Kontrak API (target mengikat)

### 2.1 OpenAPI
- Seluruh route `/api/*` terdokumentasi dalam **satu file OpenAPI 3.1** di repo produk.
- OpenAPI adalah kontrak; perubahan breaking wajib versioning (§2.3) + ADR bila signifikan.
- Posisi dalam source-of-truth hierarchy: di bawah kode, di atas spec produk
  ([00-INDEX](../00-INDEX.md)).

### 2.2 Bentuk respons & error ternormalisasi

```json
// sukses
{ "ok": true, "data": { ... }, "meta": { "request_id": "..." } }

// error
{ "ok": false, "error": { "code": "TENANT_FORBIDDEN", "message": "…", "request_id": "..." } }
```

- `request_id` wajib ada end-to-end (log correlation, OPS-01).
- Error code stabil (UPPER_SNAKE), tidak membocorkan internal/stack/secret.
- HTTP status konsisten: 400 validasi, 401 unauth, 403 tenant/role, 404, 409 konflik/idempotency,
  422 semantik, 429 rate limit, 5xx internal.

### 2.3 Versioning
- Prefix path: `/api/v1/...` (sudah dipakai — VERIFIED `/api/v1/auth/config`).
- Breaking change → `/api/v2/...`; v lama deprecated minimal 90 hari dengan header
  `Deprecation` + tanggal sunset.

### 2.4 Pagination
- Cursor-based: `?limit=` (max 100, default 20) + `?cursor=`; respons `meta.next_cursor`.
- Dilarang offset besar tanpa index coverage (D1 constraint).

### 2.5 Idempotency
- Semua endpoint mutasi yang bisa di-retry (payment, booking, webhook) menerima
  `Idempotency-Key` header; duplikat → hasil pertama (200/409), bukan efek ganda.
- Webhook callback (Duitku/Fonnte) wajib idempotent by event id/reference (PAY-01, ADR-003/004).

## 3. Keamanan permukaan API (ringkas; detail di S-050)

- Validasi schema typed untuk body/query/params; batas panjang, enum, format phone/email,
  request-size limit (API-01).
- CORS: explicit origin allowlist + methods/headers minimal.
- Rate limit per-IP/tenant/user pada public, AI, payment, webhook surfaces (ABUSE-01).
- Webhook secret tidak di query string; bila provider memaksa, secret harus rotatable,
  scoped, redacted dari logs, dan rate-limited (temuan §8.8).

## 4. Konvensi umum

- Timezone: simpan UTC, tampilkan Asia/Jakarta (WIB) di UI.
- Currency: IDR integer (tanpa desimal).
- Identitas eksternal WA: pemetaan tenant dari **device penerima**, bukan payload pengirim (ADR-004).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Sintesis audit v1 §7/§8, risk API-01/ABUSE-01/PAY-01, roadmap 31–60 hari item 6 |
