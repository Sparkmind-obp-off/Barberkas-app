---
id: F-000
title: Charter
version: 2.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: strategy
last_updated: 2026-07-10
next_review: 2027-01-06
parent: null
related_docs: []
---
# F-000 — Charter

| Field | Value |
|---|---|
| **ID** | F-000 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [F-002 Governance](002-governance.md), [MIGRATION-MAP](../../migration/MIGRATION-MAP.md) |

## Purpose

Repository ini adalah **Canonical Single Source of Truth (SSOT) v2** untuk seluruh
ekosistem BarberKas (company: SparkMind). Semua keputusan strategis, produk, brand,
arsitektur, engineering, keamanan, operasi, AI, komersial, dan tata kelola **harus
mengacu** pada repository ini.

## Scope

Canonical SSOT mencakup 10 domain: Foundation, Brand, Product, Architecture,
Engineering, Security, Operations, AI, Commercial, Governance.

**Di luar scope:** source code produk (hidup di repo
[`Sparkmind-obp-off/Barberkas-foundry`](https://github.com/Sparkmind-obp-off/Barberkas-foundry)),
nilai secret/credential (tidak pernah disimpan di dokumen).

## Objectives

1. Menjamin konsistensi keputusan lintas sesi kerja (manusia maupun agent AI).
2. Menghapus duplikasi & konflik antar dokumen legacy (B4, B5, FM, AaaS bundle, canonical v1).
3. Menjadi acuan tunggal untuk status fitur yang **jujur & berbasis bukti** (Truth-Lock).
4. Mendukung jalan menuju production-grade dan (bila ada demand) enterprise-grade.

## Otoritas & preseden

1. Jika ada konflik antara dokumen v2 dan dokumen di `archive/`, **v2 menang**.
2. Jika ada konflik antara dokumen v2 dan kode/telemetry produksi, **kode/telemetry menang**
   — dan dokumen v2 wajib segera dikoreksi (buka issue + update).
3. Marketing copy tidak pernah menjadi sumber kebenaran status fitur.

## Prinsip inti (diadopsi dari doctrine yang telah terbukti dipakai)

- **Truth-Lock (D-1):** hanya klaim yang bisa dibuktikan; label VERIFIED/INFERRED/NOT VERIFIED wajib.
- **Indonesia-first:** bahasa, harga IDR, pembayaran QRIS/VA lokal.
- **Credit-aware:** eksekusi bertahap, commit sering, hemat resource.
- **Documentation as Code:** dokumentasi diversion, direview, dan diberi quality gate seperti software.
- **Security by Design & Fail-Closed:** keamanan bukan afterthought.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Baseline v2 — sintesis dari charter Batch-1 draft (GPT) + doctrine B4/B5/FM |
