---
id: AI-070
title: AI Agents Policy
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: policy
last_updated: 2026-07-10
next_review: 2026-10-08
parent: A-030
related_docs: []
---
# AI-070 — AI Agents Policy

| Field | Value |
|---|---|
| **ID** | AI-070 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Product + Engineering |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | [P-022 Feature Matrix](../02-product/022-feature-matrix.md), [S-052 Privacy](../05-security/052-privacy-and-data-protection.md), [AI-072 Skill Authoring](072-skill-authoring-standard.md) |

## 1. Agent yang ada (VERIFIED code, audit v1 §5)

| Agent | Fungsi | Status |
|---|---|---|
| **AI Stylist** | Rekomendasi gaya/layanan | VERIFIED code — kualitas belum dievaluasi |
| **AI Marketing** | Draft konten promosi | VERIFIED code — idem |
| **AI Receptionist** | Balasan WA (booking, tanya harga) | VERIFIED code — outbound tergantung paket Fonnte |

**Keputusan mengikat (audit v1 §11):** enam agent tambahan **DEFERRED** sampai
activation/retention produk inti terbukti. Jangan menambah agent baru tanpa melewati
[F-004 Decision Framework](../00-foundation/004-decision-framework.md).

## 2. Aturan evaluasi (target — belum ada, harus dibangun)

1. **Golden dataset** per agent: input representatif + expected behavior; dijalankan di CI
   (E-041) dan setiap ganti model/prompt.
2. Metrik minimum: correctness/helpfulness (rubric), latency p95, cost per call,
   fallback rate.
3. Ganti model/prompt signifikan = perubahan berisiko → PR + hasil eval sebelum deploy.
4. Prinsip trace→verify→promote dari eval-loop legacy (R6-3) diadopsi sebagai arah:
   run dicatat, diverifikasi, pola yang lulus dipromosikan jadi playbook. Implementasi
   penuh menunggu prioritas roadmap (61–90 hari item 7).

## 3. Safety & guardrails

- **Scope terkunci:** agent hanya menjawab domain barbershop tenant; di luar itu → fallback
  sopan + eskalasi ke manusia.
- **No hallucinated commitments:** agent tidak boleh menjanjikan harga/slot/refund yang
  tidak berasal dari data tenant. Jawaban harga/booking harus dari DB, bukan generasi bebas.
- **Disclosure:** pelanggan tahu sedang berinteraksi dengan asisten otomatis (S-052 §4).
- **PII:** isi percakapan tunduk retensi S-052; tidak dipakai untuk training lintas tenant.
- **Human handoff:** keyword eskalasi (komplain, refund, marah) → tandai untuk owner/staff.

## 4. Cost caps (credit-aware, mengikat)

1. **Per-tenant monthly cap** AI call sesuai paket ([P-023](../02-product/023-packaging-and-pricing.md));
   melewati cap → degradasi jelas (bukan silent fail) + opsi overage.
2. **Per-request budget:** token limit input/output; truncation policy terdokumentasi.
3. LLM cost per tenant terlihat di dashboard ops (O-060 §5) — guardrail COGS
   ([G-090](../09-governance/090-roadmap.md)).
4. Rate limit AI surface adalah bagian ABUSE-01 (S-051).

## 5. Model & provider

- Provider saat ini: Groq dkk. (VERIFIED code). Abstraksi provider dipertahankan agar
  bisa ganti model tanpa rewrite.
- Pemilihan model = keputusan biaya+kualitas; perubahan dicatat (ADR bila berdampak arsitektur).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Konsolidasi audit v1 §5/§11 + arah eval-loop R6-3 + guardrail cost credit-aware |
