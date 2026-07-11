---
id: S-051
title: Risk Register
version: 2.0.0
status: approved
owner: Security
reviewers: [Founder]
classification: internal
type: register
last_updated: 2026-07-10
next_review: 2026-10-08
parent: S-050
related_docs: []
---
# S-051 — Risk Register

| Field | Value |
|---|---|
| **ID** | S-051 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Security (Founder acting) |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [S-050 Security Baseline](050-security-baseline.md), [G-091 Production Gate](../09-governance/091-production-gate.md), [G-092 Enterprise Gate](../09-governance/092-enterprise-gate.md) |

> Register ini adalah satu-satunya daftar risiko resmi. Setiap risiko punya
> **exit/acceptance criteria** yang dapat diuji. Status di-update saat mitigasi selesai
> (bump version + Change History).

## Register terprioritisasi

| ID | Prio | Risiko | Evidence | Dampak | Mitigasi wajib | Exit/acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| SEC-01 | P0 | Auth production bisa fail-open saat Clerk config hilang | `src/middleware/auth.ts` | Akses tak berizin setelah config drift | `APP_ENV` eksplisit; production selalu fail-closed | Test membuktikan missing/invalid config → 503/401 untuk setiap route terlindungi | Open |
| SEC-02 | P0 | First user bisa jadi admin saat tidak ada admin row/allowlist | `src/middleware/auth.ts:102-113` | Account takeover saat bootstrap/reset | Hapus auto-promotion; bootstrap secret sekali pakai/manual migration | Unknown first user tetap unprivileged; bootstrap event teraudit | Open |
| PAY-01 | P0 | Amount callback ditandatangani tapi tidak direkonsiliasi dengan order | `src/routes/outcome.ts:285-327` | Pembayaran salah nilai bisa menandai order paid | Bandingkan merchant/amount/currency/reference/state; callback event ledger | Mismatch → reject + alert, tidak pernah paid; automated tests | Open |
| ABUSE-01 | P0 | Tidak ada rate limit/quota pada public & AI/payment surfaces | Route/config audit | Spam, biaya provider, exhaustion D1/LLM | Per-IP/tenant/user limits, WAF, bounded body size, quotas | 429 behavior teruji; dashboard & alert ada | Open |
| QA-01 | P0 | Tidak ada CI dan coverage test nyaris nol | No `.github/workflows`; `test` = curl | Regression/cross-tenant/payment defect masuk prod | Test pyramid + CI required checks | Checks memblokir merge/deploy; critical paths hijau | Open |
| CLAIM-01 | P0 | Landing: faktur auto-WA; README: outbound diblokir | Landing + README | Mis-selling, risiko trust/legal | Koreksi copy + evidence ledger ([C-082](../08-commercial/082-evidence-ledger.md)) | Setiap klaim live punya link bukti + owner | Open |
| PRIV-01 | P1 | Phone/message/history customer tanpa retention/delete/consent | Schema/code/docs | Komplain privasi & risiko compliance | Privacy inventory, consent, retention, export/delete ([S-052](052-privacy-and-data-protection.md)) | Privacy policy terbit; deletion/export teruji | Open |
| WEB-01 | P1 | Security headers absent | Production headers | XSS/clickjacking/leakage | CSP, HSTS, nosniff, frame-ancestors, referrer/permissions policy | Automated header test lulus di semua respons | Open |
| API-01 | P1 | CORS luas & validasi schema inkonsisten | `src/index.tsx`, route review | Cross-origin abuse, malformed input | Allowlist origin; typed validators; size/enum/format limits | Negative contract tests lulus | Open |
| OPS-01 | P1 | Tidak ada SLO, alerting, tracing, incident/DR evidence | Repo/production review | Silent failure, recovery lambat | Metrics, error tracking, synthetic probes, runbooks, backup/restore drill ([O-060](../06-operations/060-slo-and-observability.md)–[O-062](../06-operations/062-backup-and-dr.md)) | Alert test & restore drill terekam; RPO/RTO terpenuhi | Open |
| DATA-01 | P1 | Constraint relasional lemah; service IDs denormalized JSON | Migrations | Kegagalan integrity/reporting | Line-item table, FK/CHECK constraints, lifecycle states | Migration/backfill selesai; invariant tests lulus | Open |
| WEB-02 | P1 | Klaim “PWA” tanpa manifest/service worker | Manifest 404, repo review | Klaim menyesatkan, UX install/offline buruk | Implement PWA nyata atau hapus klaim | Installability audit lulus atau copy dihapus | Open |
| SEO-01 | P2 | Domain duplikat; sitemap/canonical/schema hilang | Production checks | Authority terpecah, discovery lemah | Primary domain (ADR-005), redirects/canonical, sitemap, robots, OG/JSON-LD | Crawl search-console-ready lulus | Open |
| SUPPLY-01 | P2 | Vulnerability dev tooling (1 low, 4 high) | `npm audit` | Exposure supply-chain local/CI | Upgrade Wrangler/lockfile; Dependabot/Renovate | Full audit tanpa high/critical atau exception diterima | Open |
| UX-01 | P2 | Demo CTA memaksa login Clerk | Production `/app` | Conversion drop | Guest sandbox terisolasi atau product tour | Demo terbuka tanpa akun; tanpa data tenant nyata | Open |
| BRAND-01 | P2 | Jargon internal berlebihan di landing | Landing/docs | Kebingungan, konversi turun | Sederhanakan sekitar BarberKas & outcome pelanggan ([B-011](../01-brand/011-positioning-and-messaging.md)) | Target user paham penawaran <10 detik | Open |

## Aturan pengelolaan

1. Risiko baru masuk lewat PR ke dokumen ini dengan ID unik (`AREA-nn`), prioritas, dan
   exit criteria yang dapat diuji.
2. Menutup risiko wajib menyertakan **bukti** (link test/CI run/telemetry) — bukan klaim.
3. P0 terbuka = blokir [Production Gate](../09-governance/091-production-gate.md).
4. Review register minimal tiap sprint; prioritas bisa naik/turun dengan justifikasi.

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Migrasi penuh dari canonical v1 02-RISK register (16 risiko) + kolom Status + aturan pengelolaan |
