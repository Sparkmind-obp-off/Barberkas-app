-- Migration 0002 — single-user cashier MVP
-- Intentionally independent from tenant-scoped tables in migration 0001.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS services (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 80),
  price_idr   INTEGER NOT NULL CHECK (price_idr >= 0),
  is_active   INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS sales (
  id            TEXT PRIMARY KEY,
  capster_name  TEXT,
  note          TEXT,
  status        TEXT NOT NULL DEFAULT 'completed'
                CHECK (status IN ('completed', 'void')),
  total_idr     INTEGER NOT NULL CHECK (total_idr >= 0),
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS sale_items (
  id            TEXT PRIMARY KEY,
  sale_id       TEXT NOT NULL REFERENCES sales (id) ON DELETE CASCADE,
  service_id    TEXT REFERENCES services (id) ON DELETE SET NULL,
  service_name  TEXT NOT NULL,
  price_idr     INTEGER NOT NULL CHECK (price_idr >= 0),
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_services_active ON services (is_active);
CREATE INDEX IF NOT EXISTS idx_sales_created_at ON sales (created_at);
CREATE INDEX IF NOT EXISTS idx_sale_items_sale_id ON sale_items (sale_id);
