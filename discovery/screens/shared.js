/*
  DISCOVERY SHARED HELPERS — Foodbridge Modules Products
  --------------------------------------------------------
  Vanilla JS, no build step. Loaded by every screen via <script src="shared.js">.
  Provides: seed loading, a localStorage-backed product store (so add/edit/delete persist
  while clicking across screens in one session), the shared sidebar/topbar chrome, small
  formatting helpers, and (Addendum 003) a custom searchable-dropdown component, a generic
  modal/menu helper, unit & price / packaging / inventory formatting, and a clipboard stub.
  Disposable — informs the SSOTs, not imported by development/.
*/

const FBP = (() => {
  const STORAGE_KEY = 'fbp-discovery-products-v1';

  // ---- sidebar structure ----
  // Addendum 003: replaced with the fuller sidebar captured in the 2026-07-27 walkthrough
  // (2026-07-27-products-list-desktop.png), which shows more items than the single
  // 2026-07-25 list screenshot Addendum 002 was built from. Both are As-is captures of the
  // same app; this is the more complete one, so it wins — noted in design-principles.md.
  const NAV = [
    { key: 'dashboard', label: 'Dashboard', icon: '▦' },
    {
      key: 'products', label: 'Products', icon: '\u{1F4E6}', expanded: true,
      children: [
        { key: 'all-products', label: 'All Products' },
        { key: 'categories', label: 'Categories' },
        { key: 'raw-materials', label: 'Raw Materials' }
      ]
    },
    {
      key: 'customers', label: 'Customers', icon: '\u{1F465}', expanded: true,
      children: [
        { key: 'b2b-customers', label: 'B2B Customers' },
        { key: 'retail-customers', label: 'Retail Customers' }
      ]
    },
    { key: 'manage-routes', label: 'Manage Routes', icon: '\u{1F5C2}' },
    { key: 'order', label: 'Order', icon: '\u{1F6D2}' },
    { key: 'deliveries', label: 'Deliveries', icon: '\u{1F69A}' },
    { key: 'route-delivery', label: 'Route Delivery', icon: '\u{1F464}' },
    {
      key: 'returns', label: 'Returns', icon: '▦', expanded: true,
      children: [
        { key: 'order-returns', label: 'Order Returns' },
        { key: 'logistic-returns', label: 'Logistic Returns' }
      ]
    },
    {
      key: 'inventory', label: 'Inventory', icon: '\u{1F3E2}', expanded: true,
      children: [
        { key: 'live-stock', label: 'Live Stock' },
        { key: 'expiry-report', label: 'Expiry Report' }
      ]
    },
    { key: 'purchase', label: 'Purchase', icon: '\u{2194}' },
    { key: 'route-delivery-2', label: 'Route Delivery', icon: '\u{1F464}' },
    { key: 'store-qr', label: 'Store QR Code', icon: '▣' }
  ];

  // ---- seed / storage ----
  async function loadSeed() {
    const res = await fetch('../seed-data/seed.json');
    return res.json();
  }

  async function ensureStore() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const seed = await loadSeed();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    }
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  }

  async function getStore() {
    return ensureStore();
  }

  function saveStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  async function resetStore() {
    const seed = await loadSeed();
    saveStore(seed);
    return seed;
  }

  async function getProducts() {
    const store = await getStore();
    return store.products;
  }

  async function getProduct(id) {
    const store = await getStore();
    return store.products.find((p) => p.id === id) || null;
  }

  async function addProduct(product) {
    const store = await getStore();
    const id = 'p-' + Math.random().toString(36).slice(2, 8);
    const record = Object.assign({ id }, product);
    store.products.unshift(record);
    saveStore(store);
    return record;
  }

  async function updateProduct(id, patch) {
    const store = await getStore();
    const idx = store.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    store.products[idx] = Object.assign({}, store.products[idx], patch);
    saveStore(store);
    return store.products[idx];
  }

  async function deleteProduct(id) {
    const store = await getStore();
    store.products = store.products.filter((p) => p.id !== id);
    saveStore(store);
  }

  async function deleteProducts(ids) {
    const store = await getStore();
    const idSet = new Set(ids);
    store.products = store.products.filter((p) => !idSet.has(p.id));
    saveStore(store);
  }

  async function getMeta() {
    const store = await getStore();
    return {
      store: store.store,
      categories: store.categories,
      stockUnits: store.stockUnits,
      taxModes: store.taxModes,
      smallestUnits: store.smallestUnits || [],
      baseUnits: store.baseUnits || [],
      gstRates: store.gstRates || [0, 5, 12, 18, 28],
      coverageOptions: store.coverageOptions || [
        { value: 'none', label: 'No Coverage' },
        { value: 'warranty', label: 'Warranty Coverage' },
        { value: 'guarantee', label: 'Guarantee Coverage' }
      ]
    };
  }

  async function addCategoryOption(value) {
    const store = await getStore();
    if (value && !store.categories.includes(value)) store.categories.push(value);
    saveStore(store);
  }

  async function addUnitOption(kind, value) {
    const store = await getStore();
    const key = kind === 'base' ? 'baseUnits' : 'smallestUnits';
    if (value && !store[key].includes(value)) store[key].push(value);
    saveStore(store);
  }

  // ---- formatting ----
  function money(n) {
    return '₹' + Number(n || 0).toFixed(2);
  }

  function taxLabel(tax) {
    if (!tax || tax.mode === 'none' || !tax.percent) return '0% tax';
    if (tax.mode === 'incl') return tax.percent + '% incl. tax';
    return '+' + tax.percent + '% excl. tax';
  }

  function thumbHtml(image, size) {
    size = size || 40;
    const style = `width:${size}px;height:${size}px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex:none;overflow:hidden;`;
    if (!image) image = { kind: 'icon' };
    if (image.kind === 'photo') {
      return `<div style="${style}background:#fdf3e7;font-size:${size * 0.55}px;">${image.emoji || '\u{1F4F7}'}</div>`;
    }
    if (image.kind === 'lock') {
      return `<div style="${style}background:#f1f2f4;color:#9aa0a6;font-size:${size * 0.45}px;">\u{1F512}</div>`;
    }
    if (image.kind === 'text') {
      return `<div style="${style}background:#eef1f4;color:#6b7280;font-size:${size * 0.18}px;font-weight:600;text-align:center;line-height:1.1;">${image.label || ''}</div>`;
    }
    return `<div style="${style}background:#f1f2f4;color:#9aa0a6;font-size:${size * 0.5}px;">\u{1F5BC}</div>`;
  }

  // Addendum 003 — Packaging & Units table rows, derived from product.unit.
  // Third "Pallet" tier is not user-configurable in the Unit & Price sub-modal (only
  // Smallest + Base are), but was observed on every Product Detail capture as
  // "1 Pallet = 1 {Base}" at the same price as the base unit — reproduced as a fixed
  // derivation, flagged as an assumption (see annotation §7 cross-cutting #6).
  function packagingRows(product) {
    const u = product.unit;
    if (!u) return [];
    const rows = [
      { unit: u.smallest, tag: 'Smallest Unit', conversion: `1 ${u.smallest}`, price: u.priceSmallest },
      { unit: u.base, tag: 'Base Unit', conversion: `1 ${u.base} = ${u.unitsPerBase} ${u.smallest}`, price: u.priceBase }
    ];
    const pallet = u.pallet || { label: 'Pallet', perBase: 1, price: u.priceBase };
    rows.push({ unit: pallet.label, tag: 'Pallet Unit', conversion: `1 ${pallet.label} = ${pallet.perBase} ${u.base}`, price: pallet.price });
    return rows;
  }

  function gstLabel(gst) {
    if (!gst) return '0%';
    return `${gst.rate}%`;
  }

  // Stock tiles for Product Detail — relabelled from the same stock{} shape the list uses
  // (Total Stock ← qty, Available Stock ← canSell, Stock Reserved In Order ← inOrders), no
  // data-shape break (design-principles.md, Addendum 003 decision D4).
  function inventoryTiles(product) {
    const s = product.stock || { qty: 0, canSell: 0, inOrders: 0 };
    return [
      { label: 'Total Stock', value: s.qty, icon: '\u{1F4E6}' },
      { label: 'Available Stock', value: s.canSell, icon: '\u{2705}' },
      { label: 'Stock Reserved In Order', value: s.inOrders, icon: '\u{1F512}' }
    ];
  }

  function stockStatus(product) {
    const s = product.stock || {};
    if (!s.qty) return { label: 'Out of Stock', cls: 'status-out' };
    if (s.canSell > 0 && s.canSell <= 15) return { label: 'Low Stock', cls: 'status-low' };
    return null;
  }

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  // ---- clipboard stub (Addendum 003 — Product Detail "More Actions") ----
  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${label || 'Value'} copied — ${text}`);
    } catch (e) {
      alert(`${label || 'Value'}: ${text}`);
    }
  }

  // ---- toast (lightweight, replaces alert() for non-blocking confirmations) ----
  function toast(message) {
    let host = document.getElementById('fbp-toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'fbp-toast-host';
      host.className = 'toast-host';
      document.body.appendChild(host);
    }
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    host.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 250);
    }, 2600);
  }

  // ---- generic modal helper (Add/Edit Product, Unit & Price sub-modal, Preview Product,
  // Delete confirm, image lightbox) ----
  // Addendum 004: modals now STACK (each openModal() call adds a new overlay on top rather
  // than replacing the previous one) because Add/Edit Product is itself a modal, and its
  // Unit & Price control opens a second modal on top of that — closing the top one must not
  // destroy the one underneath. closeModal() with no argument closes only the topmost.
  function openModal(innerHtml, opts) {
    opts = opts || {};
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay' + (opts.lightbox ? ' modal-overlay--lightbox' : '');
    overlay.dataset.fbpModal = '1';
    overlay.innerHTML = innerHtml;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && !opts.persistent) closeModal(overlay);
    });
    document.body.classList.add('modal-open');
    return overlay;
  }

  function closeModal(overlayEl) {
    const stack = Array.from(document.querySelectorAll('[data-fbp-modal]'));
    const target = overlayEl || stack[stack.length - 1];
    if (!target) return;
    const finish = () => {
      target.remove();
      if (!document.querySelector('[data-fbp-modal]')) document.body.classList.remove('modal-open');
    };
    if (target.querySelector('.drawer-panel')) {
      // let the slide-out transition finish before removing from the DOM
      target.classList.remove('drawer-open');
      setTimeout(finish, 200);
    } else {
      finish();
    }
  }

  // ---- right-side drawer (Add/Update Product) — Addendum 005 correction: these are a
  // slide-in drawer covering ~2/3 of the content area, not a centered dialog. Shares the same
  // stack/close semantics as openModal() via [data-fbp-modal].
  function openDrawer(innerHtml, opts) {
    opts = opts || {};
    const overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    overlay.dataset.fbpModal = '1';
    overlay.innerHTML = innerHtml;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && !opts.persistent) closeModal(overlay);
    });
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('drawer-open')));
    return overlay;
  }

  // ---- delete confirmation modal (Addendum 004 — exact As-is copy) ----
  function openDeleteModal(opts) {
    const { title, message, confirmLabel, onConfirm } = opts;
    const html = `
      <div class="modal-card modal-card--narrow" style="text-align:center;">
        <div class="delete-icon">🗑</div>
        <div class="modal-title" style="text-align:center;">${title}</div>
        <p class="modal-message">${message}</p>
        <div class="modal-actions">
          <button type="button" class="btn" id="del-cancel">Cancel</button>
          <button type="button" class="btn btn-danger btn-solid" id="del-confirm">${confirmLabel || 'Delete'}</button>
        </div>
      </div>
    `;
    const overlay = openModal(html);
    overlay.querySelector('#del-cancel').addEventListener('click', () => closeModal(overlay));
    overlay.querySelector('#del-confirm').addEventListener('click', async () => {
      await onConfirm();
      closeModal(overlay);
    });
    return overlay;
  }

  // ---- generic dropdown menu helper (Export / Import / Sample / More Actions) ----
  function toggleMenu(triggerEl, menuHtml, onMount) {
    const existing = document.getElementById('fbp-menu');
    if (existing) {
      const wasForThisTrigger = existing.dataset.trigger === triggerEl.dataset.menuId;
      existing.remove();
      document.removeEventListener('click', closeMenuOnOutsideClick, true);
      if (wasForThisTrigger) return;
    }
    const rect = triggerEl.getBoundingClientRect();
    const menu = document.createElement('div');
    menu.id = 'fbp-menu';
    menu.className = 'dropdown-menu';
    menu.dataset.trigger = triggerEl.dataset.menuId || '';
    menu.style.top = `${rect.bottom + window.scrollY + 6}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;
    menu.innerHTML = menuHtml;
    document.body.appendChild(menu);
    if (onMount) onMount(menu);
    setTimeout(() => document.addEventListener('click', closeMenuOnOutsideClick, true), 0);
  }

  function closeMenuOnOutsideClick(e) {
    const menu = document.getElementById('fbp-menu');
    if (menu && !menu.contains(e.target)) {
      menu.remove();
      document.removeEventListener('click', closeMenuOnOutsideClick, true);
    }
  }

  // ---- custom searchable select (Category filter/field, Smallest/Base Unit) ----
  // Replaces native <select> per Addendum 003 D3. `onChange` fires with the chosen value.
  // If `allowAdd` is set, an "+ Add new" row appends a value into `optionsRef` (mutated) via
  // the supplied `onAdd(value)` callback (used to persist into the seed store's option lists).
  function mountSearchSelect(container, opts) {
    const { options, value, placeholder, allowAdd, onChange, onAdd, helper, clearable } = opts;
    let current = value || '';
    container.innerHTML = `
      <div class="ssel">
        <button type="button" class="ssel-btn">
          <span class="ssel-value">${current || `<span class="ssel-placeholder">${placeholder}</span>`}</span>
          ${clearable ? `<span class="ssel-clear" style="display:${current ? '' : 'none'};" title="Clear">✕</span>` : ''}
          <span class="ssel-caret">▾</span>
        </button>
        ${helper ? `<div class="ssel-helper">${helper}</div>` : ''}
      </div>`;
    const btn = container.querySelector('.ssel-btn');
    const clearBtn = container.querySelector('.ssel-clear');
    btn.dataset.menuId = 'ssel-' + Math.random().toString(36).slice(2, 8);

    function setValue(v) {
      current = v;
      container.querySelector('.ssel-value').innerHTML = v || `<span class="ssel-placeholder">${placeholder}</span>`;
      if (clearBtn) clearBtn.style.display = v ? '' : 'none';
      if (onChange) onChange(v);
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setValue('');
      });
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const menuHtml = `
        <div class="ssel-search"><input type="text" placeholder="Search or type to add…" class="ssel-search-input" /></div>
        <div class="ssel-options"></div>
        ${allowAdd ? `<div class="ssel-add">+ Add new</div>` : ''}
      `;
      toggleMenu(btn, menuHtml, (menu) => {
        const list = menu.querySelector('.ssel-options');
        const input = menu.querySelector('.ssel-search-input');
        const renderOptions = (filterText) => {
          const f = (filterText || '').toLowerCase();
          const filtered = options.filter((o) => o.toLowerCase().includes(f));
          list.innerHTML = filtered.length
            ? filtered.map((o) => `<div class="ssel-option${o === current ? ' active' : ''}" data-value="${o}">${o}</div>`).join('')
            : `<div class="ssel-empty">No matches</div>`;
          list.querySelectorAll('.ssel-option').forEach((el) =>
            el.addEventListener('click', () => {
              setValue(el.dataset.value);
              document.getElementById('fbp-menu')?.remove();
            })
          );
        };
        renderOptions('');
        input.addEventListener('input', () => renderOptions(input.value));
        input.focus();
        const addRow = menu.querySelector('.ssel-add');
        if (addRow) {
          addRow.addEventListener('click', () => {
            const v = (input.value || '').trim();
            if (!v) return;
            if (!options.includes(v)) options.push(v);
            if (onAdd) onAdd(v);
            setValue(v);
            document.getElementById('fbp-menu')?.remove();
          });
        }
      });
    });

    return { getValue: () => current, setValue };
  }

  // ---- shared Add/Edit Product drawer ----
  // Addendum 003 built this as a page; Addendum 004 corrected it to a modal; Addendum 005
  // corrects it again — the As-is captures show a right-side SLIDE-IN DRAWER (~2/3 width,
  // full height, sticky footer) over the dimmed List/Detail, not a centered dialog. Centralised
  // because Add and Edit render the identical field set + Unit & Price sub-modal.
  const FOOD_EMOJI = ['🍞', '🥐', '🥯', '🍰', '🧁', '🍪', '🥖', '🥪'];

  function openProductModal(opts) {
    const { meta, product, mode, onSaved } = opts;
    const isEdit = mode === 'edit';
    let unitState = product && product.unit ? Object.assign({}, product.unit, { gst: Object.assign({}, product.unit.gst) }) : null;
    let imagesState = ((product && product.images) || []).slice(0, 4);
    while (imagesState.length < 4) imagesState.push(null);

    const html = `
      <div class="drawer-panel">
        <button type="button" class="modal-close" id="pf-close">✕</button>
        <div class="drawer-header">
          <div class="modal-title">${isEdit ? 'Update Product' : 'Add Product'}</div>
          <div class="modal-subtitle">${isEdit ? 'Update product and necessary information from here' : 'Add your product and necessary information from here'}</div>
        </div>
        <form id="product-form" class="drawer-body">
          <div class="field">
            <label for="artNo">Article No</label>
            <div class="input-group">
              <input id="artNo" name="artNo" placeholder="Article No" value="${product ? product.artNo : ''}" />
              <button type="button" class="btn btn-primary" id="btn-generate">Generate</button>
            </div>
          </div>
          <div class="field">
            <label for="name">Title/Name *</label>
            <input id="name" name="name" required placeholder="e.g. Jamun-11" value="${product ? product.name : ''}" />
          </div>
          <div class="field">
            <label for="description">Description</label>
            <textarea id="description" name="description" rows="3" placeholder="Description">${product ? product.description || '' : ''}</textarea>
          </div>
          <div class="field">
            <label>Images</label>
            <div class="image-tiles" id="image-tiles"></div>
            <input type="file" accept="image/*" id="image-file-input" style="display:none;" />
          </div>
          <div class="field">
            <label for="hsnSac">HSN/SAC</label>
            <input id="hsnSac" name="hsnSac" placeholder="HSN/SAC" value="${product ? product.hsnSac || '' : ''}" />
          </div>
          <div class="field">
            <label for="barcode">Barcode</label>
            <div class="input-group">
              <input id="barcode" name="barcode" placeholder="Barcode" value="${product ? product.barcode || '' : ''}" />
              <button type="button" class="btn btn-primary" id="btn-scan" title="Scan barcode">▤</button>
            </div>
          </div>
          <div class="field">
            <label>Category *</label>
            <div id="category-mount"></div>
          </div>
          <div class="field">
            <label>Unit &amp; Price *</label>
            <div id="unit-price-control"></div>
          </div>
          <div class="field field-disabled">
            <label for="price">Price <span id="price-unit-label"></span> <span class="info-dot" title="Derived from Unit &amp; Price">ⓘ</span></label>
            <input id="price" value="0" disabled />
          </div>
          <div class="field">
            <label for="openingStock">${isEdit ? 'Stock Qty' : 'Opening Stock'}</label>
            <input id="openingStock" name="openingStock" type="number" min="0" step="1" value="${product ? product.stock.qty : 0}" />
          </div>
          <div class="field">
            <label>Product Coverage</label>
            <div style="display:flex;flex-wrap:wrap;">
              ${meta.coverageOptions
                .map(
                  (c) => `<label class="radio-row"><input type="radio" name="coverage" value="${c.value}" ${(product ? product.coverage : 'none') === c.value ? 'checked' : ''} /> ${c.label}</label>`
                )
                .join('')}
            </div>
            <div class="ssel-helper">Select warranty or guarantee coverage for this product</div>
          </div>
          <div class="field">
            <label for="brand">Brand</label>
            <input id="brand" name="brand" placeholder="Enter product brand" value="${product ? product.brand || '' : ''}" />
          </div>
        </form>
        <div class="drawer-footer">
          <button type="submit" form="product-form" class="btn btn-primary">${isEdit ? 'Update Product' : 'Add Product'}</button>
          <button type="button" class="btn btn-danger" id="pf-cancel">Cancel</button>
        </div>
      </div>
    `;
    const overlay = openDrawer(html, { persistent: true });
    const container = overlay;
    overlay.querySelector('#pf-close').addEventListener('click', () => closeModal(overlay));
    overlay.querySelector('#pf-cancel').addEventListener('click', () => closeModal(overlay));

    // ---- images ----
    const fileInput = container.querySelector('#image-file-input');
    let activeTileIndex = null;
    function renderImageTiles() {
      const host = container.querySelector('#image-tiles');
      host.innerHTML = imagesState
        .map((img, i) => {
          if (img) {
            return `<div class="image-tile filled" data-index="${i}">${thumbHtml(img, 84)}<span class="tile-badge tile-edit" data-index="${i}" data-act="edit">✎</span><span class="tile-badge tile-remove" data-index="${i}" data-act="remove">✕</span></div>`;
          }
          return `<div class="image-tile" data-index="${i}" data-act="add"><span class="add-icon">+</span></div>`;
        })
        .join('');
      host.querySelectorAll('[data-act="add"], [data-act="edit"]').forEach((el) =>
        el.addEventListener('click', () => {
          activeTileIndex = parseInt(el.dataset.index, 10);
          fileInput.value = '';
          fileInput.click();
        })
      );
      host.querySelectorAll('[data-act="remove"]').forEach((el) =>
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          imagesState[parseInt(el.dataset.index, 10)] = null;
          renderImageTiles();
        })
      );
    }
    fileInput.addEventListener('change', () => {
      if (activeTileIndex === null || !fileInput.files.length) return;
      imagesState[activeTileIndex] = { kind: 'photo', emoji: FOOD_EMOJI[Math.floor(Math.random() * FOOD_EMOJI.length)] };
      renderImageTiles();
    });
    renderImageTiles();

    // ---- article no / barcode stubs ----
    container.querySelector('#btn-generate').addEventListener('click', () => {
      container.querySelector('#artNo').value = Math.random().toString(36).slice(2, 8);
    });
    container.querySelector('#btn-scan').addEventListener('click', () => {
      container.querySelector('#barcode').value = String(Math.floor(1000000000000 + Math.random() * 8999999999999));
      toast('Barcode scanned.');
    });

    // ---- category ----
    const categorySelect = mountSearchSelect(container.querySelector('#category-mount'), {
      options: meta.categories,
      value: product ? product.category : '',
      placeholder: 'Select Category',
      allowAdd: true,
      clearable: true,
      onAdd: (v) => addCategoryOption(v)
    });

    // ---- unit & price control + price mirror (Addendum 004 D6: two visual states) ----
    const unitControlHost = container.querySelector('#unit-price-control');
    const priceField = container.querySelector('#price');
    const priceUnitLabel = container.querySelector('#price-unit-label');
    function syncUnitControl() {
      if (unitState) {
        unitControlHost.innerHTML = `
          <span class="link-action" id="btn-unit-price">Edit Unit &amp; Price</span>
          <span class="unit-price-summary">1 ${unitState.base} = ${unitState.unitsPerBase} ${unitState.smallest} · ${money(unitState.priceSmallest)} · ${taxLabel({ mode: unitState.gst.rate === 0 ? 'none' : unitState.gst.treatment === 'included' ? 'incl' : 'excl', percent: unitState.gst.rate })}</span>
        `;
        priceField.value = unitState.priceSmallest;
        priceUnitLabel.textContent = `(${unitState.smallest})`;
      } else {
        unitControlHost.innerHTML = `<button type="button" class="btn" id="btn-unit-price" style="width:100%;justify-content:flex-start;">Select Unit &amp; Price</button>`;
        priceField.value = '0';
        priceUnitLabel.textContent = '';
      }
      unitControlHost.querySelector('#btn-unit-price').addEventListener('click', () => openUnitPriceModal());
    }
    syncUnitControl();

    function openUnitPriceModal() {
      const draft = unitState
        ? Object.assign({}, unitState, { gst: Object.assign({}, unitState.gst) })
        : { smallest: '', base: '', unitsPerBase: 1, gst: { rate: meta.gstRates[0], treatment: 'included' }, priceSmallest: 0, priceBase: 0 };
      let basePriceManuallyEdited = false;

      const html = `
        <div class="modal-card modal-card--wide">
          <button type="button" class="modal-close" id="up-close">✕</button>
          <div class="modal-title">Add Pricing and Unit Details</div>
          <div class="modal-subtitle">Configure selling units, conversion quantities, GST treatment, and prices.</div>
          <div class="field-row">
            <div class="field"><label>Smallest Unit *</label><div id="up-smallest-mount"></div></div>
            <div class="field"><label>Base Unit *</label><div id="up-base-mount"></div></div>
          </div>
          <div id="up-conversion"></div>
          <div class="field-group">
            <div class="field-group-title">Tax Settings</div>
            <div class="field-group-help">Set the GST details for pricing.</div>
            <div class="field-row">
              <div class="field"><label>GST Rate (%) *</label><div id="up-gst-rate-mount"></div></div>
              <div class="field">
                <label>GST Treatment *</label>
                <div class="radio-cards" id="up-gst-treatment"></div>
              </div>
            </div>
          </div>
          <div class="field" id="up-price-smallest-field" style="display:none;">
            <label>Selling Price Per <span id="up-price-smallest-label"></span></label>
            <div class="money-input"><input type="number" min="0" step="0.01" id="up-price-smallest" placeholder="0.00" value="${draft.priceSmallest || ''}" /></div>
          </div>
          <div class="field" id="up-price-base-field" style="display:none;">
            <label>Selling Price Per <span id="up-price-base-label"></span></label>
            <div class="money-input"><input type="number" min="0" step="0.01" id="up-price-base" placeholder="0.00" value="${draft.priceBase || ''}" /></div>
          </div>
          <button type="button" class="btn btn-blue btn-block" id="up-save">SAVE</button>
        </div>
      `;
      const overlay = openModal(html);
      overlay.querySelector('#up-close').addEventListener('click', () => closeModal(overlay));

      const smallestSelect = mountSearchSelect(overlay.querySelector('#up-smallest-mount'), {
        options: meta.smallestUnits,
        value: draft.smallest,
        placeholder: 'Select or add unit',
        helper: 'e.g. Bottle, Piece, KG',
        allowAdd: true,
        onAdd: (v) => addUnitOption('smallest', v),
        onChange: (v) => { draft.smallest = v; updateConversionRow(); }
      });
      const baseSelect = mountSearchSelect(overlay.querySelector('#up-base-mount'), {
        options: meta.baseUnits,
        value: draft.base,
        placeholder: 'Select or add unit',
        helper: 'e.g. Box, Carton, Dozen',
        allowAdd: true,
        onAdd: (v) => addUnitOption('base', v),
        onChange: (v) => { draft.base = v; updateConversionRow(); }
      });
      const gstRateSelect = mountSearchSelect(overlay.querySelector('#up-gst-rate-mount'), {
        options: meta.gstRates.map((r) => r + '%'),
        value: draft.gst.rate + '%',
        placeholder: 'GST %',
        onChange: (v) => { draft.gst.rate = parseFloat(v) || 0; }
      });

      function renderGstTreatment() {
        const host = overlay.querySelector('#up-gst-treatment');
        const options = [
          { value: 'included', title: 'Included in Price', help: 'Price already includes GST.' },
          { value: 'separate', title: 'Added Separately', help: 'GST will be added on top.' }
        ];
        host.innerHTML = options
          .map(
            (o) => `<label class="radio-card${draft.gst.treatment === o.value ? ' selected' : ''}" data-value="${o.value}">
              <input type="radio" name="gst-treatment" ${draft.gst.treatment === o.value ? 'checked' : ''} />
              <span><span class="rc-title">${o.title}</span><br/><span class="rc-help">${o.help}</span></span>
            </label>`
          )
          .join('');
        host.querySelectorAll('.radio-card').forEach((card) =>
          card.addEventListener('click', () => {
            draft.gst.treatment = card.dataset.value;
            renderGstTreatment();
          })
        );
      }
      renderGstTreatment();

      function updateConversionRow() {
        const conv = overlay.querySelector('#up-conversion');
        const priceSmallestField = overlay.querySelector('#up-price-smallest-field');
        const priceBaseField = overlay.querySelector('#up-price-base-field');
        if (draft.smallest && draft.base) {
          conv.innerHTML = `<div class="conversion-row">How many ${draft.smallest} per ${draft.base}? <span class="info-dot">ⓘ</span></div>
            <div class="conversion-row">1 <strong>${draft.base.toUpperCase()}</strong> = <input type="number" min="1" step="1" id="up-units-per-base" value="${draft.unitsPerBase || 1}" /> <strong>${draft.smallest.toUpperCase()}</strong></div>`;
          overlay.querySelector('#up-units-per-base').addEventListener('input', (e) => {
            draft.unitsPerBase = parseFloat(e.target.value) || 1;
            recomputeBasePrice();
          });
          priceSmallestField.style.display = '';
          priceBaseField.style.display = '';
          overlay.querySelector('#up-price-smallest-label').textContent = draft.smallest.toUpperCase();
          overlay.querySelector('#up-price-base-label').textContent = draft.base.toUpperCase();
        } else {
          conv.innerHTML = '';
          priceSmallestField.style.display = 'none';
          priceBaseField.style.display = 'none';
        }
      }
      updateConversionRow();

      function recomputeBasePrice() {
        if (basePriceManuallyEdited) return;
        const baseInput = overlay.querySelector('#up-price-base');
        if (!baseInput) return;
        draft.priceBase = Math.round(draft.priceSmallest * draft.unitsPerBase * 100) / 100;
        baseInput.value = draft.priceBase.toFixed(2);
      }
      overlay.querySelector('#up-price-smallest').addEventListener('input', (e) => {
        draft.priceSmallest = parseFloat(e.target.value) || 0;
        recomputeBasePrice();
      });
      overlay.addEventListener('input', (e) => {
        if (e.target.id === 'up-price-base') {
          basePriceManuallyEdited = true;
          draft.priceBase = parseFloat(e.target.value) || 0;
        }
      });

      overlay.querySelector('#up-save').addEventListener('click', () => {
        if (!draft.smallest || !draft.base || !draft.priceSmallest) {
          toast('Please complete Smallest Unit, Base Unit and Selling Price before saving.');
          return;
        }
        unitState = draft;
        syncUnitControl();
        closeModal(overlay);
      });
    }

    // ---- submit ----
    container.querySelector('#product-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!unitState) {
        toast('Please configure Unit & Price before saving.');
        return;
      }
      const form = new FormData(e.target);
      const openingStock = parseInt(form.get('openingStock'), 10) || 0;
      const gstRate = unitState.gst.rate;
      const taxMode = gstRate === 0 ? 'none' : unitState.gst.treatment === 'included' ? 'incl' : 'excl';
      const data = {
        name: (form.get('name') || '').trim(),
        artNo: (form.get('artNo') || '').trim() || Math.random().toString(36).slice(2, 8),
        category: categorySelect.getValue(),
        description: (form.get('description') || '').trim(),
        images: imagesState.filter(Boolean),
        image: imagesState.filter(Boolean)[0] || { kind: 'icon' },
        hsnSac: (form.get('hsnSac') || '').trim(),
        barcode: (form.get('barcode') || '').trim(),
        brand: (form.get('brand') || '').trim(),
        coverage: form.get('coverage') || 'none',
        unit: unitState,
        price: unitState.priceSmallest,
        tax: { mode: taxMode, percent: gstRate },
        stock: product
          ? Object.assign({}, product.stock, { qty: openingStock })
          : { qty: openingStock, unit: unitState.smallest, canSell: openingStock, inOrders: 0 }
      };
      if (!data.name) {
        toast('Title/Name is required.');
        return;
      }
      if (!data.category) {
        toast('Category is required.');
        return;
      }
      const record = isEdit ? await updateProduct(product.id, data) : await addProduct(data);
      toast(isEdit ? `"${record.name}" updated.` : `"${record.name}" added.`);
      closeModal(overlay);
      if (onSaved) onSaved(record);
    });
  }

  // ---- chrome ----
  function navItemHtml(item, activeKey) {
    if (item.children) {
      const childrenHtml = item.children
        .map((c) => {
          const active = c.key === activeKey;
          return `<a class="nav-sub${active ? ' active' : ''}" href="#" data-nav="${c.key}">&ndash; ${c.label}</a>`;
        })
        .join('');
      const groupActive = item.children.some((c) => c.key === activeKey);
      return `
        <div class="nav-group${groupActive ? ' active' : ''}">
          <div class="nav-parent"><span class="nav-icon">${item.icon}</span>${item.label}</div>
          <div class="nav-children">${childrenHtml}</div>
        </div>`;
    }
    const active = item.key === activeKey;
    return `<a class="nav-item${active ? ' active' : ''}" href="#" data-nav="${item.key}"><span class="nav-icon">${item.icon}</span>${item.label}</a>`;
  }

  async function renderChrome(activeKey, title) {
    const meta = await getMeta();
    const sidebar = NAV.map((item) => navItemHtml(item, activeKey)).join('');
    return `
      <div class="shell">
        <div class="sidebar-scrim" id="sidebar-scrim"></div>
        <aside class="sidebar" id="sidebar">
          <div class="brand"><span class="brand-icon">\u{1F6CD}</span> ${meta.store.name}</div>
          <nav>${sidebar}</nav>
        </aside>
        <div class="main">
          <header class="topbar">
            <div class="topbar-left"><span class="hamburger" id="hamburger">☰</span><h1>${title}</h1></div>
            <div class="topbar-right">
              <div class="avatar">${(meta.store.user.name || 'W')[0]}</div>
              <div class="user-meta"><div class="user-name">${meta.store.user.name}</div><div class="user-role">${meta.store.user.role}</div></div>
              <span class="chevron">▾</span>
            </div>
          </header>
          <main class="content" id="content"></main>
        </div>
      </div>`;
  }

  function wireChromeNav(root) {
    root.querySelectorAll('[data-nav]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (el.dataset.nav === 'all-products') {
          window.location.href = 'screen-01.html';
        } else {
          toast('"' + el.textContent.replace(/^–\s*/, '').trim() + '" is not part of this discovery iteration.');
        }
      });
    });
    const hamburger = root.querySelector('#hamburger');
    const sidebar = root.querySelector('#sidebar');
    const scrim = root.querySelector('#sidebar-scrim');
    if (hamburger && sidebar && scrim) {
      hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        scrim.classList.toggle('open');
      });
      scrim.addEventListener('click', () => {
        sidebar.classList.remove('open');
        scrim.classList.remove('open');
      });
    }
  }

  return {
    NAV, loadSeed, getStore, getProducts, getProduct, addProduct, updateProduct, deleteProduct,
    deleteProducts, resetStore, getMeta, addCategoryOption, addUnitOption, money, taxLabel,
    thumbHtml, packagingRows, gstLabel, inventoryTiles, stockStatus, qs, copyText, toast,
    openModal, closeModal, openDrawer, openDeleteModal, toggleMenu, mountSearchSelect, openProductModal,
    renderChrome, wireChromeNav
  };
})();
