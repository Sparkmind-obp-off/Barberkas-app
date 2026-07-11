---
id: O-062
title: Backup & Disaster Recovery
version: 2.0.0
status: approved
owner: Operations
reviewers: [Founder]
classification: internal
type: runbook
last_updated: 2026-07-10
next_review: 2026-10-08
parent: O-060
related_docs: []
---
# O-062 — Backup & Disaster Recovery

| Field | Value |
|---|---|
| **ID** | O-062 |
| **Version** | 2.0.0 |
| **Status** | Approved (kebijakan) / Draft (bukti drill) |
| **Owner** | Operations (Founder acting) |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [O-060 SLO](060-slo-and-observability.md), [O-061 Runbooks](061-runbooks-and-incident.md) (RB-05), [A-031 Data Architecture](../03-architecture/031-data-architecture.md) |

## 1. Status jujur (audit v1 §2/§9)

Backup/restore D1, RPO/RTO, load capacity, uptime, dan incident recovery **NOT VERIFIED**
— belum ada bukti. Dokumen ini menetapkan target; statusnya berubah hanya dengan bukti drill.

## 2. Target RPO/RTO

| Fase | RPO | RTO |
|---|---|---|
| Pilot (sekarang) | ≤ 24 jam | ≤ 4 jam |
| Production scale | ≤ 4 jam | ≤ 1 jam |

## 3. Kebijakan backup

1. **D1 export terjadwal** — minimal harian (sesuai RPO pilot), otomatis
   (`wrangler d1 export` / Time Travel bila tersedia), disimpan di storage terpisah
   (R2 bucket khusus backup) dengan retensi ≥ 30 hari.
2. **Backup bukan backup sampai pernah di-restore.** Restore drill wajib:
   - Drill pertama: prasyarat [Production Gate](../09-governance/091-production-gate.md).
   - Drill berulang: minimal per kuartal (roadmap 61–90 hari item 5).
3. Hasil drill dicatat: tanggal, durasi restore, RPO aktual, integritas data (row counts +
   invariant checks), siapa yang menjalankan.
4. Konfigurasi (wrangler.jsonc, migrations) hidup di git — infrastruktur dapat dibangun
   ulang dari repo + secrets store.

## 4. Skenario DR

| Skenario | Respon |
|---|---|
| Data corruption (bug/migration salah) | Restore ke point-in-time terakhir yang sehat; replay yang bisa direplay; RB-05 |
| D1 regional outage | Tunggu recovery Cloudflare (status page); komunikasi ke tenant; degradasi read-only bila memungkinkan |
| Akun Cloudflare compromise | Rotate seluruh token/secret; audit deploy history; restore dari backup eksternal |
| Kehilangan akses provider (Clerk/Duitku/Fonnte) | Runbook RB-01; jalur manual sementara untuk tenant pilot |

## 5. Bukti yang harus ada sebelum klaim

| Klaim | Bukti minimum |
|---|---|
| "Backup harian berjalan" | Log job + objek backup terlihat + monitoring |
| "RPO ≤ 24 jam" | Timestamp backup terakhir vs insiden simulasi |
| "RTO ≤ 4 jam" | Durasi drill terukur |
| "Data aman" | Drill restore + invariant checks hijau |

Tanpa bukti → label **NOT VERIFIED**, dan tidak boleh muncul di marketing
([C-082 Evidence Ledger](../08-commercial/082-evidence-ledger.md)).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Dokumen baru: kebijakan backup/DR dari audit v1 §9 + roadmap item 12 & drill berulang |
