import { Hono } from 'hono'
import type { AppContext } from '../types'
import { fail, ok } from '../lib/response'

type ServiceRow = {
  id: string
  name: string
  price_idr: number
  is_active: number
  created_at: string
  updated_at: string
}

type JsonRecord = Record<string, unknown>

export const services = new Hono<AppContext>()

function isJsonRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

async function readJson(c: Parameters<typeof fail>[0]): Promise<JsonRecord | null> {
  try {
    const body: unknown = await c.req.json()
    return isJsonRecord(body) ? body : null
  } catch {
    return null
  }
}

function readName(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const name = value.trim()
  return name.length >= 1 && name.length <= 80 ? name : null
}

function readPrice(value: unknown): number | null {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
    ? value
    : null
}

function serializeService(row: ServiceRow) {
  return {
    ...row,
    is_active: row.is_active === 1
  }
}

services.get('/', async (c) => {
  const result = await c.env.DB.prepare(
    `SELECT id, name, price_idr, is_active, created_at, updated_at
     FROM services
     WHERE is_active = 1
     ORDER BY name COLLATE NOCASE ASC`
  ).all<ServiceRow>()

  return ok(c, result.results.map(serializeService))
})

services.post('/', async (c) => {
  const body = await readJson(c)
  if (!body) return fail(c, 400, 'BAD_REQUEST', 'Request body must be valid JSON')

  const name = readName(body.name)
  const priceIdr = readPrice(body.price_idr)
  if (!name || priceIdr === null) {
    return fail(c, 422, 'UNPROCESSABLE', 'Name and non-negative integer price_idr are required')
  }

  const id = crypto.randomUUID()
  await c.env.DB.prepare(
    'INSERT INTO services (id, name, price_idr) VALUES (?, ?, ?)'
  ).bind(id, name, priceIdr).run()

  const created = await c.env.DB.prepare(
    `SELECT id, name, price_idr, is_active, created_at, updated_at
     FROM services WHERE id = ?`
  ).bind(id).first<ServiceRow>()

  return ok(c, serializeService(created!), {}, 201)
})

services.patch('/:id', async (c) => {
  const body = await readJson(c)
  if (!body) return fail(c, 400, 'BAD_REQUEST', 'Request body must be valid JSON')

  const updates: string[] = []
  const values: Array<string | number> = []

  if ('name' in body) {
    const name = readName(body.name)
    if (!name) return fail(c, 422, 'UNPROCESSABLE', 'Name must contain 1 to 80 characters')
    updates.push('name = ?')
    values.push(name)
  }

  if ('price_idr' in body) {
    const priceIdr = readPrice(body.price_idr)
    if (priceIdr === null) {
      return fail(c, 422, 'UNPROCESSABLE', 'price_idr must be a non-negative integer')
    }
    updates.push('price_idr = ?')
    values.push(priceIdr)
  }

  if ('is_active' in body) {
    if (typeof body.is_active !== 'boolean') {
      return fail(c, 422, 'UNPROCESSABLE', 'is_active must be a boolean')
    }
    updates.push('is_active = ?')
    values.push(body.is_active ? 1 : 0)
  }

  if (updates.length === 0) {
    return fail(c, 400, 'BAD_REQUEST', 'At least one editable field is required')
  }

  const id = c.req.param('id')
  const existing = await c.env.DB.prepare('SELECT id FROM services WHERE id = ?')
    .bind(id)
    .first<{ id: string }>()
  if (!existing) return fail(c, 404, 'NOT_FOUND', 'Service not found')

  updates.push("updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')")
  await c.env.DB.prepare(`UPDATE services SET ${updates.join(', ')} WHERE id = ?`)
    .bind(...values, id)
    .run()

  const updated = await c.env.DB.prepare(
    `SELECT id, name, price_idr, is_active, created_at, updated_at
     FROM services WHERE id = ?`
  ).bind(id).first<ServiceRow>()

  return ok(c, serializeService(updated!))
})
