---
id: F-004
title: Decision Framework
version: 2.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: standard
last_updated: 2026-07-10
next_review: 2027-01-06
parent: F-002
related_docs: []
---
# F-004 — Decision Framework

| Field | Value |
|---|---|
| **ID** | F-004 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [F-002 Governance](002-governance.md), [ADR Register](../03-architecture/adr/ADR-INDEX.md) |

## Pertanyaan evaluasi keputusan strategis

Setiap keputusan strategis dievaluasi terhadap:

1. Apakah selaras dengan Vision & positioning kanonik (BarberKas untuk barbershop Indonesia)?
2. Apakah memberi nilai terukur bagi pengguna (activation/retention/omzet terlihat)?
3. Apakah dapat dipelihara jangka panjang oleh tim kecil (credit-aware)?
4. Apakah meningkatkan keandalan/keamanan sistem (fail-closed, Truth-Lock)?
5. Apakah menambah kompleksitas yang tidak perlu (jargon, brand baru, fitur prematur)?
6. Apakah terdokumentasi dan dapat ditelusuri (ADR / evidence)?

Jika jawaban 1–4 "tidak" → keputusan ditinjau ulang. Jika 5 "ya" → wajib justifikasi ADR.

## Aturan khusus dari pelajaran audit

- **Jangan tambah fitur/agent baru sebelum activation & retention inti terbukti**
  (keputusan DEFER audit v1: 6 agent tambahan, ekspansi multi-industri, "AI Company in a Box").
- **Jangan buat brand/istilah baru** menghadap pembeli tanpa melewati F-001 Glossary.
- **Klaim publik baru** wajib entry Evidence Ledger sebelum tayang.
- **30 hari pertama** fokus pada: *truth, trust, test, telemetry, transaction safety*.

## Format keputusan

- Keputusan arsitektur/data/payment/auth → **ADR** di `03-architecture/adr/`.
- Keputusan produk/komersial → update dokumen kanonik terkait + Change History.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Sintesis draft 007-decision-framework (Batch-1) + keputusan Build/Fix/Remove/Defer audit v1 |
