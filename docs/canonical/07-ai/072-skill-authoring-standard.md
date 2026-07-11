---
id: AI-072
title: Skill Authoring Standard
version: 2.0.0
status: approved
owner: Engineering
reviewers: [Founder]
classification: internal
type: standard
last_updated: 2026-07-10
next_review: 2026-10-08
parent: AI-070
related_docs: []
---
# AI-072 — Skill Authoring Standard

| Field | Value |
|---|---|
| **ID** | AI-072 |
| **Version** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Engineering |
| **Created** | 2026-07-10 |
| **Updated** | 2026-07-10 |
| **Classification** | Internal |
| **References** | Legacy SKILL-AUTHORING-STANDARD (archive/ssot/), [AI-071 Session OS](071-session-os.md), [AI-070 AI Agents Policy](070-ai-agents-policy.md) |

> Penerus resmi `archive/ssot/SKILL-AUTHORING-STANDARD.md` (R6-1). Pola diadopsi dari
> ECC (MIT, dengan atribusi) dan di-adaptasi Indonesia-first. Dokumen ini merangkum
> aturan mengikat; contoh lengkap tetap di archive.

## 1. Tujuan

Satu standar tunggal agar setiap skill internal (`skills/<nama>/`):
1. **Boot konsisten** — agent memilih & memuat skill tanpa ambiguitas.
2. **Truth-Lock-native** — skill yang bergantung API eksternal menandai dirinya *drift-prone*.
3. **Outcome-first** — skill menyatakan OUTCOME yang dihasilkan, bukan sekadar kapabilitas.
4. **Aman by-design** — skill menandai gate HITL & kompatibilitas edge Cloudflare.

## 2. Struktur folder kanonik

```
skills/<nama-skill>/
├── SKILL.md            # WAJIB — definisi utama (frontmatter + body)
├── references/         # OPSIONAL — knowledge mendalam, dimuat progresif
├── examples/           # OPSIONAL — contoh konkret
└── scripts/            # OPSIONAL — script pendukung (idempoten, no-secret)
```

**Aturan emas:**
- `SKILL.md` ringkas & dapat dieksekusi; knowledge panjang → `references/` (hemat context/credit).
- `references/` dimuat hanya saat relevan.
- **Tidak ada secret di file mana pun** — secret hidup di secret store.

## 3. Frontmatter wajib (YAML)

```yaml
---
name: <nama-skill>                # = nama folder, kebab-case
version: <semver>
description: >-                   # "Use when… / Dipakai saat…" — kalimat trigger jelas
  ...
outcome: >-                       # hasil konkret yang didapat (bukan fitur)
  ...
metadata:
  skill_category: "<kategori>"
  cloudflare-native: true|false   # jalan di edge CF tanpa runtime luar?
  drift-prone: true|false         # bergantung API eksternal yang bisa berubah?
  hitl-gate: "none|secrets|schema|payment|legal|domain"
---
```

Skill tanpa frontmatter lengkap = tidak valid dan tidak boleh dimuat.

## 4. Aturan body SKILL.md

1. Mulai dengan **kapan dipakai** (trigger) dan **outcome**.
2. Langkah eksekusi numerik, dapat diverifikasi per langkah.
3. Tandai langkah yang butuh HITL gate secara eksplisit.
4. Sebutkan dependensi skill lain dengan nama folder (bukan deskripsi kabur).
5. Bila drift-prone: sertakan cara memverifikasi API masih sesuai (health check ringan).

## 5. Lifecycle & kualitas

- Versi semver; perubahan breaking = major bump + catatan migrasi.
- Skill usang di-*deprecate* dengan pointer pengganti — jangan dihapus diam-diam.
- Review skill = review dokumen (F-003 Documentation Policy berlaku).

## Change History

| Version | Date | Change |
|---|---|---|
| 2.0.0 | 2026-07-10 | Ringkasan mengikat dari SKILL-AUTHORING-STANDARD R6-1; disederhanakan untuk konteks BarberKas v2 |
