const assert = require('node:assert/strict')
const { chromium, devices } = require('playwright')

const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000'

async function run() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })
  const context = await browser.newContext({ ...devices['Pixel 7'] })
  const page = await context.newPage()
  const consoleErrors = []
  const pageErrors = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))

  try {
    const response = await page.goto(`${baseUrl}/kasir`, {
      waitUntil: 'networkidle',
      timeout: 60_000
    })
    assert.equal(response?.status(), 200, 'Halaman kasir harus merespons HTTP 200')

    const serviceButton = page.locator('[data-service-index="0"]')
    await serviceButton.waitFor({ state: 'visible', timeout: 15_000 })
    const serviceName = (await serviceButton.locator('strong').textContent())?.trim()

    await serviceButton.tap()

    const toast = page.locator('#toast')
    await toast.waitFor({ state: 'visible', timeout: 2_000 })
    assert.equal(await serviceButton.evaluate((button) => button.classList.contains('just-added')), true,
      'Kartu layanan harus mendapat feedback visual just-added')
    assert.equal((await toast.textContent())?.trim(), `${serviceName} ditambahkan · 1 item`,
      'Toast harus menyebut layanan dan jumlah item')
    assert.equal((await page.locator('#cart-count').textContent())?.trim(), '1 item')
    assert.equal(await page.locator('#submit-sale').isEnabled(), true)
    assert.deepEqual(consoleErrors, [], 'Tidak boleh ada console error')
    assert.deepEqual(pageErrors, [], 'Tidak boleh ada page error')

    console.log(`PASS: tap ${serviceName} menampilkan highlight, toast, dan 1 item (${baseUrl})`)
  } finally {
    await browser.close()
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
