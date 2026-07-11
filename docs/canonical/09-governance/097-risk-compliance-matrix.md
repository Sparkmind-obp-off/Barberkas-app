---
id: G-097
title: Risk & Compliance Matrix
version: 3.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: register
last_updated: 2026-07-10
next_review: 2026-10-08
parent: G-095
related_docs: [S-051, S-052, G-091, G-092, G-096]
---
# G-097 — Risk & Compliance Matrix

| Field | Value |
|---|---|
| **ID** | G-097 |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Register |
| **References** | [S-051 Risk Register](../05-security/051-risk-register.md), [S-052 Privacy](../05-security/052-privacy-and-data-protection.md), [G-091 Production Gate](091-production-gate.md), [G-096 Responsibility Matrix](096-responsibility-stakeholder-matrix.md) |

> Pandangan enterprise atas risiko & kewajiban kepatuhan. **Sumber kebenaran risiko
> tetap [S-051](../05-security/051-risk-register.md)** — dokumen ini merender heatmap
> likelihood × impact dan memetakan kewajiban compliance ke kontrol + owner.
> Ada mismatch dengan S-051 → S-051 yang menang; dokumen ini di-update.

## 1. Skala penilaian

| Skala | Likelihood (L) | Impact (I) |
|:---:|---|---|
| 3 — High | Sangat mungkin terjadi tanpa mitigasi | Kerugian finansial/legal/trust material; blokir launch |
| 2 — Medium | Mungkin terjadi pada kondisi tertentu | Degradasi layanan/reputasi terpulihkan |
| 1 — Low | Jarang; butuh kombinasi kondisi | Ketidaknyamanan minor |

Severity = L × I. **P0 ≈ 6–9, P1 ≈ 3–4, P2 ≈ 1–2** (kalibrasi dengan prioritas S-051).

## 2. Risk heatmap (16 risiko S-051)

|  | **Impact 1 (Low)** | **Impact 2 (Medium)** | **Impact 3 (High)** |
|---|---|---|---|
| **Likelihood 3 (High)** | — | WEB-01, API-01 | ABUSE-01, QA-01 |
| **Likelihood 2 (Medium)** | UX-01, BRAND-01 | DATA-01, WEB-02, SEO-01, SUPPLY-01 | SEC-01, SEC-02, PAY-01, CLAIM-01, PRIV-01, OPS-01 |
| **Likelihood 1 (Low)** | — | — | — |

### Skor per risiko

| Risiko (S-051) | Prio | L | I | Skor | Zona | Treatment |
|---|:---:|:---:|:---:|:---:|:---:|---|
| SEC-01 Auth fail-open | P0 | 2 | 3 | 6 | 🔴 | Mitigate — fail-closed wajib sebelum [G-091](091-production-gate.md) |
| SEC-02 First-user auto-admin | P0 | 2 | 3 | 6 | 🔴 | Mitigate — hapus auto-promotion ([ADR-006](../03-architecture/adr/ADR-006-admin-bootstrap.md)) |
| PAY-01 Callback tanpa rekonsiliasi | P0 | 2 | 3 | 6 | 🔴 | Mitigate — rekonsiliasi amount/reference ([ADR-003](../03-architecture/adr/ADR-003-duitku-mor-payment.md)) |
| ABUSE-01 Tanpa rate limit/quota | P0 | 3 | 3 | 9 | 🔴 | Mitigate — limits + WAF + quotas |
| QA-01 Tanpa CI & coverage | P0 | 3 | 3 | 9 | 🔴 | Mitigate — test pyramid + required checks ([E-041](../04-engineering/041-testing-and-quality-gates.md)) |
| CLAIM-01 Klaim publik ≠ realita | P0 | 2 | 3 | 6 | 🔴 | Mitigate — evidence ledger ([C-082](../08-commercial/082-evidence-ledger.md)) |
| PRIV-01 PII tanpa retention/consent | P1 | 2 | 3 | 6 | 🔴 | Mitigate — program privasi ([S-052](../05-security/052-privacy-and-data-protection.md)) |
| WEB-01 Security headers absent | P1 | 3 | 2 | 6 | 🟠 | Mitigate — CSP/HSTS/nosniff dkk. |
| API-01 CORS luas & validasi lemah | P1 | 3 | 2 | 6 | 🟠 | Mitigate — allowlist + typed validators |
| OPS-01 Tanpa SLO/alerting/DR evidence | P1 | 2 | 3 | 6 | 🔴 | Mitigate — [O-060](../06-operations/060-slo-and-observability.md)–[O-062](../06-operations/062-backup-and-dr.md) |
| DATA-01 Constraint relasional lemah | P1 | 2 | 2 | 4 | 🟠 | Mitigate — FK/CHECK + line-item table |
| WEB-02 Klaim PWA palsu | P1 | 2 | 2 | 4 | 🟠 | Mitigate/Avoid — implement nyata atau hapus klaim |
| SEO-01 Domain duplikat, no sitemap | P2 | 2 | 2 | 4 | 🟠 | Mitigate — [ADR-005](../03-architecture/adr/ADR-005-primary-domain.md) |
| SUPPLY-01 Vuln dev tooling | P2 | 2 | 2 | 4 | 🟠 | Mitigate — upgrade + Dependabot; atau Accept via exception [G-094 §6](094-docs-governance-workflows.md) |
| UX-01 Demo memaksa login | P2 | 2 | 1 | 2 | 🟢 | Accept sementara; perbaiki pasca-gate |
| BRAND-01 Jargon internal di landing | P2 | 2 | 1 | 2 | 🟢 | Mitigate murah — copy rewrite ([B-011](../01-brand/011-positioning-and-messaging.md)) |

**Ringkasan zona:** 🔴 8 risiko · 🟠 6 risiko · 🟢 2 risiko.
Aturan gate: **zona 🔴 terbuka = blokir [Production Gate](091-production-gate.md)** (selaras S-051 aturan #3).

## 3. Compliance matrix (7 kewajiban)

| # | Kewajiban | Sumber | Scope yang terdampak | Kontrol kanonik | Owner ([G-096](096-responsibility-stakeholder-matrix.md)) | Status |
|---|---|---|---|---|---|---|
| K1 | Perlindungan data pribadi | UU PDP No. 27/2022 | PII pelanggan: phone, riwayat booking/chat | [S-052](../05-security/052-privacy-and-data-protection.md): consent, retention, export/delete | Security | 🔶 Partial — policy ada, implementasi belum (PRIV-01) |
| K2 | Kepatuhan payment MoR | Kontrak & ToS Duitku | Alur pembayaran, callback, refund | [ADR-003](../03-architecture/adr/ADR-003-duitku-mor-payment.md) + rekonsiliasi PAY-01 | Engineering | 🔶 Partial — signed callback ada, rekonsiliasi belum |
| K3 | Kepatuhan WA gateway | ToS Fonnte + WhatsApp policy | Notifikasi/reminder outbound | [ADR-004](../03-architecture/adr/ADR-004-wa-device-tenant-mapping.md): device–tenant mapping, rate limit | Engineering | 🔶 Partial — mapping ada, rate limit belum (ABUSE-01) |
| K4 | Kepatuhan platform | ToS Cloudflare & Clerk (plan limits) | Hosting, auth, kuota Workers/D1 | Monitoring kuota + upgrade path ([A-030](../03-architecture/030-system-overview.md)) | Operations | ✅ Compliant — dalam batas plan |
| K5 | Kejujuran klaim komersial | UU Perlindungan Konsumen No. 8/1999 | Landing page, materi marketing | [C-082 Evidence Ledger](../08-commercial/082-evidence-ledger.md) — klaim hanya dari fitur VERIFIED | Commercial | 🔶 Partial — ledger ada, koreksi copy belum (CLAIM-01) |
| K6 | Kewajiban perpajakan | Ketentuan pajak RI (PPh/PPN sesuai skala) | Revenue berbayar, invoice | Pencatatan transaksi via MoR; review saat revenue aktif | Founder | ⬜ Not yet due — belum ada revenue berbayar |
| K7 | Keamanan informasi baseline | Praktik industri (OWASP ASVS ringan) | Seluruh permukaan aplikasi | [S-050](../05-security/050-security-baseline.md) + [E-041](../04-engineering/041-testing-and-quality-gates.md) quality gates | Security | 🔶 Partial — baseline terdefinisi, kontrol P0/P1 open |

Legenda status: ✅ Compliant · 🔶 Partial (ada gap terdaftar di S-051) · ❌ Non-compliant · ⬜ Not yet due.

## 4. Aturan pengelolaan

1. Setiap kewajiban compliance wajib punya **kontrol kanonik + owner tunggal**; gap
   compliance wajib punya risiko padanan di [S-051](../05-security/051-risk-register.md).
2. Perubahan status (🔶 → ✅) wajib menyertakan **bukti** (test/CI/telemetry/dokumen legal),
   bukan klaim — konsisten aturan bukti [00-INDEX](../00-INDEX.md).
3. Kewajiban baru (regulasi/kontrak baru) → tambah baris K-nn lewat PR + review Founder.
4. Review dokumen ini bersamaan review S-051 (minimal per sprint); heatmap disinkronkan
   bila S-051 berubah.
5. ❌ Non-compliant pada K1–K5 = **blokir [Enterprise Gate](092-enterprise-gate.md)**.

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 7: heatmap 16 risiko (sinkron S-051) + compliance matrix 7 kewajiban |
