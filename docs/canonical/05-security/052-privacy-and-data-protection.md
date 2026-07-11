---
id: S-052
title: Privacy & Data Protection
version: 2.0.0
status: approved
owner: Security
reviewers: [Founder]
classification: internal
type: policy
last_updated: 2026-07-10
next_review: 2026-10-08
parent: S-050
related_docs: []
---
# S-052 — Privacy & Data Protection

| Field | Value |
|---|---|
| **ID** | S-052 |
| **Version** | 2.0.0 |
| **Status** | Approved (kebijakan) / Draft (implementasi) |
| **Owner** | Security/Privacy (Founder acting) |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [S-051 Risk Register](051-risk-register.md) (PRIV-01), [A-031 Data Architecture](../03-architecture/031-data-architecture.md), [G-091 Production Gate](../09-governance/091-production-gate.md) |

## 1. Status jujur (audit v1 — PRIV-01 P1)

PII disimpan (phone, isi pesan WhatsApp, customer history, notes) **tanpa** privacy
policy, ToS, DPA, consent flow, retention/deletion workflow yang ditemukan. Ini blocker
launch publik berbayar ([G-091](../09-governance/091-production-gate.md)).

## 2. Inventaris PII (baseline)

| Data | Sumber | Sensitivitas | Purpose |
|---|---|---|---|
| Nama & nomor telepon customer | Input kasir/booking, WA inbound | Tinggi | Operasional booking/retensi |
| Isi pesan WhatsApp | Fonnte webhook | Tinggi | Balasan assistant, riwayat layanan |
| Riwayat transaksi & layanan | Aplikasi | Sedang | Laporan, retensi |
| Notes/preferensi customer | Input staff | Sedang | Personalisasi layanan |
| Data owner/staff (akun) | Clerk | Tinggi | Identity & akses |

Inventaris ini wajib di-update setiap ada field PII baru (gate DoR, [G-093](../09-governance/093-definition-of-ready-done.md)).

## 3. Kebijakan mengikat

### 3.1 Consent & purpose limitation
- Tenant (barbershop) adalah **data controller** untuk data customer-nya; SparkMind/BarberKas
  adalah **data processor**. Peran ini masuk ToS/DPA.
- Data customer hanya dipakai untuk tujuan operasional tenant — bukan training model,
  bukan marketing lintas tenant.
- Testimonial/case-study (nama, angka, quote) wajib consent tertulis (CLAIM/consent —
  lihat [C-082 Evidence Ledger](../08-commercial/082-evidence-ledger.md)).

### 3.2 Retention & deletion (target)
| Data | Retensi default | Aksi setelahnya |
|---|---|---|
| Isi pesan WA | 12 bulan | Hapus/anonimisasi otomatis |
| Customer inactive | 24 bulan sejak transaksi terakhir | Anonimisasi |
| Tenant churned | 90 hari grace | Export tersedia → hard delete |
| Audit log keamanan | ≥ 24 bulan | Arsip |

Angka final dapat direvisi via PR; yang tidak boleh: **tanpa kebijakan**.

### 3.3 Hak subjek data / tenant
- **Export**: tenant dapat meminta export seluruh datanya (format terbuka: CSV/JSON).
- **Delete**: tenant offboarding = deletion workflow teruji, bukan soft-delete abadi.
- Suspension enforcement & legal hold didokumentasikan sebelum enterprise.

### 3.4 Akses internal
- Akses PII produksi hanya untuk debugging dengan alasan tercatat.
- PII tidak boleh muncul di logs/error tracking (redaction wajib — OPS).

## 4. Dokumen publik yang wajib terbit sebelum paid launch

1. Privacy Policy (Bahasa Indonesia).
2. Terms of Service + refund/cancellation.
3. AI disclosure (assistant membalas otomatis).
4. Acceptable use.

## 5. Jalur enterprise (defer)

DPA formal, subprocessor list (Cloudflare, Clerk, Duitku, Fonnte, LLM provider),
data residency, tenant-configurable retention — prasyarat [G-092](../09-governance/092-enterprise-gate.md).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Dokumen baru: konsolidasi audit v1 §7/§8.9/§10 + PRIV-01; inventaris PII + kebijakan retensi baseline |
