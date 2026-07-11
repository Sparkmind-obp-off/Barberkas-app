---
id: A-030
title: System Overview
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: specification
last_updated: 2026-07-10
next_review: 2026-10-08
parent: P-020
related_docs: []
---
# A-030 — System Overview

| Field | Value |
|---|---|
| **ID** | A-030 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Engineering |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [A-031 Data Architecture](031-data-architecture.md), [ADR Register](adr/ADR-INDEX.md), [S-050 Security Baseline](../05-security/050-security-baseline.md) |

## Stack (VERIFIED dari source code)

| Layer | Teknologi | Peran |
|---|---|---|
| Runtime | Cloudflare Pages/Workers (edge-native, zero VPS) | Hosting & compute |
| Framework | Hono + TypeScript (~5.200 LOC, bundle ~165 kB) | Backend + SSR views |
| Database | Cloudflare D1 (SQLite) multi-tenant | Data persist |
| Auth | Clerk (JWT, production instance aktif) | Identity |
| Payment | Duitku (invoice + callback, MoR-pattern internal) | Pembayaran QRIS/VA |
| WhatsApp | Fonnte (inbound webhook; outbound via send-message API) | Kanal WA |
| AI | LLM (Groq dkk.) untuk Stylist/Marketing/Receptionist | Asisten AI |

## Konteks sistem

```
Customer (WA) ──► Fonnte ──► /webhooks/fonnte ─┐
Owner/Staff  ──► Browser ──► Clerk auth ──► App (Hono @ CF Workers)
                                              │
                                              ├─► D1 (multi-tenant data)
                                              ├─► Duitku (checkout + callback /webhook/duitku)
                                              ├─► LLM provider (AI assistants)
                                              └─► Fonnte send API (balasan WA)
```

## Karakter arsitektur & keterbatasan yang diakui

- **Monolith ringan edge-native** — tepat untuk tahap pilot; kontrak API belum formal
  (belum ada OpenAPI) → target E-042.
- D1 cukup untuk tahap awal; kapasitas, query plan, backup/restore **belum dibuktikan** → O-062.
- Health endpoint hanya membuktikan Worker hidup, bukan kesehatan D1/Clerk/Duitku/Fonnte/LLM.

## Prinsip arsitektur

1. **Edge-first, credit-aware:** manfaatkan free-tier Cloudflare; COGS infra mendekati nol.
2. **Fail-closed di production** (ADR-001).
3. **Tenant isolation by design:** tenant_id di semua tabel + server-side guard; pemetaan
   identitas eksternal (device WA) → tenant tidak boleh berdasar data yang bisa dipalsukan pengirim (ADR-004).
4. **Reuse, jangan duplikasi:** transport baru (mis. webhook Fonnte) menyambung ke logic
   FSM yang sudah teruji, bukan menulis versi kedua.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Sintesis audit v1 §1–2, B5-05 status kode, arsitektur AaaS bundle 04, arahan sesi Fonnte |
