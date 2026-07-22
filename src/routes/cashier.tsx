import { Hono } from 'hono'
import type { Child } from 'hono/jsx'
import type { AppContext } from '../types'

export const cashier = new Hono<AppContext>()

type LayoutProps = {
  title: string
  page: 'cashier' | 'services'
  children: Child
}

function Layout({ title, page, children }: LayoutProps) {
  return (
    <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#102a43" />
        <title>{title} · BarberKas</title>
        <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="/static/cashier.css" />
      </head>
      <body data-page={page}>
        <header class="app-header">
          <a class="brand" href="/kasir" aria-label="BarberKas beranda kasir">
            <span class="brand-mark" aria-hidden="true">BK</span>
            <span>
              <strong>BarberKas</strong>
              <small>Kasir harian</small>
            </span>
          </a>
          <nav aria-label="Navigasi kasir">
            <a class={page === 'cashier' ? 'active' : ''} href="/kasir">Kasir</a>
            <a class={page === 'services' ? 'active' : ''} href="/kasir/layanan">Layanan</a>
          </nav>
        </header>
        {children}
        <div id="toast" class="toast" role="status" aria-live="polite"></div>
        <script src="/static/cashier.js" defer></script>
      </body>
    </html>
  )
}

cashier.get('/', (c) => c.html(
  <Layout title="Kasir" page="cashier">
    <main class="page-shell" id="cashier-page">
      <section class="page-intro" aria-labelledby="cashier-title">
        <p class="eyebrow">Transaksi baru</p>
        <h1 id="cashier-title">Catat cukuran hari ini</h1>
        <p>Pilih layanan, cek total, lalu simpan. Cepat dipakai dengan satu tangan.</p>
      </section>

      <section class="panel" aria-labelledby="service-picker-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Langkah 1</p>
            <h2 id="service-picker-title">Pilih layanan</h2>
          </div>
          <a class="text-link" href="/kasir/layanan">Kelola</a>
        </div>
        <div id="service-picker" class="service-grid" aria-live="polite">
          <p class="empty-state">Memuat layanan…</p>
        </div>
      </section>

      <section class="panel" aria-labelledby="cart-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Langkah 2</p>
            <h2 id="cart-title">Rincian transaksi</h2>
          </div>
          <strong id="cart-count" class="count-badge">0 item</strong>
        </div>
        <div id="cart-items" class="cart-list">
          <p class="empty-state">Belum ada layanan dipilih.</p>
        </div>
        <form id="sale-form" class="sale-form">
          <label>
            Nama capster <span>opsional</span>
            <input id="capster-name" name="capster_name" maxlength={80} autocomplete="name" placeholder="Contoh: Budi" />
          </label>
          <label>
            Catatan <span>opsional</span>
            <textarea id="sale-note" name="note" maxlength={500} rows={2} placeholder="Catatan singkat"></textarea>
          </label>
          <div class="checkout-bar">
            <span>
              <small>Total</small>
              <strong id="cart-total">Rp0</strong>
            </span>
            <button id="submit-sale" class="primary-button" type="submit" disabled>Catat Transaksi</button>
          </div>
        </form>
      </section>

      <section class="panel" aria-labelledby="today-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Ringkasan</p>
            <h2 id="today-title">Transaksi hari ini</h2>
          </div>
          <strong id="daily-total" class="daily-total">Rp0</strong>
        </div>
        <p id="daily-meta" class="section-note">Memuat ringkasan…</p>
        <div id="today-sales" class="sales-list" aria-live="polite">
          <p class="empty-state">Memuat transaksi…</p>
        </div>
      </section>
    </main>
  </Layout>
))

cashier.get('/layanan', (c) => c.html(
  <Layout title="Kelola Layanan" page="services">
    <main class="page-shell" id="services-page">
      <section class="page-intro" aria-labelledby="services-title">
        <p class="eyebrow">Pengaturan kasir</p>
        <h1 id="services-title">Kelola layanan</h1>
        <p>Tambah layanan, ubah nama atau harga, dan nonaktifkan layanan yang tidak dipakai.</p>
      </section>

      <section class="panel" aria-labelledby="new-service-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Layanan baru</p>
            <h2 id="new-service-title">Tambah ke daftar</h2>
          </div>
        </div>
        <form id="new-service-form" class="stacked-form">
          <label>
            Nama layanan
            <input id="new-service-name" maxlength={80} required placeholder="Contoh: Cukur Reguler" />
          </label>
          <label>
            Harga (rupiah)
            <input id="new-service-price" type="number" min="0" step="1000" inputmode="numeric" required placeholder="25000" />
          </label>
          <button class="primary-button" type="submit">Tambah Layanan</button>
        </form>
      </section>

      <section class="panel" aria-labelledby="active-services-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Daftar aktif</p>
            <h2 id="active-services-title">Layanan kasir</h2>
          </div>
          <strong id="service-count" class="count-badge">0 layanan</strong>
        </div>
        <div id="service-manager" class="manager-list" aria-live="polite">
          <p class="empty-state">Memuat layanan…</p>
        </div>
      </section>
    </main>
  </Layout>
))
