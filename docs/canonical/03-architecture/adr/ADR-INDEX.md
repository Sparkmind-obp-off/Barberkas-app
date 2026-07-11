---
id: ADR-INDEX
title: Architecture Decision Records (Register)
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: index
last_updated: 2026-07-10
next_review: 2026-10-08
parent: A-030
related_docs: []
---
# A-ADR — Architecture Decision Records (Register)

| Field | Value |
|---|---|
| **ID** | A-ADR |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Engineering |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [A-030 System Overview](../030-system-overview.md), [F-004 Decision Framework](../../00-foundation/004-decision-framework.md) |

> Setiap keputusan signifikan (arsitektur, data model, pembayaran, auth, brand/domain)
> **wajib** dicatat sebagai ADR di folder ini (aturan F-002 §2). ADR bersifat
> append-only: keputusan yang berubah tidak diedit, melainkan di-supersede oleh ADR baru.

## Register

| ADR | Judul | Status | Sumber keputusan |
|---|---|---|---|
| [ADR-001](ADR-001-fail-closed-auth.md) | Auth production wajib fail-closed | Accepted | Audit v1 §8.1, SEC-01 |
| [ADR-002](ADR-002-edge-native-stack.md) | Stack edge-native Cloudflare (zero VPS) | Accepted | Hard constraint doctrine FM-01 §1; audit v1 §1 |
| [ADR-003](ADR-003-duitku-mor-payment.md) | Pembayaran via Duitku dengan pola MoR internal | Accepted | AaaS bundle; B5-03; audit v1 §5 |
| [ADR-004](ADR-004-wa-device-tenant-mapping.md) | Pemetaan tenant WA dari device penerima, bukan payload pengirim | Accepted | Sesi integrasi Fonnte (fonnte.wa); A-031 |
| [ADR-005](ADR-005-primary-domain.md) | Satu domain utama + canonical URL + redirect | Accepted | Audit v1 §6.4, SEO-01 |
| [ADR-006](ADR-006-admin-bootstrap.md) | Hapus first-user auto-admin; bootstrap admin eksplisit | Accepted | Audit v1 §8.4, SEC-02 |

## Format ADR (wajib)

```
# ADR-xxx — <judul>
Status: Proposed | Accepted | Superseded by ADR-yyy
Date: YYYY-MM-DD
Context: <masalah & bukti>
Decision: <keputusan>
Consequences: <dampak positif/negatif, kewajiban lanjutan>
Evidence label: VERIFIED | INFERRED | NOT VERIFIED
```

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Register awal — 6 keputusan kanonik diangkat dari audit v1 + doctrine + sesi Fonnte |
