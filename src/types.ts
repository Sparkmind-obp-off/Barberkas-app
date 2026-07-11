/**
 * Shared type definitions — barberkas-app
 *
 * Bindings: Cloudflare env bindings (D1, vars, secrets).
 * Variables: per-request Hono context variables.
 */

export type AppEnv = 'production' | 'preview' | 'development'

export type Bindings = {
  DB: D1Database
  /** ADR-001: 'production' → auth fail-closed. Set in wrangler.jsonc vars. */
  APP_ENV: AppEnv
  /** Clerk (wired in R1b — stored as Pages secrets, not committed) */
  CLERK_SECRET_KEY?: string
  CLERK_PUBLISHABLE_KEY?: string
  CLERK_ISSUER?: string
}

export type Variables = {
  /** E-042 §2.2: request_id wajib end-to-end (log correlation, OPS-01) */
  requestId: string
}

export type AppContext = {
  Bindings: Bindings
  Variables: Variables
}

/** Stable error codes — UPPER_SNAKE, never leak internals (E-042 §2.2) */
export type ErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'TENANT_FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'UNPROCESSABLE'
  | 'RATE_LIMITED'
  | 'AUTH_CONFIG_MISSING'
  | 'INTERNAL_ERROR'
