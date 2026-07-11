-- Migration 0001 — tenants, tenant_members, audit_log
-- Per A-031 binding rules + ADR-006 (explicit admin bootstrap, auditable):
--   * FK constraints from day one (no comment-only relations — old gap DATA-01)
--   * CHECK constraints on status/role values (no free-text enums)
--   * tenant_id + index on every tenant-scoped table
--   * audit_log is append-only (no UPDATE/DELETE path in app code)

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------------------
-- tenants
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tenants (
  id          TEXT PRIMARY KEY,                     -- uuid, app-generated
  name        TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 120),
  slug        TEXT NOT NULL UNIQUE CHECK (slug GLOB '[a-z0-9-]*' AND length(slug) BETWEEN 3 AND 63),
  -- Clerk organization id (nullable until Clerk wiring in R1b)
  clerk_org_id TEXT UNIQUE,
  status      TEXT NOT NULL DEFAULT 'active'
              CHECK (status IN ('active', 'suspended', 'deleted')),
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants (status);
CREATE INDEX IF NOT EXISTS idx_tenants_clerk_org_id ON tenants (clerk_org_id);

-- ---------------------------------------------------------------------------
-- tenant_members
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tenant_members (
  id            TEXT PRIMARY KEY,                   -- uuid, app-generated
  tenant_id     TEXT NOT NULL REFERENCES tenants (id) ON DELETE CASCADE,
  -- Clerk user id ('user_...'); the only identity source (no local passwords)
  clerk_user_id TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'staff'
                CHECK (role IN ('owner', 'admin', 'staff')),
  status        TEXT NOT NULL DEFAULT 'active'
                CHECK (status IN ('active', 'invited', 'suspended', 'removed')),
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (tenant_id, clerk_user_id)
);

CREATE INDEX IF NOT EXISTS idx_tenant_members_tenant_id ON tenant_members (tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_members_clerk_user_id ON tenant_members (clerk_user_id);

-- ---------------------------------------------------------------------------
-- audit_log (append-only ledger — A-031 rule 3; ADR-006 bootstrap events land here)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_log (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  -- nullable: system-level events (e.g. admin bootstrap) may precede a tenant
  tenant_id   TEXT REFERENCES tenants (id) ON DELETE SET NULL,
  actor_type  TEXT NOT NULL
              CHECK (actor_type IN ('user', 'system', 'webhook', 'bootstrap')),
  -- clerk_user_id for 'user', identifier or NULL otherwise
  actor_id    TEXT,
  action      TEXT NOT NULL CHECK (length(action) BETWEEN 1 AND 120),
  -- JSON payload (validated in app layer); never store secrets/PII beyond need
  detail      TEXT,
  request_id  TEXT,                                 -- E-042 correlation
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_log_tenant_id ON audit_log (tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log (action);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log (created_at);
