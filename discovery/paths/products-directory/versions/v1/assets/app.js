/* ==========================================================================
   Products Directory — HTML replica of the live "Murli" storefront admin.
   Vanilla JS, no build step. Screens: FB.mount('products'|'categories'|'raw-materials').
   Reproduces the attached screenshots: full sidebar, Export/Import/Bulk-Action/
   Google-Sheet toolbar, All/High-margin chips, product table, two-column Add/Edit
   drawer, delete-confirm modal, and the product detail view — all wired to
   in-memory seed data (add / edit / delete / view / bulk / import / export).
   ========================================================================== */
(function () {
  const SEED = window.SEED || { products: [], categories: [], rawMaterials: [] };
  const PAGE_SIZE = 10;
  const UNITS = ["Bottle", "Box", "Pc", "KG", "gm", "L", "ml", "Dozen", "Pack", "Roll"];

  // ── Icons ─────────────────────────────────────────────────────────────────
  const I = {
    dash: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
    box: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8V16a2 2 0 0 1-1 1.7l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.7l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>',
    users: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    route: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
    cart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
    truck: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
    pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    ret: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>',
    inv: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V7l9-4 9 4v14"/><path d="M3 21h18M9 21v-6h6v6"/></svg>',
    user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    bag: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" opacity=".18"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    plus: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    eye: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    edit: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>',
    trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>',
    trashBig: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>',
    chev: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    chevR: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    upload: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/></svg>',
    download: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></svg>',
    sheet: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0f9d58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 3v18M4 9h16M4 15h16M14 3v18"/></svg>',
    bulk: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>',
    rupee: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M14 8a5 5 0 0 1-5 5H6"/></svg>',
    tag: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.6 2.6a2 2 0 0 0-1.4-.6H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.4 8.4a2 2 0 0 0 2.8 0l7.2-7.2a2 2 0 0 0 0-2.8Z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>',
    x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    scan: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8v8M11 8v8M16 8v8"/></svg>',
    imgph: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.6"/><path d="m21 15-5-5L5 21"/></svg>',
    imgphL: '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.6"/><path d="m21 15-5-5L5 21"/></svg>',
    pkg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8V16a2 2 0 0 1-1 1.7l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.7l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8Z"/><path d="m3.3 7 8.7 5 8.7-5"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4 12 14.01l-3-3"/></svg>',
    lock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    layers: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg>',
    back: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    globe: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/></svg>',
    empty: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  };

  const money = (n) => "₹" + Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const taxLabel = (r) => (r > 0 ? r + "% excl. tax" : "0% tax");
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const attr = (s) => esc(s).replace(/'/g, "&#39;");

  // ── Real image thumbnails (keyword-matched) + app-style placeholder ───────
  function hashNum(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0xffff; return h; }
  function imgUrl(item, size) {
    const kw = (item.img || "product").split(",").slice(0, 3).join(",");
    return `https://loremflickr.com/${size}/${size}/${encodeURIComponent(kw)}?lock=${hashNum(item.id || item.name)}`;
  }
  function thumb(item, size) {
    return `<span class="thumb"><img src="${attr(imgUrl(item, size || 160))}" alt="${attr(item.name)}" loading="lazy" onerror="this.closest('.thumb').classList.add('noimg');this.remove();"><span class="ph">${I.imgph}</span></span>`;
  }

  // ── Toast ─────────────────────────────────────────────────────────────────
  function toast(msg, tone) {
    const t = document.getElementById("toast"); if (!t) return;
    t.className = "toast show" + (tone ? " " + tone : ""); t.textContent = msg;
    clearTimeout(toast._t); toast._t = setTimeout(() => (t.className = "toast"), 2400);
  }

  // ── Popover ───────────────────────────────────────────────────────────────
  let openPop = null;
  function closePop() { if (openPop) { openPop.remove(); openPop = null; document.removeEventListener("click", onDoc, true); } }
  function onDoc(e) { if (openPop && !openPop.contains(e.target)) closePop(); }
  function popover(anchor, items) {
    closePop();
    const el = document.createElement("div"); el.className = "popover";
    items.forEach((it) => {
      if (it.sep) { const s = document.createElement("div"); s.className = "m-sep"; el.appendChild(s); return; }
      const b = document.createElement("button"); b.type = "button"; b.className = "m-item" + (it.danger ? " danger" : "");
      b.innerHTML = `${it.icon || ""}<span>${esc(it.title)}</span>`;
      b.addEventListener("click", (ev) => { ev.stopPropagation(); closePop(); it.onClick && it.onClick(); });
      el.appendChild(b);
    });
    document.body.appendChild(el);
    const r = anchor.getBoundingClientRect(), pw = el.offsetWidth, ph = el.offsetHeight;
    el.style.left = Math.max(8, Math.min(r.left, window.innerWidth - pw - 8)) + "px";
    el.style.top = (r.bottom + ph + 8 <= window.innerHeight ? r.bottom + 6 : Math.max(8, r.top - ph - 6)) + "px";
    openPop = el; setTimeout(() => document.addEventListener("click", onDoc, true), 0);
  }
  const exportMenu = (a, e) => popover(a, [
    { icon: I.sheet, title: "Export to Excel", onClick: () => toast(`Exported ${e} to Excel (demo)`, "ok") },
    { icon: I.download, title: "Export to CSV", onClick: () => toast(`Exported ${e} to CSV (demo)`, "ok") },
    { icon: I.download, title: "Download Sample", onClick: () => toast("Downloaded sample template (demo)", "ok") },
  ]);
  const importMenu = (a, e) => popover(a, [
    { icon: I.upload, title: `Import ${e} (file)`, onClick: () => toast(`Import ${e}: file picker (demo)`) },
    { icon: I.globe, title: "Import from Directory", onClick: () => toast("Import from FoodBridge Directory (demo)") },
  ]);

  // ── Drawer ────────────────────────────────────────────────────────────────
  function drawer({ title, subtitle, body, saveLabel, onSave }) {
    const scrim = document.createElement("div"); scrim.className = "drawer-scrim";
    const panel = document.createElement("div"); panel.className = "drawer";
    panel.innerHTML = `
      <div class="drawer-head"><button class="x">${I.x}</button><h3>${esc(title)}</h3>${subtitle ? `<p>${esc(subtitle)}</p>` : ""}</div>
      <div class="drawer-body"><form id="drawerForm">${body}</form></div>
      <div class="drawer-foot"><button type="button" class="btn btn-primary" data-save>${esc(saveLabel)}</button><button type="button" class="btn cancel" data-close>Cancel</button></div>`;
    document.body.appendChild(scrim); document.body.appendChild(panel);
    requestAnimationFrame(() => { scrim.classList.add("show"); panel.classList.add("open"); });
    const close = () => { scrim.classList.remove("show"); panel.classList.remove("open"); setTimeout(() => { scrim.remove(); panel.remove(); document.removeEventListener("keydown", onKey); }, 280); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    scrim.addEventListener("click", close);
    panel.querySelector(".x").addEventListener("click", close);
    panel.querySelector("[data-close]").addEventListener("click", close);
    panel.querySelector("[data-save]").addEventListener("click", () => {
      const form = panel.querySelector("#drawerForm");
      const f = new Proxy(form, { get(t, p) { const el = t.elements ? t.elements[p] : undefined; return el !== undefined ? el : t[p]; } });
      if (onSave(f) !== false) close();
    });
    // Generate + image-box demo hooks
    panel.querySelectorAll("[data-generate]").forEach((b) => b.addEventListener("click", () => { const inp = panel.querySelector(`[name='${b.dataset.generate}']`); inp.value = Array.from({ length: 6 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join(""); }));
    panel.querySelectorAll(".img-box").forEach((b) => b.addEventListener("click", () => toast("Image upload (demo)")));
    panel.querySelectorAll(".unit-price-btn").forEach((b) => b.addEventListener("click", () => toast("Select Unit & Price (demo)")));
    return panel;
  }
  const dRow = (label, req, ctrl, hint) => `<div class="d-row"><label>${esc(label)}${req ? ' <span class="req">*</span>' : ""}</label><div class="ctrl">${ctrl}${hint ? `<div class="hint">${hint}</div>` : ""}</div></div>`;
  const imgGrid = `<div class="img-grid">${Array.from({ length: 4 }, () => `<div class="img-box">${I.plus}</div>`).join("")}</div>`;
  const unitOpts = (sel) => UNITS.map((u) => `<option ${u === sel ? "selected" : ""}>${u}</option>`).join("");
  function subcatOptions(selected) {
    return SEED.categories.map((c) => {
      const kids = c.children && c.children.length ? c.children : [{ id: c.id, name: c.name }];
      return `<optgroup label="${attr(c.name)}">${kids.map((k) => `<option value="${attr(k.name)}" ${k.name === selected ? "selected" : ""}>${esc(k.name)}</option>`).join("")}</optgroup>`;
    }).join("");
  }

  // ── Delete modal ──────────────────────────────────────────────────────────
  function confirmDelete({ name, bulk, count, catalogues, entity, onConfirm }) {
    const scrim = document.createElement("div"); scrim.className = "modal-scrim";
    const msg = bulk
      ? `You are about to permanently remove <b>${count}</b> selected ${entity}${count === 1 ? "" : "s"}. Deleting them will remove them from all listings and you won't be able to recover them later.`
      : (catalogues != null
          ? `This ${entity} is currently part of ${catalogues} catalogues.<br>Deleting it will remove it from all listings and you won't be able to recover it later.`
          : `Deleting it will remove it from all listings and you won't be able to recover it later.`);
    scrim.innerHTML = `<div class="modal-card" role="dialog" aria-modal="true">
      <div class="modal-ic">${I.trashBig}</div>
      <h2>Delete${bulk ? "" : ` <span class="em">${esc(name)}</span>`}?</h2>
      <p>${msg}</p>
      <div class="modal-foot"><button class="btn cancel-btn" data-keep>Cancel</button><button class="btn btn-danger" data-del>Delete</button></div></div>`;
    scrim.querySelector(".cancel-btn").style.borderColor = "var(--line)";
    document.body.appendChild(scrim);
    requestAnimationFrame(() => scrim.classList.add("show"));
    const close = () => { scrim.classList.remove("show"); setTimeout(() => scrim.remove(), 200); };
    scrim.addEventListener("click", (e) => { if (e.target === scrim) close(); });
    scrim.querySelector("[data-keep]").addEventListener("click", close);
    scrim.querySelector("[data-del]").addEventListener("click", () => { onConfirm(); close(); });
  }

  // ── Sidebar / shell ───────────────────────────────────────────────────────
  const SIDEBAR = [
    { label: "Dashboard", icon: I.dash },
    { label: "Products", icon: I.box, group: true, children: [
      { label: "All Products", key: "products", href: "all-products.html" },
      { label: "Categories", key: "categories", href: "categories.html" },
      { label: "Raw Materials", key: "raw-materials", href: "raw-materials.html" },
    ] },
    { label: "Customers", icon: I.users, group: true, children: [{ label: "B2B Customers" }, { label: "Retail Customers" }] },
    { label: "Manage Routes", icon: I.route },
    { label: "Order", icon: I.cart },
    { label: "Deliveries", icon: I.truck },
    { label: "Route Delivery", icon: I.pin },
    { label: "Returns", icon: I.ret, group: true, children: [{ label: "Order Returns" }, { label: "Logistic Returns" }] },
    { label: "Inventory", icon: I.inv, group: true, children: [{ label: "FG Live Stock" }, { label: "RM Live Stock" }, { label: "FG Expiry Report" }] },
    { label: "Purchase", icon: I.cart, group: true, collapsed: true, children: [] },
    { label: "Route Delivery", icon: I.pin },
  ];
  function shell(active, title) {
    const nav = SIDEBAR.map((item) => {
      if (!item.group) return `<div class="nav-row" data-demo="${attr(item.label)}"><span class="ic">${item.icon}</span>${esc(item.label)}</div>`;
      const hasActive = (item.children || []).some((c) => c.key === active);
      const open = hasActive || !item.collapsed;
      const subs = (item.children || []).map((c) => c.key
        ? `<a class="sub ${c.key === active ? "active" : ""}" href="${c.href}"><span class="dash">–</span>${esc(c.label)}</a>`
        : `<div class="sub" data-demo="${attr(c.label)}"><span class="dash">–</span>${esc(c.label)}</div>`).join("");
      return `<div class="nav-row group ${open ? "open" : ""} ${hasActive ? "active-parent" : ""}" data-toggle><span class="ic">${item.icon}</span>${esc(item.label)}<span class="chev">${I.chev}</span></div><div class="nav-sub" ${open ? "" : "style=display:none"}>${subs}</div>`;
    }).join("");
    return `
      <div class="scrim" id="scrim"></div>
      <aside class="sidebar" id="sidebar">
        <div class="brand"><span class="logo">${I.bag}</span><span class="name">Murli</span></div>
        <nav class="nav">${nav}</nav>
      </aside>
      <div class="main">
        <div class="topbar">
          <button class="hamburger" id="hamburger">${I.menu}</button>
          <div class="page-title">${esc(title)}</div>
          <div class="spacer"></div>
          <div class="user"><div class="who"><b>Mahesh</b><br><small>Admin</small></div><div class="av">${I.user}</div></div>
        </div>
        <div class="content" id="content"></div>
      </div>
      <div class="toast" id="toast"></div>`;
  }
  function wireShell() {
    const sb = document.getElementById("sidebar"), scrim = document.getElementById("scrim");
    document.getElementById("hamburger")?.addEventListener("click", () => { sb.classList.add("open"); scrim.classList.add("show"); });
    scrim?.addEventListener("click", () => { sb.classList.remove("open"); scrim.classList.remove("show"); });
    sb.querySelectorAll("[data-toggle]").forEach((row) => row.addEventListener("click", () => {
      const sub = row.nextElementSibling; if (!sub || !sub.classList.contains("nav-sub")) return;
      const open = row.classList.toggle("open"); sub.style.display = open ? "" : "none";
    }));
    sb.querySelectorAll("[data-demo]").forEach((el) => el.addEventListener("click", () => toast(`${el.dataset.demo} — coming soon (demo)`)));
  }

  // ── Pagination ────────────────────────────────────────────────────────────
  function pager(total, page, onGo) {
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1, to = Math.min(total, page * PAGE_SIZE);
    let btns = ""; for (let i = 1; i <= pages; i++) btns += `<button class="pg ${i === page ? "active" : ""}" data-pg="${i}">${i}</button>`;
    const el = document.createElement("div"); el.className = "pager";
    el.innerHTML = `<span class="info">Showing ${from}-${to} of ${total}</span><div class="pages"><button class="pg" data-pg="${page - 1}" ${page === 1 ? "disabled" : ""}>‹</button>${btns}<button class="pg" data-pg="${page + 1}" ${page >= pages ? "disabled" : ""}>›</button></div>`;
    el.querySelectorAll("[data-pg]").forEach((b) => b.addEventListener("click", () => { const p = +b.dataset.pg; if (p >= 1 && p <= pages && p !== page) onGo(p); }));
    return el;
  }
  const emptyBlock = (t, m) => `<div class="table-wrap"><div class="empty"><div class="ic">${I.empty}</div><h2>${esc(t)}</h2><p>${m}</p></div></div>`;

  /* =========================================================================
     SCREEN 1 — ALL PRODUCTS
     ========================================================================= */
  function screenProducts() {
    const state = { search: "", category: "", tag: "all", page: 1, selected: new Set() };
    const highCount = () => SEED.products.filter((p) => p.highMargin).length;
    const subcats = () => [...new Set(SEED.products.map((p) => p.category))];
    const content = document.getElementById("content");
    content.innerHTML = `
      <div class="toolbar">
        <button class="btn" id="export">${I.upload} Export</button>
        <button class="btn" id="import">${I.download} Import</button>
        <button class="btn" id="bulk">${I.bulk} Bulk Action <span class="caret">${I.chev}</span></button>
        <div class="grow"></div>
        <button class="btn btn-primary" id="add">${I.plus} Add Product</button>
        <button class="btn" id="gsheet">${I.sheet} Google Sheet</button>
      </div>
      <div class="filters">
        <div class="search">${I.search}<input id="q" type="search" placeholder="Search Product"></div>
        <select class="filter desktop-filter" id="cat"></select>
      </div>
      <div class="chips" id="chips"></div>
      <div id="list"></div>`;

    function fillCat() {
      document.getElementById("cat").innerHTML = `<option value="">Select Category</option>` + subcats().map((c) => `<option value="${attr(c)}" ${c === state.category ? "selected" : ""}>${esc(c)}</option>`).join("");
    }
    function fillChips() {
      document.getElementById("chips").innerHTML =
        `<button class="chip-pill ${state.tag === "all" ? "active" : ""}" data-t="all">All</button>` +
        `<button class="chip-pill ${state.tag === "high" ? "active" : ""}" data-t="high">${I.tag} High margin <span class="num">${highCount()}</span></button>`;
      document.getElementById("chips").querySelectorAll(".chip-pill").forEach((c) => c.addEventListener("click", () => { state.tag = c.dataset.t; state.page = 1; render(); }));
    }
    function filtered() {
      const q = state.search.trim().toLowerCase();
      return SEED.products.filter((p) => {
        if (state.category && p.category !== state.category) return false;
        if (state.tag === "high" && !p.highMargin) return false;
        if (!q) return true;
        return p.name.toLowerCase().includes(q) || String(p.articleNo).toLowerCase().includes(q);
      });
    }

    function productForm(p) {
      p = p || {};
      return [
        dRow("Article No", false, `<div class="with-btn"><input name="articleNo" value="${attr(p.articleNo || "")}" placeholder="Article No"><button type="button" class="btn btn-primary" data-generate="articleNo" style="height:44px">Generate</button></div>`),
        dRow("Title/Name", true, `<input name="name" value="${attr(p.name || "")}" placeholder="Title/Name" required>`),
        dRow("Description", false, `<textarea name="description" placeholder="Description">${esc(p.description || "")}</textarea>`),
        dRow("Images", false, imgGrid),
        dRow("SKU", false, `<input name="sku" value="${attr(p.sku || "")}" placeholder="SKU">`),
        dRow("Barcode", false, `<div class="with-btn"><input name="barcode" value="${attr(p.barcode || "")}" placeholder="Barcode"><button type="button" class="btn btn-primary" style="height:44px;width:48px;padding:0;justify-content:center">${I.scan}</button></div>`),
        dRow("Category", true, `<select name="category" required><option value="">Select Category</option>${subcatOptions(p.category)}</select>`),
        dRow("Unit & Price", true, `<button type="button" class="unit-price-btn">Select Unit & Price</button>`),
        dRow("Unit", false, `<select name="unit">${unitOpts(p.unit || "Pc")}</select>`),
        dRow("Original Price", true, `<input name="price" type="number" min="0" step="0.01" value="${attr(p.price != null ? p.price : "")}" placeholder="0" required>`),
        dRow("Sale Price", false, `<input name="salePrice" type="number" min="0" step="0.01" value="${attr(p.salePrice != null ? p.salePrice : "")}" placeholder="0">`),
        dRow("GST Rate (%)", false, `<select name="gst">${[0, 5, 12, 18, 28].map((r) => `<option value="${r}" ${String(r) === String(p.taxRate || 0) ? "selected" : ""}>${r}%</option>`).join("")}</select>`),
        dRow("Opening Stock", false, `<input name="stockTotal" type="number" min="0" value="${attr(p.stockTotal != null ? p.stockTotal : "")}" placeholder="0">`),
        dRow("Minimum Stock Level", false, `<input name="minStock" type="number" min="0" value="${attr(p.minStock != null ? p.minStock : "")}" placeholder="0">`),
      ].join("");
    }
    function openAdd() {
      drawer({ title: "Add Product", subtitle: "Add your product and necessary information from here", saveLabel: "Add Product", body: productForm(),
        onSave: (f) => {
          if (!f.name.value.trim() || !f.category.value || !f.price.value) { toast("Title, category and price are required.", "err"); return false; }
          const top = SEED.categories.find((c) => (c.children || []).some((k) => k.name === f.category.value)) || SEED.categories.find((c) => c.name === f.category.value);
          const stock = +f.stockTotal.value || 0, rate = +f.gst.value;
          SEED.products.unshift({ id: "p-" + Date.now(), name: f.name.value.trim(), articleNo: f.articleNo.value.trim() || "NEW" + Math.floor(Math.random() * 9000 + 1000), category: f.category.value, categoryTop: top ? top.name : "Uncategorised", description: f.description.value.trim(), price: +f.price.value, salePrice: +f.salePrice.value || null, taxRate: rate, unit: f.unit.value, baseUnit: f.unit.value, stockTotal: stock, canSell: stock, inOrders: 0, barcode: f.barcode.value.trim(), brand: "Murli", active: true, img: "product", packaging: [{ unit: f.unit.value, tag: "Smallest Unit", conv: "1 " + f.unit.value, price: Math.round(+f.price.value * (1 + rate / 100) * 100) / 100 }] });
          state.page = 1; fillCat(); fillChips(); render(); toast(`"${f.name.value.trim()}" added`, "ok");
        } });
    }
    function openEdit(p) {
      drawer({ title: "Update Product", subtitle: p.name, saveLabel: "Update Product", body: productForm(p),
        onSave: (f) => {
          if (!f.name.value.trim() || !f.category.value || !f.price.value) { toast("Title, category and price are required.", "err"); return false; }
          const top = SEED.categories.find((c) => (c.children || []).some((k) => k.name === f.category.value)) || SEED.categories.find((c) => c.name === f.category.value);
          const rate = +f.gst.value;
          Object.assign(p, { name: f.name.value.trim(), articleNo: f.articleNo.value.trim(), category: f.category.value, categoryTop: top ? top.name : p.categoryTop, description: f.description.value.trim(), price: +f.price.value, salePrice: +f.salePrice.value || null, taxRate: rate, unit: f.unit.value, stockTotal: +f.stockTotal.value || 0, barcode: f.barcode.value.trim() });
          render(); toast("Product updated", "ok");
        } });
    }
    function bulkMenu(anchor) {
      const ids = [...state.selected];
      const need = () => { if (!ids.length) { toast("Select products first, then choose a bulk action.", "err"); return false; } return true; };
      popover(anchor, [
        { icon: I.edit, title: "Recategorize products", onClick: () => need() && toast(`Recategorize ${ids.length} product(s) (demo)`) },
        { icon: I.rupee, title: "Update prices", onClick: () => need() && toast(`Update prices for ${ids.length} product(s) (demo)`) },
        { icon: I.tag, title: "Assign tags", onClick: () => need() && toast(`Assign tags to ${ids.length} product(s) (demo)`) },
        { sep: true },
        { icon: I.trash, title: "Delete", danger: true, onClick: () => { if (!need()) return; confirmDelete({ bulk: true, count: ids.length, entity: "product", onConfirm: () => { SEED.products = SEED.products.filter((p) => !state.selected.has(p.id)); window.SEED.products = SEED.products; state.selected.clear(); fillChips(); render(); toast(`${ids.length} products deleted`, "ok"); } }); } },
      ]);
    }

    function render() {
      const rows = filtered();
      const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
      if (state.page > pages) state.page = pages;
      const slice = rows.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
      document.getElementById("chips").querySelectorAll(".chip-pill").forEach((c) => c.classList.toggle("active", c.dataset.t === state.tag));
      const list = document.getElementById("list");
      if (rows.length === 0) { list.innerHTML = emptyBlock("No products found", "Try another search term or clear the filters."); return; }
      const allChecked = slice.length && slice.every((p) => state.selected.has(p.id));

      const tbody = slice.map((p) => `<tr>
        <td><input class="checkbox row-check" type="checkbox" data-id="${p.id}" ${state.selected.has(p.id) ? "checked" : ""}></td>
        <td><div class="prod-cell">${thumb(p)}<div><div class="prod-name">${esc(p.name)}</div><div class="prod-art">Art No: ${esc(p.articleNo)}</div></div></div></td>
        <td><span class="cat-text">${esc(p.category)}</span></td>
        <td><div class="price-main">${money(p.price)}</div><div class="price-tax">${taxLabel(p.taxRate)}</div></td>
        <td><div><span class="stock-total">${p.stockTotal}</span> <span class="stock-unit">${esc(p.unit)}</span> <span class="stock-label">total stock</span></div>
          <div class="stock-sub"><span class="${p.canSell > 0 ? "ok" : "bad"}">${p.canSell} can sell</span><span class="dot">·</span><span class="${p.inOrders > 0 ? "warn" : "bad"}">${p.inOrders} in orders</span></div></td>
        <td><div class="row-actions"><button class="icon-btn" title="View" data-act="view" data-id="${p.id}">${I.eye}</button><button class="icon-btn" title="Edit" data-act="edit" data-id="${p.id}">${I.edit}</button><button class="icon-btn danger" title="Delete" data-act="del" data-id="${p.id}">${I.trash}</button></div></td>
      </tr>`).join("");

      const cards = slice.map((p) => `<div class="pcard">${thumb(p, 120)}<div class="body">
        <div class="top"><div><div class="prod-name">${esc(p.name)}</div><div class="prod-art">Art No: ${esc(p.articleNo)}</div></div><input class="checkbox row-check" type="checkbox" data-id="${p.id}" ${state.selected.has(p.id) ? "checked" : ""}></div>
        <div class="pc-meta"><span><span class="lbl">Category</span> <span class="cat-text">${esc(p.category)}</span></span><span><span class="lbl">Price</span> <span class="val">${money(p.price)}</span></span><span><span class="lbl">Stock</span> <span class="val">${p.stockTotal} ${esc(p.unit)}</span></span></div>
        <div class="stock-sub" style="margin-top:6px"><span class="${p.canSell > 0 ? "ok" : "bad"}">${p.canSell} can sell</span><span class="dot">·</span><span class="warn">${p.inOrders} in orders</span></div>
        <div class="pc-actions"><button class="btn" style="height:32px;font-size:12px" data-act="view" data-id="${p.id}">${I.eye}</button><button class="btn" style="height:32px;font-size:12px" data-act="edit" data-id="${p.id}">${I.edit}</button><button class="btn" style="height:32px;font-size:12px" data-act="del" data-id="${p.id}">${I.trash}</button></div>
      </div></div>`).join("");

      list.innerHTML = `
        <div class="table-wrap desktop-only"><div class="table-scroll"><table class="grid">
          <thead><tr><th><input class="checkbox" id="selall" type="checkbox" ${allChecked ? "checked" : ""}></th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>${tbody}</tbody></table>${pagerHTML(rows.length)}</div></div>
        <div class="cards">${cards}</div>`;
      mountPager(list, rows.length, state.page, (p) => { state.page = p; render(); window.scrollTo({ top: 0, behavior: "smooth" }); });

      list.querySelectorAll(".row-check").forEach((c) => c.addEventListener("change", () => { c.checked ? state.selected.add(c.dataset.id) : state.selected.delete(c.dataset.id); render(); }));
      document.getElementById("selall")?.addEventListener("change", (e) => { slice.forEach((p) => (e.target.checked ? state.selected.add(p.id) : state.selected.delete(p.id))); render(); });
      list.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
        const p = SEED.products.find((x) => x.id === b.dataset.id);
        if (b.dataset.act === "del") confirmDelete({ name: p.name, entity: "product", catalogues: 1, onConfirm: () => { SEED.products = SEED.products.filter((x) => x.id !== p.id); window.SEED.products = SEED.products; state.selected.delete(p.id); fillChips(); render(); toast(`"${p.name}" deleted`, "ok"); } });
        else if (b.dataset.act === "edit") openEdit(p);
        else productDetail(p, () => screenProducts());
      }));
      footer("Product", { onImport: (a) => importMenu(a, "Products"), onAdd: openAdd, onBulk: bulkMenu });
    }

    let deb;
    document.getElementById("q").addEventListener("input", (e) => { clearTimeout(deb); deb = setTimeout(() => { state.search = e.target.value; state.page = 1; render(); }, 200); });
    document.getElementById("cat").addEventListener("change", (e) => { state.category = e.target.value; state.page = 1; render(); });
    document.getElementById("add").addEventListener("click", openAdd);
    document.getElementById("export").addEventListener("click", (e) => exportMenu(e.currentTarget, "Products"));
    document.getElementById("import").addEventListener("click", (e) => importMenu(e.currentTarget, "Products"));
    document.getElementById("bulk").addEventListener("click", (e) => bulkMenu(e.currentTarget));
    document.getElementById("gsheet").addEventListener("click", () => toast("Google Sheet sync (demo)"));
    fillCat(); fillChips(); render();
  }

  /* =========================================================================
     PRODUCT DETAIL VIEW
     ========================================================================= */
  function productDetail(p, onBack) {
    const content = document.getElementById("content");
    const incl = p.packaging && p.packaging[0] ? p.packaging[0].price : Math.round(p.price * (1 + (p.taxRate || 0) / 100) * 100) / 100;
    const thumbs = Array.from({ length: 4 }, (_, i) => `<div class="t ${i === 0 ? "sel" : ""}">${I.imgph}</div>`).join("");
    const meta = [
      ["SKU / Article No.", p.articleNo], ["Category", p.category], ["Brand", p.brand || "Murli"],
      ["Unit (Smallest)", p.unit], ["Base Unit", p.baseUnit || p.unit], ["Barcode", p.barcode || "—"],
    ].map(([l, v]) => `<div class="m"><div class="lbl">${esc(l)}</div><div class="val">${esc(v)}</div></div>`).join("");
    const packRows = (p.packaging || []).map((u) => `<tr><td><b>${esc(u.unit)}</b><span class="unit-tag">${esc(u.tag)}</span></td><td>${esc(u.conv)}</td><td>${money(u.price)}</td></tr>`).join("");
    content.innerHTML = `
      <div class="detail-top"><button class="back" id="detailBack">${I.back}</button>
        <div class="breadcrumb">Product ${I.chevR ? "›" : ">"} <b>${esc(p.name)}</b></div>
        <div class="grow" style="flex:1"></div>
        <button class="btn btn-primary" id="detailEdit">${I.edit} Edit Product</button></div>
      <div class="detail-card">
        <div class="detail-gallery"><div class="big"><img src="${attr(imgUrl(p, 400))}" alt="${attr(p.name)}" onerror="this.closest('.big').classList.add('noimg');this.remove();"><span class="ph">${I.imgphL}</span></div><div class="detail-thumbs">${thumbs}</div></div>
        <div class="detail-info">
          <h1>${esc(p.name)} ${p.active ? '<span class="badge-active">Active</span>' : ""}</h1>
          <p class="detail-desc">${esc(p.description || "")}</p>
          <div class="detail-meta">${meta}</div>
          ${p.highMargin ? `<span class="detail-tag">High margin</span>` : ""}
        </div>
        <div class="detail-price"><div class="lbl">Selling Price (Incl. tax)</div><div class="big">${money(incl)}</div><div class="lbl">Tax Rate</div><div class="big" style="font-size:22px">${p.taxRate || 0}%</div></div>
      </div>
      <div class="detail-grid2">
        <div class="panel"><h3>${I.layers} Packaging &amp; Units</h3><table class="pack-table"><thead><tr><th>Unit</th><th>Conversion</th><th>Price (${p.taxRate || 0}% Incl. Tax)</th></tr></thead><tbody>${packRows}</tbody></table></div>
        <div class="panel"><h3>${I.pkg} Inventory Summary</h3><div class="inv-tiles">
          <div class="inv-tile"><div class="ic">${I.pkg}</div><div class="n">${p.stockTotal}</div><div class="l">Total Stock</div></div>
          <div class="inv-tile"><div class="ic">${I.check}</div><div class="n">${p.canSell}</div><div class="l">Available Stock</div></div>
          <div class="inv-tile warn"><div class="ic">${I.lock}</div><div class="n">${p.inOrders}</div><div class="l">Stock Reserved In Order</div></div>
        </div></div>
      </div>`;
    document.getElementById("detailBack").addEventListener("click", onBack);
    document.getElementById("detailEdit").addEventListener("click", () => toast("Edit Product drawer (demo)"));
    const mf = document.getElementById("mfooter"); if (mf) mf.remove();
  }

  /* =========================================================================
     SCREEN 2 — CATEGORIES
     ========================================================================= */
  function screenCategories() {
    const state = { search: "", showChild: false, page: 1, expanded: new Set() };
    const content = document.getElementById("content");
    content.innerHTML = `
      <div class="toolbar">
        <button class="btn" id="export">${I.upload} Export</button>
        <button class="btn" id="import">${I.download} Import</button>
        <div class="grow"></div>
        <button class="btn" id="gsheet">${I.sheet} Google Sheet</button>
        <button class="btn btn-primary" id="add">${I.plus} Add Category</button>
      </div>
      <div class="filters">
        <div class="search">${I.search}<input id="q" type="search" placeholder="Search by Category name"></div>
        <label class="toggle-wrap"><span class="switch ${state.showChild ? "on" : ""}" id="sw"></span> Show subcategories</label>
      </div>
      <div id="list"></div>`;

    function filtered() {
      const q = state.search.trim().toLowerCase();
      if (!q) return SEED.categories.map((c) => ({ ...c }));
      const out = [];
      SEED.categories.forEach((c) => {
        const pm = c.name.toLowerCase().includes(q) || (c.description || "").toLowerCase().includes(q);
        const kids = (c.children || []).filter((k) => k.name.toLowerCase().includes(q) || (k.description || "").toLowerCase().includes(q));
        if (pm) { out.push({ ...c }); if (kids.length) state.expanded.add(c.id); }
        else if (kids.length) { out.push({ ...c, children: kids }); state.expanded.add(c.id); }
      });
      return out;
    }
    function openAdd() {
      drawer({ title: "Add Category", subtitle: "Add your category and necessary information from here", saveLabel: "Add Category",
        body: [
          dRow("Name", true, `<input name="name" placeholder="Category name" required>`),
          dRow("Parent Category", false, `<select name="parent"><option value="">— None (top-level) —</option>${SEED.categories.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join("")}</select>`, "Leave empty to create a root category."),
          dRow("Description", false, `<textarea name="description" placeholder="Category description"></textarea>`),
          dRow("Category Icon", false, imgGrid),
        ].join(""),
        onSave: (f) => {
          if (!f.name.value.trim()) { toast("Category name is required.", "err"); return false; }
          const name = f.name.value.trim(), desc = f.description.value.trim(), pid = f.parent.value;
          if (pid) { const par = SEED.categories.find((c) => c.id === pid); par.children = par.children || []; par.children.push({ id: "cat-" + Date.now(), name, description: desc, productCount: 0 }); par.productCount = (par.productCount || 0); state.expanded.add(pid); }
          else SEED.categories.push({ id: "cat-" + Date.now(), name, description: desc, parent: null, productCount: 0, children: [] });
          render(); toast(`Category "${name}" added`, "ok");
        } });
    }
    function render() {
      const all = filtered();
      const pages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
      if (state.page > pages) state.page = pages;
      const slice = all.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
      document.getElementById("sw").classList.toggle("on", state.showChild);
      const list = document.getElementById("list");
      if (all.length === 0) { list.innerHTML = emptyBlock("No categories found", `No categories match "${esc(state.search)}".`); return; }

      let rows = "", cards = "";
      slice.forEach((c) => {
        const hasKids = (c.children || []).length > 0;
        const open = state.showChild && hasKids && state.expanded.has(c.id);
        rows += `<tr class="cat-parent-row"><td><div class="cat-parent-name">${state.showChild && hasKids ? `<button class="cat-caret ${open ? "open" : ""}" data-toggle="${c.id}">${I.chevR}</button>` : `<span style="width:22px;display:inline-block"></span>`}<input class="checkbox" type="checkbox" style="margin-right:2px">${esc(c.name)}</div></td>
          <td>${esc(c.description)}</td><td><span class="pill-root">Root Category</span></td>
          <td><span class="badge-num">${I.pkg} ${c.productCount || 0}</span></td>
          <td><div class="row-actions"><button class="icon-btn" data-act="edit" data-id="${c.id}">${I.edit}</button><button class="icon-btn danger" data-act="del" data-id="${c.id}">${I.trash}</button></div></td></tr>`;
        if (open) (c.children || []).forEach((k) => {
          rows += `<tr class="cat-child-row"><td><div class="cat-child-name">${esc(k.name)}</div></td><td>${esc(k.description)}</td><td><span class="pill-root">${esc(c.name)}</span></td><td><span class="badge-num">${I.pkg} ${k.productCount || 0}</span></td><td><div class="row-actions"><button class="icon-btn" data-act="edit-child" data-id="${k.id}">${I.edit}</button><button class="icon-btn danger" data-act="del-child" data-parent="${c.id}" data-id="${k.id}">${I.trash}</button></div></td></tr>`;
        });
        cards += `<div class="pcard" style="flex-direction:column;gap:6px"><div style="display:flex;justify-content:space-between;align-items:center"><div class="prod-name">${esc(c.name)}</div><span class="badge-num">${I.pkg} ${c.productCount || 0}</span></div><div class="prod-art">${esc(c.description || "Root Category")}</div>${state.showChild && hasKids ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">${(c.children || []).map((k) => `<span class="chip-cat">${esc(k.name)} · ${k.productCount || 0}</span>`).join("")}</div>` : ""}</div>`;
      });

      list.innerHTML = `
        <div class="table-wrap desktop-only"><div class="table-scroll"><table class="grid">
          <thead><tr><th>Name</th><th>Description</th><th>Parent Category</th><th>Products</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>${rows}</tbody></table>${pagerHTML(all.length)}</div></div>
        <div class="cards">${cards}</div>`;
      mountPager(list, all.length, state.page, (p) => { state.page = p; render(); });

      list.querySelectorAll("[data-toggle]").forEach((b) => b.addEventListener("click", () => { const id = b.dataset.toggle; state.expanded.has(id) ? state.expanded.delete(id) : state.expanded.add(id); render(); }));
      list.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
        const act = b.dataset.act;
        if (act === "del") { const c = SEED.categories.find((x) => x.id === b.dataset.id); confirmDelete({ name: c.name, entity: "category", onConfirm: () => { SEED.categories = SEED.categories.filter((x) => x.id !== c.id); window.SEED.categories = SEED.categories; render(); toast(`Category "${c.name}" deleted`, "ok"); } }); }
        else if (act === "del-child") { const par = SEED.categories.find((x) => x.id === b.dataset.parent); const k = par.children.find((x) => x.id === b.dataset.id); confirmDelete({ name: k.name, entity: "category", onConfirm: () => { par.children = par.children.filter((x) => x.id !== b.dataset.id); render(); toast(`"${k.name}" deleted`, "ok"); } }); }
        else toast("Edit category drawer (demo)");
      }));
      footer("Category", { onImport: (a) => importMenu(a, "Categories"), onAdd: openAdd });
    }
    let deb;
    document.getElementById("q").addEventListener("input", (e) => { clearTimeout(deb); deb = setTimeout(() => { state.search = e.target.value; state.page = 1; render(); }, 200); });
    document.getElementById("sw").addEventListener("click", () => { state.showChild = !state.showChild; if (state.showChild) SEED.categories.forEach((c) => state.expanded.add(c.id)); render(); });
    document.getElementById("add").addEventListener("click", openAdd);
    document.getElementById("export").addEventListener("click", (e) => exportMenu(e.currentTarget, "Categories"));
    document.getElementById("import").addEventListener("click", (e) => importMenu(e.currentTarget, "Categories"));
    document.getElementById("gsheet").addEventListener("click", () => toast("Google Sheet sync (demo)"));
    render();
  }

  /* =========================================================================
     SCREEN 3 — RAW MATERIALS
     ========================================================================= */
  function screenRawMaterials() {
    const state = { search: "", category: "", page: 1, selected: new Set() };
    const cats = () => [...new Set(SEED.rawMaterials.map((r) => r.category))];
    const content = document.getElementById("content");
    content.innerHTML = `
      <div class="toolbar">
        <button class="btn" id="export">${I.upload} Export</button>
        <button class="btn" id="import">${I.download} Import</button>
        <button class="btn" id="bulk">${I.bulk} Bulk Action <span class="caret">${I.chev}</span></button>
        <div class="grow"></div>
        <button class="btn btn-primary" id="add">${I.plus} Add Raw Material</button>
      </div>
      <div class="filters">
        <div class="search">${I.search}<input id="q" type="search" placeholder="Search Raw Material"></div>
        <select class="filter desktop-filter" id="cat"></select>
      </div>
      <div id="list"></div>`;

    function fillCat() { document.getElementById("cat").innerHTML = `<option value="">Select Category</option>` + cats().map((c) => `<option value="${attr(c)}" ${c === state.category ? "selected" : ""}>${esc(c)}</option>`).join(""); }
    function filtered() {
      const q = state.search.trim().toLowerCase();
      return SEED.rawMaterials.filter((r) => {
        if (state.category && r.category !== state.category) return false;
        if (!q) return true;
        return r.name.toLowerCase().includes(q) || String(r.articleNo).toLowerCase().includes(q);
      });
    }
    function openAdd() {
      drawer({ title: "Add Raw Material", subtitle: "Add your raw material and necessary information from here", saveLabel: "Add Raw Material",
        body: [
          dRow("Article No", false, `<div class="with-btn"><input name="articleNo" placeholder="Article No"><button type="button" class="btn btn-primary" data-generate="articleNo" style="height:44px">Generate</button></div>`),
          dRow("Title/Name", true, `<input name="name" placeholder="Title/Name" required>`),
          dRow("Description", false, `<textarea name="description" placeholder="Description"></textarea>`),
          dRow("Images", false, imgGrid),
          dRow("HSN/SAC", false, `<input name="hsn" placeholder="HSN/SAC">`),
          dRow("Barcode", false, `<div class="with-btn"><input name="barcode" placeholder="Barcode"><button type="button" class="btn btn-primary" style="height:44px;width:48px;padding:0;justify-content:center">${I.scan}</button></div>`),
          dRow("Category", true, `<select name="category"><option value="">Select Category</option>${subcatOptions()}<option value="Raw Material">Raw Material</option><option value="Packaging">Packaging</option></select>`),
          dRow("Unit &amp; Price", true, `<button type="button" class="unit-price-btn">Select Unit &amp; Price</button>`),
          dRow("Unit", false, `<select name="unit">${unitOpts("KG")}</select>`),
          dRow('Purchasing Price <i class="info-i">i</i>', false, `<input name="price" type="number" min="0" step="0.01" placeholder="0" required>`),
          dRow("Opening Stock", false, `<input name="stockTotal" type="number" min="0" placeholder="0">`),
        ].join(""),
        onSave: (f) => {
          if (!f.name.value.trim() || !f.price.value) { toast("Title and purchasing price are required.", "err"); return false; }
          SEED.rawMaterials.unshift({ id: "rm-" + Date.now(), name: f.name.value.trim(), articleNo: f.articleNo.value.trim() || "RM" + Math.floor(Math.random() * 9000 + 1000), category: f.category.value || "Raw Material", img: "raw,material", purchasingPrice: +f.price.value, taxRate: 0, unit: f.unit.value, stockTotal: +f.stockTotal.value || 0 });
          state.page = 1; fillCat(); render(); toast(`"${f.name.value.trim()}" added`, "ok");
        } });
    }
    function bulkMenu(anchor) {
      const ids = [...state.selected];
      const need = () => { if (!ids.length) { toast("Select raw materials first, then choose a bulk action.", "err"); return false; } return true; };
      popover(anchor, [
        { icon: I.edit, title: "Recategorize raw materials", onClick: () => need() && toast(`Recategorize ${ids.length} item(s) (demo)`) },
        { sep: true },
        { icon: I.trash, title: "Delete", danger: true, onClick: () => { if (!need()) return; confirmDelete({ bulk: true, count: ids.length, entity: "raw material", onConfirm: () => { SEED.rawMaterials = SEED.rawMaterials.filter((r) => !state.selected.has(r.id)); window.SEED.rawMaterials = SEED.rawMaterials; state.selected.clear(); render(); toast(`${ids.length} raw materials deleted`, "ok"); } }); } },
      ]);
    }
    function render() {
      const rows = filtered();
      const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
      if (state.page > pages) state.page = pages;
      const slice = rows.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
      const list = document.getElementById("list");
      if (rows.length === 0) { list.innerHTML = emptyBlock("No raw materials found", "Try another search term or clear the filters."); return; }
      const allChecked = slice.length && slice.every((r) => state.selected.has(r.id));
      const tbody = slice.map((r) => `<tr>
        <td><input class="checkbox row-check" type="checkbox" data-id="${r.id}" ${state.selected.has(r.id) ? "checked" : ""}></td>
        <td><div class="prod-cell">${thumb(r)}<div><div class="prod-name">${esc(r.name)}</div><div class="prod-art">Art No: ${esc(r.articleNo)}</div></div></div></td>
        <td><span class="cat-text">${esc(r.category)}</span></td>
        <td><div class="price-main">${money(r.purchasingPrice)}</div><div class="price-tax">${taxLabel(r.taxRate)}</div></td>
        <td><span class="stock-total">${r.stockTotal}</span> <span class="stock-unit">${esc(r.unit)}</span> <span class="stock-label">total stock</span></td>
        <td><div class="row-actions"><button class="icon-btn" data-act="view" data-id="${r.id}">${I.eye}</button><button class="icon-btn" data-act="edit" data-id="${r.id}">${I.edit}</button><button class="icon-btn danger" data-act="del" data-id="${r.id}">${I.trash}</button></div></td>
      </tr>`).join("");
      const cards = slice.map((r) => `<div class="pcard">${thumb(r, 120)}<div class="body">
        <div class="top"><div><div class="prod-name">${esc(r.name)}</div><div class="prod-art">Art No: ${esc(r.articleNo)}</div></div><input class="checkbox row-check" type="checkbox" data-id="${r.id}" ${state.selected.has(r.id) ? "checked" : ""}></div>
        <div class="pc-meta"><span><span class="lbl">Category</span> <span class="cat-text">${esc(r.category)}</span></span><span><span class="lbl">Purchasing</span> <span class="val">${money(r.purchasingPrice)}</span></span><span><span class="lbl">Stock</span> <span class="val">${r.stockTotal} ${esc(r.unit)}</span></span></div>
        <div class="pc-actions"><button class="btn" style="height:32px;font-size:12px" data-act="edit" data-id="${r.id}">${I.edit}</button><button class="btn" style="height:32px;font-size:12px" data-act="del" data-id="${r.id}">${I.trash}</button></div>
      </div></div>`).join("");
      list.innerHTML = `
        <div class="table-wrap desktop-only"><div class="table-scroll"><table class="grid">
          <thead><tr><th><input class="checkbox" id="selall" type="checkbox" ${allChecked ? "checked" : ""}></th><th>Name</th><th>Category</th><th>Purchasing Price</th><th>Stock</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>${tbody}</tbody></table>${pagerHTML(rows.length)}</div></div>
        <div class="cards">${cards}</div>`;
      mountPager(list, rows.length, state.page, (p) => { state.page = p; render(); });
      list.querySelectorAll(".row-check").forEach((c) => c.addEventListener("change", () => { c.checked ? state.selected.add(c.dataset.id) : state.selected.delete(c.dataset.id); render(); }));
      document.getElementById("selall")?.addEventListener("change", (e) => { slice.forEach((r) => (e.target.checked ? state.selected.add(r.id) : state.selected.delete(r.id))); render(); });
      list.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
        const r = SEED.rawMaterials.find((x) => x.id === b.dataset.id);
        if (b.dataset.act === "del") confirmDelete({ name: r.name, entity: "raw material", onConfirm: () => { SEED.rawMaterials = SEED.rawMaterials.filter((x) => x.id !== r.id); window.SEED.rawMaterials = SEED.rawMaterials; state.selected.delete(r.id); render(); toast(`"${r.name}" deleted`, "ok"); } });
        else toast(`${b.dataset.act === "edit" ? "Edit" : "View"} "${r.name}" (demo)`);
      }));
      footer("Raw Material", { onImport: (a) => importMenu(a, "Raw Materials"), onAdd: openAdd, onBulk: bulkMenu });
    }
    let deb;
    document.getElementById("q").addEventListener("input", (e) => { clearTimeout(deb); deb = setTimeout(() => { state.search = e.target.value; state.page = 1; render(); }, 200); });
    document.getElementById("cat").addEventListener("change", (e) => { state.category = e.target.value; state.page = 1; render(); });
    document.getElementById("add").addEventListener("click", openAdd);
    document.getElementById("export").addEventListener("click", (e) => exportMenu(e.currentTarget, "Raw Materials"));
    document.getElementById("import").addEventListener("click", (e) => importMenu(e.currentTarget, "Raw Materials"));
    document.getElementById("bulk").addEventListener("click", (e) => bulkMenu(e.currentTarget));
    fillCat(); render();
  }

  // ── Pager helpers (rendered inside .table-wrap) ───────────────────────────
  function pagerHTML() { return `<div class="pagerslot"></div>`; }
  function mountPager(root, total, page, onGo) { const slot = root.querySelector(".pagerslot"); if (slot) slot.replaceWith(pager(total, page, onGo)); }

  function footer(label, h) {
    let f = document.getElementById("mfooter");
    if (!f) { f = document.createElement("div"); f.className = "mobile-footer"; f.id = "mfooter"; document.querySelector(".main").appendChild(f); }
    f.innerHTML = `<button class="mf-btn" data-mf="import"><span class="mf-ic">${I.upload}</span>Import</button><button class="mf-btn primary" data-mf="add"><span class="mf-ic">${I.plus}</span>${label}</button>${h.onBulk ? `<div class="mf-divider"></div><button class="mf-btn" data-mf="bulk"><span class="mf-ic">${I.bulk}</span>Bulk</button>` : ""}`;
    f.querySelector('[data-mf="import"]').addEventListener("click", (e) => h.onImport(e.currentTarget));
    f.querySelector('[data-mf="add"]').addEventListener("click", () => h.onAdd());
    if (h.onBulk) f.querySelector('[data-mf="bulk"]').addEventListener("click", (e) => h.onBulk(e.currentTarget));
  }

  const TITLES = { products: "All Products", categories: "Categories", "raw-materials": "Raw Materials" };
  window.FB = { mount(screen) {
    document.getElementById("app").innerHTML = shell(screen, TITLES[screen]);
    wireShell();
    if (screen === "products") screenProducts();
    else if (screen === "categories") screenCategories();
    else if (screen === "raw-materials") screenRawMaterials();
  } };
})();
