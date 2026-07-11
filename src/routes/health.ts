/**
 * Health check — GET /health
 *
 * Public, no auth (R1a checkpoint; same pattern as v1 audit).
 * Reports app env + D1 reachability. Never leaks internals on failure.
 */
import { Hono } from 'hono'
import type { AppContext } from '../types'
import { ok } from '../lib/response'

export const health = new Hono<AppContext>()

health.get('/', async (c) => {
  let db: 'up' | 'down' = 'down'
  try {
    await c.env.DB.prepare('SELECT 1').first()
    db = 'up'
  } catch {
    db = 'down'
  }

  return ok(c, {
    status: 'ok',
    env: c.env.APP_ENV ?? 'unknown',
    db,
    ts: new Date().toISOString()
  })
})
