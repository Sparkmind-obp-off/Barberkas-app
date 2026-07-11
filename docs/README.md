# BarberKas — Canonical SSOT v3

> **Single Source of Truth** untuk seluruh ekosistem BarberKas / SparkMind.
> Semua keputusan strategis, produk, arsitektur, engineering, keamanan, operasi,
> komersial, dan tata kelola **wajib mengacu pada repository ini**.
> Sejak v3, repo ini **machine-validated**: setiap commit harus lolos quality gate.

| Field | Value |
|---|---|
| **Version** | 3.0.0 — "Hardening v3" ([RFC-001](canonical/10-rfc/RFC-001-docs-hardening-v3.md)) |
| **Status** | Approved |
| **Owner** | Founder / Product (SparkMind) |
| **Created** | 2026-07-10 |
| **Supersedes** | v2.0.0 baseline; `archive/canonical-v1/`, `archive/ssot/`, `archive/barberkas-aaas-bundle/` |
| **Quality gate** | ✅ PASSED — 56 dokumen terdaftar & tervalidasi ([tools/validate_docs.py](tools/validate_docs.py)) |
| **Repo produk** | https://github.com/Sparkmind-obp-off/Barberkas-foundry |
| **Production** | https://barberkas-aaas.pages.dev · https://barberkas-foundry.biz.id |

---

## Mulai dari sini

1. **[canonical/00-INDEX.md](canonical/00-INDEX.md)** — peta lengkap seluruh dokumen canonical.
2. **[MANIFEST.md](MANIFEST.md)** — registry resmi: ownership, tipe, status, parent tiap dokumen.
3. **[canonical/99-schema/994-knowledge-graph.md](canonical/99-schema/994-knowledge-graph.md)** — peta hubungan antar dokumen (value chain, adjacency, dependency).
4. **[migration/MIGRATION-MAP.md](migration/MIGRATION-MAP.md)** — pemetaan dokumen legacy → v2/v3.

## Struktur repository

```
canonical/
├── 00-INDEX.md              # Peta dokumen + aturan navigasi
├── 00-foundation/           # Charter, glossary, governance, doc policy, decision framework
├── 01-brand/                # Brand architecture, positioning, messaging
├── 02-product/              # Product brief, ICP, feature matrix, packaging
├── 03-architecture/         # System overview, data architecture, ADR (6 keputusan)
├── 04-engineering/          # Engineering standards, testing gates, API standards
├── 05-security/             # Security baseline, risk register, privacy
├── 06-operations/           # SLO, runbooks, incident & DR
├── 07-ai/                   # AI agents policy, Session OS, skill standard
├── 08-commercial/           # GTM, pricing catalog, evidence ledger
├── 09-governance/           # Roadmap, gates, DoR/DoD, workflows,
│                            #   capability map (G-095), RACI (G-096), risk/compliance (G-097)
├── 10-rfc/                  # RFC layer — usulan sebelum keputusan
└── 99-schema/               # Docs-as-Code: document schema, metadata, taxonomy,
                             #   lifecycle, knowledge graph, numbering
migration/                   # Audit report v2 + migration map (frozen)
archive/                     # SELURUH dokumen legacy (read-only, referensi)
tools/                       # validate_docs.py (quality gate) + tools/ci/ (CI workflow)
MANIFEST.md                  # Registry resmi seluruh dokumen
CHANGELOG.md                 # Riwayat versi repo
```

## Docs-as-Code (baru di v3)

1. **Metadata wajib** — setiap dokumen canonical punya YAML front-matter
   ([Q-991](canonical/99-schema/991-metadata-schema.md)): id, title, version, status,
   owner, reviewers, classification, type, last_updated, next_review, parent, related_docs.
2. **Registry wajib** — dokumen yang tidak terdaftar di [MANIFEST](MANIFEST.md) = orphan
   → **gagal quality gate**.
3. **Quality gate** — jalankan lokal:
   ```bash
   python3 tools/validate_docs.py
   ```
   8 pemeriksaan: front-matter, ID unik, orphan/dangling, broken link, H1 tunggal,
   integritas parent/related. CI: [tools/ci/docs-quality.yml](tools/ci/docs-quality.yml)
   (aktifkan dengan menyalin ke `.github/workflows/`).
4. **Perubahan besar lewat RFC** — [canonical/10-rfc/](canonical/10-rfc/RFC-INDEX.md);
   keputusan arsitektural → ADR; alur lengkap di
   [G-094 Workflows](canonical/09-governance/094-docs-governance-workflows.md).
5. **Lifecycle** — `Draft → Review → Approved → Deprecated → Archived`
   ([Q-993](canonical/99-schema/993-lifecycle.md)).

## Aturan inti (non-negotiable)

1. **Repository ini adalah satu-satunya sumber kebenaran.** Dokumen di `archive/` bersifat
   read-only referensi sejarah; jika konflik, **canonical menang**.
2. **Aturan bukti (Truth-Lock):** setiap klaim status diberi label
   `VERIFIED` / `INFERRED` / `NOT VERIFIED`. Marketing **tidak boleh** menjadi sumber
   kebenaran status fitur.
3. **Source-of-truth hierarchy:** telemetry produksi & payment records → automated tests/CI →
   source code + migrations + infra config → OpenAPI contract → product spec/runbook →
   website/README/marketing copy.
4. **Setiap dokumen wajib bermetadata & terdaftar di MANIFEST** — dipaksa oleh validator.
5. **Perubahan signifikan wajib RFC/ADR** sesuai [G-094](canonical/09-governance/094-docs-governance-workflows.md).

## Governance enterprise (baru di v3)

| Pertanyaan | Dokumen |
|---|---|
| Kapabilitas apa yang kita punya & maturity-nya? | [G-095 Capability Map](canonical/09-governance/095-capability-map-operating-model.md) |
| Siapa bertanggung jawab atas apa? | [G-096 RACI & Stakeholder](canonical/09-governance/096-responsibility-stakeholder-matrix.md) |
| Risiko & kewajiban compliance kita apa? | [G-097 Risk & Compliance](canonical/09-governance/097-risk-compliance-matrix.md) (render dari [S-051](canonical/05-security/051-risk-register.md)) |
| Kapan boleh launch berbayar / klaim enterprise? | [G-091 Production Gate](canonical/09-governance/091-production-gate.md) · [G-092 Enterprise Gate](canonical/09-governance/092-enterprise-gate.md) |

## Status produk (jujur)

- **Pilot-grade (skor audit 1.9/5)** — layak pilot berbayar terkontrol 3–10 barbershop,
  **belum** self-serve SaaS massal, **belum** enterprise-grade.
- 8 risiko zona merah terbuka ([G-097 §2](canonical/09-governance/097-risk-compliance-matrix.md))
  memblokir Production Gate; **dokumentasinya** enterprise-grade, produknya belum.

## Changelog

Lihat [CHANGELOG.md](CHANGELOG.md) — v3.0.0 mencakup Hardening Phase H1–H5 penuh.
