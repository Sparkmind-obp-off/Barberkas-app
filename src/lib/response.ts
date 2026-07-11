/**
 * Response envelope — E-042 §2.2 (API Standards, normalized response & error shape)
 *
 * Success: { ok: true,  data: {...}, meta: { request_id } }
 * Error:   { ok: false, error: { code, message, request_id } }
 *
 * Rules:
 * - request_id present end-to-end (OPS-01 log correlation).
 * - Error codes stable UPPER_SNAKE; never leak internals/stack/secrets.
 * - HTTP status mapping per E-042: 400 validation, 401 unauth, 403 tenant/role,
 *   404, 409 conflict/idempotency, 422 semantic, 429 rate limit, 5xx internal.
 */
import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import type { AppContext, ErrorCode } from '../types'

export type SuccessEnvelope<T> = {
  ok: true
  data: T
  meta: { request_id: string } & Record<string, unknown>
}

export type ErrorEnvelope = {
  ok: false
  error: { code: ErrorCode; message: string; request_id: string }
}

/** E-042 §2.2 — success envelope. Extra meta (e.g. next_cursor) via `meta` arg. */
export function ok<T>(
  c: Context<AppContext>,
  data: T,
  meta: Record<string, unknown> = {},
  status: ContentfulStatusCode = 200
) {
  const body: SuccessEnvelope<T> = {
    ok: true,
    data,
    meta: { request_id: c.get('requestId'), ...meta }
  }
  return c.json(body, status)
}

/** E-042 §2.2 — error envelope. `message` must be safe for external eyes. */
export function fail(
  c: Context<AppContext>,
  status: ContentfulStatusCode,
  code: ErrorCode,
  message: string
) {
  const body: ErrorEnvelope = {
    ok: false,
    error: { code, message, request_id: c.get('requestId') }
  }
  return c.json(body, status)
}
