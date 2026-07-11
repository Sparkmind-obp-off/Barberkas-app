---
id: O-061
title: Runbooks & Incident Management
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
# O-061 — Runbooks & Incident Management

| Field | Value |
|---|---|
| **ID** | O-061 |
| **Version** | 2.0.0 |
| **Status** | Approved (kerangka) / Draft (isi runbook detail) |
| **Owner** | Operations (Founder acting) |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [O-060 SLO & Observability](060-slo-and-observability.md), [O-062 Backup & DR](062-backup-and-dr.md), [S-051 Risk Register](../05-security/051-risk-register.md) |

## 1. Runbook wajib (roadmap 31–60 hari item 8)

Setiap runbook: **gejala → diagnosis → mitigasi → verifikasi → komunikasi → postmortem**.

| # | Runbook | Trigger | Inti tindakan |
|---|---|---|---|
| RB-01 | **Provider outage** (Cloudflare/Clerk/Duitku/Fonnte/LLM) | Synthetic check gagal; error spike | Identifikasi provider; degradasi terkontrol (fitur nonaktif dengan pesan jelas); jangan fail-open |
| RB-02 | **Payment mismatch** | Alert PAY mismatch | Bekukan order terkait; audit callback ledger; rekonsiliasi manual dengan Duitku; jangan tandai paid |
| RB-03 | **Leaked webhook secret** | Deteksi akses anomali/laporan | Rotate secret; invalidasi endpoint lama; audit event sejak leak window; catat insiden |
| RB-04 | **Tenant isolation incident** | Laporan/test menemukan akses lintas tenant | Severity-1: isolasi route terkait (fail-closed), snapshot bukti, perbaiki guard, notifikasi tenant terdampak |
| RB-05 | **Restore dari backup** | Data corruption/loss | Prosedur restore D1 teruji ([O-062](062-backup-and-dr.md)); verifikasi integritas; laporkan RPO aktual |
| RB-06 | **WA outbound failure** | Delivery failure rate naik | Cek kuota/status paket Fonnte; antrikan ulang dengan backoff; update status page/tenant |

## 2. Proses insiden

1. **Deteksi** — alert (O-060) atau laporan user.
2. **Triase severity:**
   - **SEV-1:** data exposure lintas tenant, payment salah tandai, auth bypass — respon segera.
   - **SEV-2:** fitur inti down (kasir/booking/WA) tanpa data exposure.
   - **SEV-3:** degradasi parsial/kosmetik.
3. **Mitigasi dulu, root-cause kemudian.** Fail-closed lebih baik daripada exposure.
4. **Komunikasi:** tenant terdampak diberi tahu jujur (Truth-Lock berlaku juga saat insiden);
   SEV-1 privacy → lihat kewajiban S-052.
5. **Postmortem blameless** ≤ 5 hari kerja: timeline, dampak, root cause, action items
   masuk backlog dengan owner. SEV-1/2 wajib postmortem tertulis.

## 3. On-call & eskalasi (fase pilot)

- Operator tunggal = Founder (diakui jujur). Jam support & SLA respons didefinisikan di
  paket ([P-023](../02-product/023-packaging-and-pricing.md)) — jangan menjanjikan 24/7.
- Eskalasi provider: kontak/tiket Duitku, Fonnte, Clerk, Cloudflare didokumentasikan
  (tanpa credential) di repo produk.

## 4. Incident template (minimum)

```
INC-<YYYYMMDD>-<nn>
Severity: SEV-1|2|3
Detected: <waktu, sumber>
Impact: <tenant/fitur/durasi>
Timeline: <deteksi → mitigasi → resolve>
Root cause:
Action items: <owner + due date>
Evidence links: <logs/alerts/tests>
```

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Dokumen baru: 6 runbook wajib dari roadmap v1 + proses insiden + severity + template |
