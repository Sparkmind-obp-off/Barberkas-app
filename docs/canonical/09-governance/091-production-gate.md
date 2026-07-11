---
id: G-091
title: Production Gate
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
# G-091 — Production Gate

| Field | Value |
|---|---|
| **ID** | G-091 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Founder (gate keeper) |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [S-051 Risk Register](../05-security/051-risk-register.md), [G-090 Roadmap](090-roadmap.md), [C-082 Evidence Ledger](../08-commercial/082-evidence-ledger.md), [O-062 Backup & DR](../06-operations/062-backup-and-dr.md) |

## 1. Definisi

**Production Gate** = syarat minimum sebelum **launch publik berbayar** (akuisisi aktif
di luar pilot). Gate ini **fail-closed**: satu kriteria gagal → launch ditunda.
Status saat baseline v2: **BELUM LOLOS** (produk pilot-grade, audit v1 skor 1.9/5).

## 2. Kriteria (semua wajib TRUE, dengan bukti)

| # | Kriteria | Bukti minimum | Referensi |
|---|---|---|---|
| 1 | SEC-01, SEC-02, PAY-01, ABUSE-01, QA-01, CLAIM-01 **closed** | Risk register status + link PR/test | [S-051](../05-security/051-risk-register.md) |
| 2 | Cross-tenant authorization matrix otomatis & hijau | CI run | [E-041](../04-engineering/041-testing-and-quality-gates.md) |
| 3 | Payment tests: create/callback/duplicate/mismatch/failure/refund hijau | CI run | [E-041](../04-engineering/041-testing-and-quality-gates.md) |
| 4 | Outbound WA berfungsi di paket provider berbayar + delivery telemetry + retry policy | Telemetry dashboard | [O-060](../06-operations/060-slo-and-observability.md) |
| 5 | Privacy Policy, ToS, refund/cancel, AI disclosure **published** | URL live | [S-052](../05-security/052-privacy-and-data-protection.md) |
| 6 | Backup berjalan + restore drill terdemonstrasi | Drill record | [O-062](../06-operations/062-backup-and-dr.md) |
| 7 | Alerting mencakup 5xx, auth anomali, payment mismatch, webhook failure, WA delivery failure | Alert config + test fire | [O-060](../06-operations/060-slo-and-observability.md) |
| 8 | Support owner, jam, eskalasi, komunikasi insiden terdefinisi | Dokumen support live | [O-061](../06-operations/061-runbooks-and-incident.md) |
| 9 | Semua klaim landing cocok dengan kapabilitas produksi terverifikasi | Evidence ledger tanpa NOT VERIFIED live | [C-082](../08-commercial/082-evidence-ledger.md) |
| 10 | 3 pilot customer menyelesaikan activation **tanpa intervensi engineer** | Pilot log | [G-090 §3](090-roadmap.md) |

## 3. Proses gate review

1. Owner mengisi checklist + link bukti per kriteria (bukti mengikuti source-of-truth
   hierarchy [00-INDEX](../00-INDEX.md) — telemetry > tests > code > docs > marketing).
2. Review oleh Founder; hasil dicatat di dokumen ini (Change History) dengan tanggal.
3. Lolos gate → boleh mulai akuisisi berbayar ([C-080](../08-commercial/080-gtm-strategy.md)).
4. Regressi pasca-lolos (mis. payment mismatch muncul) → gate **re-open** otomatis.

## 4. Larangan sebelum gate lolos

- Iklan berbayar / akuisisi aktif di luar pilot.
- Kata "live", "production-ready", "aman", "terjamin" pada aset publik.
- Menerima pembayaran subscription dari non-pilot tanpa disclosure status pilot.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Dokumen baru dari canonical v1 §Production launch gate; ditambah proses review, re-open rule, dan larangan pra-gate |
