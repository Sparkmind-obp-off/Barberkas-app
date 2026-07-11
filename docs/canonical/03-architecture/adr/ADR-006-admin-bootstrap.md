---
id: ADR-006
title: Hapus first-user auto-admin; bootstrap admin eksplisit
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: adr
last_updated: 2026-07-10
next_review: 2026-10-08
parent: ADR-INDEX
related_docs: []
---
# ADR-006 — Hapus first-user auto-admin; bootstrap admin eksplisit

| Field | Value |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-10 |
| **Owner** | Engineering |
| **Evidence label** | VERIFIED (temuan kode) / target perbaikan |

## Context

Audit v1 (§8.4, risk **SEC-02 P0**) menemukan: bila daftar admin kosong dan DB belum
memiliki baris admin, **user pertama yang login otomatis dipromosikan menjadi admin**
(`src/middleware/auth.ts:102-113`). Pada skenario bootstrap ulang, reset database, atau
migrasi environment, siapa pun yang login lebih dulu dapat mengambil alih kontrol penuh
aplikasi (account takeover during bootstrap/reset).

## Decision

1. **Hapus** mekanisme promosi otomatis first-user → admin.
2. Bootstrap admin hanya boleh lewat jalur eksplisit, salah satu dari:
   - **One-time bootstrap secret/token** (sekali pakai, kedaluwarsa, dicabut setelah dipakai);
   - **Manual migration/seed** yang dijalankan operator dengan akses infrastruktur;
   - **Manual allowlist** (email/user-id admin ditetapkan via konfigurasi environment).
3. Setiap event bootstrap admin **wajib tercatat di audit log** (siapa, kapan, jalur mana).

## Consequences

- (+) Menutup jalur takeover saat bootstrap/reset; kontrol admin selalu disengaja.
- (−) Setup environment baru butuh satu langkah manual tambahan — dapat diterima.
- Kewajiban lanjutan: automated test membuktikan **unknown first user tetap unprivileged**
  dan event bootstrap teraudit (exit criteria SEC-02, lihat
  [S-051](../../05-security/051-risk-register.md)).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Diangkat dari audit v1 §8.4 + SEC-02 |
