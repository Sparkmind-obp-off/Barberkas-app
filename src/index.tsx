/**
 * barberkas-app — entry point
 *
 * R1a scope: request-id middleware + envelope + GET /health only.
 * Auth (Clerk, fail-closed per ADR-001) and tenant middleware land in R1b.
 *
 * CORS: NOT enabled generically on /api/* — E-042 §3 requires explicit origin
 * allowlist; it will be added together with the first browser-facing API in R1b+.
 */
import { Hono } from 'hono'
import type { AppContext } from './types'
import { requestId } from './middleware/request-id'
import { health } from './routes/health'
import { services } from './routes/services'
import { reports, sales } from './routes/sales'
import { fail } from './lib/response'

const app = new Hono<AppContext>()

// request_id first — everything downstream must have it (E-042 §2.2)
app.use('*', requestId)

// Public health check (no auth by design)
app.route('/health', health)

// Single-user cashier MVP API (no auth by design for dogfood phase)
app.route('/api/v1/services', services)
app.route('/api/v1/sales', sales)
app.route('/api/v1/reports', reports)

// Normalized 404 / error envelopes — no internals leaked (E-042 §2.2)
app.notFound((c) => fail(c, 404, 'NOT_FOUND', 'Resource not found'))
app.onError((err, c) => {
  console.error(`[${c.get('requestId')}]`, err)
  return fail(c, 500, 'INTERNAL_ERROR', 'Internal server error')
})

export default app
