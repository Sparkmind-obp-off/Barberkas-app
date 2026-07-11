---
id: Q-994
title: Knowledge Graph
version: 3.0.0
status: approved
owner: Founder
reviewers: [Founder]
classification: internal
type: index
last_updated: 2026-07-10
next_review: 2026-10-08
parent: Q-990
related_docs: [SSOT-MANIFEST, Q-991, G-095]
---
# Q-994 — Knowledge Graph

| Field | Value |
|---|---|
| **ID** | Q-994 |
| **Version** | 3.0.0 |
| **Status** | Approved |
| **Owner** | Founder / Product |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **Type** | Index |
| **References** | [SSOT-MANIFEST](../../MANIFEST.md), [Q-991 Metadata Schema](991-metadata-schema.md), [00-INDEX](../00-INDEX.md) |

> Peta hubungan antar dokumen: setiap dokumen tahu **parent**, **children**, dan
> **dependencies**-nya. Sumber data: field `parent` & `related_docs` di front-matter
> ([Q-991](991-metadata-schema.md)); halaman ini adalah render human-readable-nya.

## 1. Rantai nilai utama (value chain)

```
Vision / Charter (F-000)
        ↓
   Governance (F-002) ── Doc Policy (F-003) ── Schema (Q-99x)
        ↓
     Brand (B-010 → B-011)
        ↓
    Product (P-020 → P-021 / P-022 / P-023)
        ↓
 Architecture (A-030 → A-031, ADR-001..006)
        ↓
 Engineering (E-040 → E-041 / E-042)
        ↓
   Security (S-050 → S-051 / S-052)
        ↓
 Operations (O-060 → O-061 / O-062)      AI (AI-070 → AI-071 / AI-072)
        ↓
 Commercial (C-080 → C-081 / C-082)
        ↓
 Governance Gates (G-090 → G-091 / G-092 / G-093)
        ↓
 Operating Model (G-095 → G-096 / G-097)
```

## 2. Adjacency table (parent → children)

| Parent | Children |
|---|---|
| F-000 Charter | F-001, F-002, B-010, G-090, G-095, SSOT-00-INDEX, SSOT-MANIFEST, MIG-MAP, MIG-AUDIT |
| F-002 Governance | F-003, F-004 |
| F-003 Doc Policy | Q-990 |
| Q-990 Document Schema | Q-991, Q-992, Q-993, Q-994, Q-995 |
| B-010 Brand Architecture | B-011, P-020 |
| P-020 Product Brief | P-021, P-022, P-023, A-030, C-080 |
| A-030 System Overview | A-031, ADR-INDEX, E-040, S-050, AI-070 |
| ADR-INDEX | ADR-001..ADR-006 |
| E-040 Engineering Standards | E-041, E-042, O-060 |
| S-050 Security Baseline | S-051, S-052 |
| O-060 SLO & Observability | O-061, O-062 |
| AI-070 AI Agents Policy | AI-071, AI-072 |
| C-080 GTM Strategy | C-081, C-082 |
| G-090 Roadmap | G-091, G-092, G-093 |
| G-095 Capability Map | G-096, G-097 |

## 3. Cross-dependencies penting (non-hirarki)

| Dari | Ke | Alasan |
|---|---|---|
| C-082 Evidence Ledger | P-022 Feature Matrix | Klaim publik hanya boleh dari fitur VERIFIED |
| G-091 Production Gate | S-051 Risk Register | Gate menutup risiko P0/P1 |
| G-092 Enterprise Gate | O-062 Backup & DR | DR drill = syarat enterprise |
| O-061 Runbooks | S-050 Security Baseline | Incident response mengikuti baseline |
| AI-070 AI Policy | S-052 Privacy | Data pelanggan dalam konteks AI |
| C-081 Pricing Catalog | P-023 Packaging | Harga harus konsisten dengan entitlement |
| E-041 Testing Gates | G-093 DoR/DoD | DoD memuat quality gate |
| G-096 Responsibility Matrix | G-095 Capability Map | RACI dirender per capability C1.x–C5.x |
| G-097 Risk & Compliance Matrix | S-051 Risk Register | Heatmap dirender dari register (S-051 = SSOT) |
| G-097 Risk & Compliance Matrix | G-092 Enterprise Gate | Non-compliance K1–K5 memblokir gate |

## 4. Aturan graph

1. Setiap dokumen (kecuali F-000 root) wajib punya **tepat satu parent**.
2. Dependency lintas-layer dicatat di `related_docs`, bukan `parent`.
3. Menghapus/mengarsipkan dokumen dengan children → children wajib re-parent dulu.
4. Validator memeriksa: node tanpa parent (orphan), edge ke ID yang tidak ada (dangling).

## Version history

| Version | Date | Change |
|---|---|---|
| 3.0.0 | 2026-07-10 | Dokumen baru — Hardening Phase 1/4: knowledge graph penuh + aturan |
| 3.0.0 | 2026-07-10 | Hardening Phase 4: node G-095/G-096/G-097 + edges; status Draft → Approved |
