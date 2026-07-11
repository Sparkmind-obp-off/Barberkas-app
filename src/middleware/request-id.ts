/**
 * Request ID middleware — E-042 §2.2 / OPS-01
 *
 * Every request gets a request_id:
 * - Honors inbound `X-Request-Id` if it looks sane (allowlisted charset, bounded
 *   length) so upstream correlation survives; otherwise generates a new UUID.
 * - Exposes it on context (`c.get('requestId')`) and echoes it back in the
 *   `X-Request-Id` response header.
 */
import { createMiddleware } from 'hono/factory'
import type { AppContext } from '../types'

const SAFE_ID = /^[A-Za-z0-9_-]{8,64}$/

export const requestId = createMiddleware<AppContext>(async (c, next) => {
  const inbound = c.req.header('X-Request-Id')
  const id = inbound && SAFE_ID.test(inbound) ? inbound : crypto.randomUUID()

  c.set('requestId', id)
  await next()
  c.header('X-Request-Id', id)
})
