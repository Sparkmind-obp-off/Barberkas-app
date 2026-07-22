import { Hono } from 'hono'
import type { AppContext } from '../types'
import { fail, ok } from '../lib/response'

type JsonRecord = Record<string, unknown>

type ServiceSnapshot = {
  id: string
  name: string
  price_idr: number
}

type SaleRow = {
  id: string
  capster_name: string | null
  note: string | null
  status: 'completed' | 'void'
  total_idr: number
  created_at: string
}

type SaleItemRow = {
  id: string
  sale_id: string
  service_id: string | null
  service_name: string
  price_idr: number
  created_at: string
}

type DailySummaryRow = {
  total_idr: number
  transaction_count: number
}

type ServiceSummaryRow = {
  name: string
  count: number
  subtotal_idr: number
}

export const sales = new Hono<AppContext>()
export const reports = new Hono<AppContext>()

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

function readOptionalText(value: unknown, maxLength: number): string | null | undefined {
  if (value === undefined || value === null) return null
  if (typeof value !== 'string') return undefined
  const text = value.trim()
  if (text.length > maxLength) return undefined
  return text || null
}

function readDate(value: string | undefined): string | null {
  if (!value) return new Date().toISOString().slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null

  const date = new Date(`${value}T00:00:00.000Z`)
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value
    ? null
    : value
}

sales.post('/', async (c) => {
  const body = await readJson(c)
  if (!body) return fail(c, 400, 'BAD_REQUEST', 'Request body must be valid JSON')

  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 50) {
    return fail(c, 422, 'UNPROCESSABLE', 'items must contain between 1 and 50 services')
  }

  const serviceIds: string[] = []
  for (const item of body.items) {
    if (!isJsonRecord(item) || typeof item.service_id !== 'string' || !item.service_id) {
      return fail(c, 422, 'UNPROCESSABLE', 'Each item must contain a service_id')
    }
    serviceIds.push(item.service_id)
  }

  const capsterName = readOptionalText(body.capster_name, 80)
  const note = readOptionalText(body.note, 500)
  if (capsterName === undefined || note === undefined) {
    return fail(c, 422, 'UNPROCESSABLE', 'capster_name or note is invalid or too long')
  }

  const uniqueServiceIds = [...new Set(serviceIds)]
  const placeholders = uniqueServiceIds.map(() => '?').join(', ')
  const serviceResult = await c.env.DB.prepare(
    `SELECT id, name, price_idr FROM services
     WHERE is_active = 1 AND id IN (${placeholders})`
  ).bind(...uniqueServiceIds).all<ServiceSnapshot>()

  const serviceById = new Map(serviceResult.results.map((service) => [service.id, service]))
  if (serviceById.size !== uniqueServiceIds.length) {
    return fail(c, 422, 'UNPROCESSABLE', 'One or more services are missing or inactive')
  }

  const selectedServices = serviceIds.map((id) => serviceById.get(id)!)
  const totalIdr = selectedServices.reduce((total, service) => total + service.price_idr, 0)
  if (!Number.isSafeInteger(totalIdr)) {
    return fail(c, 422, 'UNPROCESSABLE', 'Transaction total is too large')
  }

  const saleId = crypto.randomUUID()
  const itemRows = selectedServices.map((service) => ({
    id: crypto.randomUUID(),
    sale_id: saleId,
    service_id: service.id,
    service_name: service.name,
    price_idr: service.price_idr
  }))

  const statements = [
    c.env.DB.prepare(
      `INSERT INTO sales (id, capster_name, note, total_idr)
       VALUES (?, ?, ?, ?)`
    ).bind(saleId, capsterName, note, totalIdr),
    ...itemRows.map((item) =>
      c.env.DB.prepare(
        `INSERT INTO sale_items (id, sale_id, service_id, service_name, price_idr)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(item.id, item.sale_id, item.service_id, item.service_name, item.price_idr)
    )
  ]
  await c.env.DB.batch(statements)

  const created = await c.env.DB.prepare(
    `SELECT id, capster_name, note, status, total_idr, created_at
     FROM sales WHERE id = ?`
  ).bind(saleId).first<SaleRow>()

  return ok(c, { ...created!, items: itemRows }, {}, 201)
})

sales.get('/', async (c) => {
  const date = readDate(c.req.query('date'))
  if (!date) return fail(c, 400, 'BAD_REQUEST', 'date must use YYYY-MM-DD format')

  const saleResult = await c.env.DB.prepare(
    `SELECT id, capster_name, note, status, total_idr, created_at
     FROM sales
     WHERE substr(created_at, 1, 10) = ?
     ORDER BY created_at DESC`
  ).bind(date).all<SaleRow>()

  if (saleResult.results.length === 0) return ok(c, [])

  const saleIds = saleResult.results.map((sale) => sale.id)
  const placeholders = saleIds.map(() => '?').join(', ')
  const itemResult = await c.env.DB.prepare(
    `SELECT id, sale_id, service_id, service_name, price_idr, created_at
     FROM sale_items
     WHERE sale_id IN (${placeholders})
     ORDER BY created_at ASC`
  ).bind(...saleIds).all<SaleItemRow>()

  const itemsBySale = new Map<string, SaleItemRow[]>()
  for (const item of itemResult.results) {
    const items = itemsBySale.get(item.sale_id) ?? []
    items.push(item)
    itemsBySale.set(item.sale_id, items)
  }

  return ok(c, saleResult.results.map((sale) => ({
    ...sale,
    items: itemsBySale.get(sale.id) ?? []
  })))
})

sales.post('/:id/void', async (c) => {
  const id = c.req.param('id')
  const existing = await c.env.DB.prepare('SELECT status FROM sales WHERE id = ?')
    .bind(id)
    .first<{ status: 'completed' | 'void' }>()

  if (!existing) return fail(c, 404, 'NOT_FOUND', 'Sale not found')
  if (existing.status === 'void') return fail(c, 409, 'CONFLICT', 'Sale is already void')

  await c.env.DB.prepare("UPDATE sales SET status = 'void' WHERE id = ?").bind(id).run()
  return ok(c, { id, status: 'void' as const })
})

reports.get('/daily', async (c) => {
  const date = readDate(c.req.query('date'))
  if (!date) return fail(c, 400, 'BAD_REQUEST', 'date must use YYYY-MM-DD format')

  const summary = await c.env.DB.prepare(
    `SELECT COALESCE(SUM(total_idr), 0) AS total_idr,
            COUNT(*) AS transaction_count
     FROM sales
     WHERE status = 'completed' AND substr(created_at, 1, 10) = ?`
  ).bind(date).first<DailySummaryRow>()

  const byService = await c.env.DB.prepare(
    `SELECT sale_items.service_name AS name,
            COUNT(*) AS count,
            SUM(sale_items.price_idr) AS subtotal_idr
     FROM sale_items
     INNER JOIN sales ON sales.id = sale_items.sale_id
     WHERE sales.status = 'completed' AND substr(sales.created_at, 1, 10) = ?
     GROUP BY sale_items.service_name
     ORDER BY subtotal_idr DESC, name COLLATE NOCASE ASC`
  ).bind(date).all<ServiceSummaryRow>()

  return ok(c, {
    total_idr: summary?.total_idr ?? 0,
    transaction_count: summary?.transaction_count ?? 0,
    by_service: byService.results
  })
})
