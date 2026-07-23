(() => {
  const currency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  })
  const jakartaTime = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit'
  })

  let toastTimer

  function formatMoney(value) {
    return currency.format(Number(value) || 0)
  }

  function today() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date())
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
    return `${values.year}-${values.month}-${values.day}`
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;')
  }

  function showToast(message, isError = false, duration = 3200) {
    const toast = document.querySelector('#toast')
    if (!toast) return

    clearTimeout(toastTimer)
    toast.textContent = message
    toast.className = `toast show${isError ? ' error' : ''}`
    toastTimer = setTimeout(() => {
      toast.className = 'toast'
    }, duration)
  }

  async function api(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    })
    const payload = await response.json().catch(() => null)
    if (!response.ok || !payload?.ok) {
      throw new Error(payload?.error?.message || 'Permintaan gagal. Coba lagi.')
    }
    return payload.data
  }

  async function setupCashier() {
    const picker = document.querySelector('#service-picker')
    const cartItems = document.querySelector('#cart-items')
    const cartCount = document.querySelector('#cart-count')
    const cartTotal = document.querySelector('#cart-total')
    const submitButton = document.querySelector('#submit-sale')
    const saleForm = document.querySelector('#sale-form')
    const salesList = document.querySelector('#today-sales')
    const dailyTotal = document.querySelector('#daily-total')
    const dailyMeta = document.querySelector('#daily-meta')
    const capsterInput = document.querySelector('#capster-name')
    const noteInput = document.querySelector('#sale-note')

    let services = []
    let cart = []
    let sales = []

    function renderServices() {
      if (!services.length) {
        picker.innerHTML = '<p class="empty-state">Belum ada layanan aktif. Buka menu Kelola untuk menambah.</p>'
        return
      }

      picker.innerHTML = services.map((service, index) => `
        <button class="service-button" type="button" data-service-index="${index}">
          <strong>${escapeHtml(service.name)}</strong>
          <span>${formatMoney(service.price_idr)}</span>
        </button>
      `).join('')

      picker.querySelectorAll('[data-service-index]').forEach((button) => {
        button.addEventListener('click', () => {
          const service = services[Number(button.dataset.serviceIndex)]
          cart.push(service)
          renderCart()
          showAddFeedback(button, service)
          if (navigator.vibrate) navigator.vibrate(20)
        })
      })
    }

    function showAddFeedback(button, service) {
      button.classList.remove('just-added')
      void button.offsetWidth
      button.classList.add('just-added')
      button.addEventListener('animationend', () => {
        button.classList.remove('just-added')
      }, { once: true })
      showToast(`${service.name} ditambahkan · ${cart.length} item`, false, 1800)
    }

    function renderCart() {
      const total = cart.reduce((sum, service) => sum + service.price_idr, 0)
      cartCount.textContent = `${cart.length} item`
      cartTotal.textContent = formatMoney(total)
      submitButton.disabled = cart.length === 0

      if (!cart.length) {
        cartItems.innerHTML = '<p class="empty-state">Belum ada layanan dipilih.</p>'
        return
      }

      cartItems.innerHTML = cart.map((service, index) => `
        <article class="cart-row">
          <div>
            <strong>${escapeHtml(service.name)}</strong>
            <span>${formatMoney(service.price_idr)}</span>
          </div>
          <button class="icon-button" type="button" data-remove-index="${index}" aria-label="Hapus ${escapeHtml(service.name)}">×</button>
        </article>
      `).join('')

      cartItems.querySelectorAll('[data-remove-index]').forEach((button) => {
        button.addEventListener('click', () => {
          cart.splice(Number(button.dataset.removeIndex), 1)
          renderCart()
        })
      })
    }

    function renderSales() {
      if (!sales.length) {
        salesList.innerHTML = '<p class="empty-state">Belum ada transaksi hari ini.</p>'
        return
      }

      salesList.innerHTML = sales.map((sale, index) => {
        const itemNames = sale.items.map((item) => `<li>${escapeHtml(item.service_name)} · ${formatMoney(item.price_idr)}</li>`).join('')
        const status = sale.status === 'void' ? 'Dibatalkan' : formatMoney(sale.total_idr)
        const capster = sale.capster_name ? ` · ${escapeHtml(sale.capster_name)}` : ''
        return `
          <article class="sale-card ${sale.status === 'void' ? 'void' : ''}">
            <header>
              <div>
                <h3>${status}</h3>
                <span>${jakartaTime.format(new Date(sale.created_at))}${capster}</span>
              </div>
              ${sale.status === 'completed' ? `<button class="danger-button" type="button" data-void-index="${index}">Batalkan</button>` : ''}
            </header>
            <ul>${itemNames}</ul>
            ${sale.note ? `<p class="sale-note">${escapeHtml(sale.note)}</p>` : ''}
          </article>
        `
      }).join('')

      salesList.querySelectorAll('[data-void-index]').forEach((button) => {
        button.addEventListener('click', async () => {
          const sale = sales[Number(button.dataset.voidIndex)]
          if (!window.confirm(`Batalkan transaksi ${formatMoney(sale.total_idr)}?`)) return
          button.disabled = true
          try {
            await api(`/api/v1/sales/${encodeURIComponent(sale.id)}/void`, { method: 'POST' })
            showToast('Transaksi dibatalkan.')
            await loadDaily()
          } catch (error) {
            button.disabled = false
            showToast(error.message, true)
          }
        })
      })
    }

    async function loadServices() {
      services = await api('/api/v1/services')
      renderServices()
    }

    async function loadDaily() {
      const date = today()
      const [saleData, report] = await Promise.all([
        api(`/api/v1/sales?date=${date}`),
        api(`/api/v1/reports/daily?date=${date}`)
      ])
      sales = saleData
      dailyTotal.textContent = formatMoney(report.total_idr)
      dailyMeta.textContent = `${report.transaction_count} transaksi selesai · zona waktu Jakarta`
      renderSales()
    }

    saleForm.addEventListener('submit', async (event) => {
      event.preventDefault()
      if (!cart.length) return

      submitButton.disabled = true
      submitButton.textContent = 'Menyimpan…'
      try {
        await api('/api/v1/sales', {
          method: 'POST',
          body: JSON.stringify({
            items: cart.map((service) => ({ service_id: service.id })),
            capster_name: capsterInput.value,
            note: noteInput.value
          })
        })
        cart = []
        capsterInput.value = ''
        noteInput.value = ''
        renderCart()
        showToast('Transaksi berhasil dicatat.')
        await loadDaily()
      } catch (error) {
        showToast(error.message, true)
      } finally {
        submitButton.textContent = 'Catat Transaksi'
        submitButton.disabled = cart.length === 0
      }
    })

    try {
      await Promise.all([loadServices(), loadDaily()])
    } catch (error) {
      showToast(error.message, true)
      picker.innerHTML = '<p class="empty-state">Layanan gagal dimuat. Muat ulang halaman.</p>'
      salesList.innerHTML = '<p class="empty-state">Transaksi gagal dimuat. Muat ulang halaman.</p>'
    }
  }

  async function setupServices() {
    const form = document.querySelector('#new-service-form')
    const nameInput = document.querySelector('#new-service-name')
    const priceInput = document.querySelector('#new-service-price')
    const manager = document.querySelector('#service-manager')
    const count = document.querySelector('#service-count')
    let services = []

    function render() {
      count.textContent = `${services.length} layanan`
      if (!services.length) {
        manager.innerHTML = '<p class="empty-state">Belum ada layanan aktif. Tambahkan layanan pertama di atas.</p>'
        return
      }

      manager.innerHTML = services.map((service, index) => `
        <article class="manager-card">
          <header>
            <h3>${escapeHtml(service.name)}</h3>
            <strong>${formatMoney(service.price_idr)}</strong>
          </header>
          <form data-service-index="${index}">
            <label>
              Nama
              <input name="name" maxlength="80" required value="${escapeHtml(service.name)}" />
            </label>
            <label>
              Harga
              <input name="price_idr" type="number" min="0" step="1000" inputmode="numeric" required value="${service.price_idr}" />
            </label>
            <div class="manager-actions">
              <button class="danger-button" type="button" data-deactivate-index="${index}">Nonaktifkan</button>
              <button class="secondary-button" type="submit">Simpan</button>
            </div>
          </form>
        </article>
      `).join('')

      manager.querySelectorAll('form[data-service-index]').forEach((serviceForm) => {
        serviceForm.addEventListener('submit', async (event) => {
          event.preventDefault()
          const service = services[Number(serviceForm.dataset.serviceIndex)]
          const submit = serviceForm.querySelector('[type="submit"]')
          submit.disabled = true
          try {
            await api(`/api/v1/services/${encodeURIComponent(service.id)}`, {
              method: 'PATCH',
              body: JSON.stringify({
                name: serviceForm.elements.name.value,
                price_idr: Number(serviceForm.elements.price_idr.value)
              })
            })
            showToast('Layanan diperbarui.')
            await load()
          } catch (error) {
            submit.disabled = false
            showToast(error.message, true)
          }
        })
      })

      manager.querySelectorAll('[data-deactivate-index]').forEach((button) => {
        button.addEventListener('click', async () => {
          const service = services[Number(button.dataset.deactivateIndex)]
          if (!window.confirm(`Nonaktifkan layanan ${service.name}?`)) return
          button.disabled = true
          try {
            await api(`/api/v1/services/${encodeURIComponent(service.id)}`, {
              method: 'PATCH',
              body: JSON.stringify({ is_active: false })
            })
            showToast('Layanan dinonaktifkan.')
            await load()
          } catch (error) {
            button.disabled = false
            showToast(error.message, true)
          }
        })
      })
    }

    async function load() {
      services = await api('/api/v1/services')
      render()
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      const submit = form.querySelector('[type="submit"]')
      const price = Number(priceInput.value)
      if (!Number.isSafeInteger(price) || price < 0) {
        showToast('Harga harus berupa rupiah bulat dan tidak negatif.', true)
        return
      }

      submit.disabled = true
      try {
        await api('/api/v1/services', {
          method: 'POST',
          body: JSON.stringify({ name: nameInput.value, price_idr: price })
        })
        form.reset()
        showToast('Layanan baru ditambahkan.')
        await load()
      } catch (error) {
        showToast(error.message, true)
      } finally {
        submit.disabled = false
      }
    })

    try {
      await load()
    } catch (error) {
      manager.innerHTML = '<p class="empty-state">Layanan gagal dimuat. Muat ulang halaman.</p>'
      showToast(error.message, true)
    }
  }

  const page = document.body.dataset.page
  if (page === 'cashier') setupCashier()
  if (page === 'services') setupServices()
})()
