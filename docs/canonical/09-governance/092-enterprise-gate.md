---
id: G-092
title: Enterprise Gate
version: 2.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: procedure
last_updated: 2026-07-10
next_review: 2026-10-08
parent: G-090
related_docs: []
---
# G-092 — Enterprise Gate

| Field | Value |
|---|---|
| **ID** | G-092 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder (gate keeper) |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [G-091 Production Gate](091-production-gate.md), [S-050 Security Baseline](../05-security/050-security-baseline.md), [S-052 Privacy](../05-security/052-privacy-and-data-protection.md) |

## 1. Definisi

**Enterprise Gate** = syarat sebelum label **"enterprise"** boleh dipakai di produk,
harga, atau marketing. Prasyarat mutlak: [G-091 Production Gate](091-production-gate.md)
sudah lolos. Status baseline v2: **JAUH DARI LOLOS** (enterprise readiness 0.7/5,
audit v1 §3). Paket tertinggi saat ini bernama **Multi-Outlet**, bukan "Enterprise"
([C-081](../08-commercial/081-pricing-catalog.md)).

## 2. Kriteria (Production Gate + semua di bawah)

| # | Kriteria | Bukti minimum |
|---|---|---|
| 1 | Granular RBAC per outlet/action + least privilege | Permission matrix + tests |
| 2 | Opsi SSO (SAML/OIDC) + identity lifecycle terdokumentasi | Demo + docs |
| 3 | Audit log immutable & exportable | Schema + export sample |
| 4 | DPA, SLA, subprocessor list, security whitepaper | Dokumen ditandatangani/publik |
| 5 | Retention/export/delete configurable + tenant offboarding | Fitur teruji |
| 6 | Pen-test + remediation + vulnerability disclosure process | Laporan pen-test |
| 7 | SBOM, SAST, dependency/secret scanning, signed release | CI evidence |
| 8 | RPO/RTO kontraktual didukung restore/DR drill berulang | Drill records ≥ 2 |
| 9 | Capacity/load test untuk volume tenant/outlet/transaksi yang disepakati | Load test report |
| 10 | Status page + formal incident notification workflow | URL live + template |

## 3. Aturan penggunaan label

1. Sebelum gate lolos: kata "enterprise", "enterprise-grade", "bank-grade" **dilarang**
   di semua aset publik ([C-082 §5](../08-commercial/082-evidence-ledger.md)).
2. Kebutuhan pelanggan besar sebelum gate lolos → tawarkan **Multi-Outlet + custom
   agreement**, dengan disclosure jujur tentang kontrol yang belum ada.
3. Lolos gate dicatat di Change History + review ulang tahunan (kontrol bisa regress).

## 4. Rasional (audit v1 §10, §13)

Enterprise positioning prematur = risiko legal + trust. Sebagian besar kontrol
enterprise belum ada; menjualnya sebelum bukti melanggar Truth-Lock dan berpotensi
gagal procurement review pelanggan enterprise sungguhan.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Dokumen baru dari canonical v1 §Enterprise gate; ditambah aturan label & jalur Multi-Outlet + custom agreement |
