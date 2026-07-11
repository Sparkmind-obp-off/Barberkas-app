---
id: A-031
title: Data Architecture
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: specification
last_updated: 2026-07-10
next_review: 2026-10-08
parent: A-030
related_docs: []
---
# A-031 — Data Architecture

| Field | Value |
|---|---|
| **ID** | A-031 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Engineering |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [A-030 System Overview](030-system-overview.md), [S-052 Privacy](../05-security/052-privacy-and-data-protection.md) |

## Kondisi saat ini (VERIFIED dari migrations/code)

- Semua tabel bisnis memiliki `tenant_id` + index (tenant isolation dasar ada).
- Tabel pemetaan **`tenant_wa_devices`** (device Fonnte → tenant, 1 nomor WA = 1 tenant)
  dirancang pada sesi integrasi Fonnte — pemetaan tenant dari **device penerima**,
  bukan dari data pengirim.
- Callback payment dicatat; idempotency dasar ada.

## Gap yang diakui (dari audit v1 §7, DATA-01)

| Gap | Dampak | Target perbaikan |
|---|---|---|
| Status/role/payment values tanpa CHECK constraint | Data invalid bisa masuk | Migration + invariant tests |
| Relasi bisnis hanya komentar, bukan FK | Integritas lemah | FK constraints |
| `service_ids` disimpan JSON | Reporting & integrity sulit | Normalisasi ke transaction line-item table |
| Tidak ada rollback/expand-contract discipline | Migrasi berisiko | Standar migrasi di E-040 |
| Tanpa retention/deletion/anonymization policy untuk PII & isi WA | Risiko privacy | S-052 + retention jobs |
| Tanpa export/portability, tenant deletion, suspension enforcement | Lifecycle tenant tidak lengkap | Roadmap 31–60 hari |

## Aturan data (mengikat)

1. Tabel baru **wajib** `tenant_id` + index + (bila relevan) FK & CHECK constraint.
2. Identitas eksternal → tenant hanya via tabel pemetaan resmi (bukan payload pengirim).
3. Event pembayaran & webhook disimpan sebagai **ledger append-only** (auditability).
4. Idempotency key untuk semua consumer webhook (Fonnte retry, Duitku callback).
5. PII (phone, isi pesan WA, notes) tunduk pada S-052.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Konsolidasi audit v1 §7 + desain tenant_wa_devices dari sesi Fonnte |
