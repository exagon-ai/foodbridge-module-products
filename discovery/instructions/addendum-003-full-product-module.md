# Addendum 003 — Full Product Module (Add/Edit fields, Unit & Price, Detail, Import, mobile)

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-07-27

**Inputs:** 19 screenshots, `inputs/ProductModuleItteration/As-is/2026-07-27-*.png` (provided by
rakesh@foodbridge.io, captured 2026-07-27) with grouped text derivative
[`2026-07-27-product-module-full-walkthrough.annotation.md`](./inputs/ProductModuleItteration/As-is/2026-07-27-product-module-full-walkthrough.annotation.md).

## Ask

Analyse the fuller As-is walkthrough (Add Product form, Unit & Price sub-modal, list toolbar
menus, import flow, Product Detail with packaging/inventory, and mobile equivalents of all of the
above) and bring the discovery prototype (`screen-01.html`…`screen-04.html`, currently modelling
only the bare list/add/view/edit loop from Addendum 002) up to match — same fields, same
terminology, same workflows.

## Analysis summary (R3)

Full per-screenshot element inventory is in the annotation; condensed here:

| Screenshot group | As-is finding | Prototype gap today |
| --- | --- | --- |
| Add Product modal | 13 fields: Article No (+Generate), Title/Name*, Description, Images ×4, HSN/SAC, Barcode (+scan), Category* (searchable), Unit & Price* (opens sub-modal), Price (derived/read-only), Opening Stock, Product Coverage (radio: None/Warranty/Guarantee), Brand | `screen-02.html` only has name, art no, category, price, tax, opening stock, unit — 7 of 13 fields missing entirely |
| Unit & Price sub-modal | Nested modal: Smallest Unit + Base Unit (searchable/creatable selects), conversion ("1 BASE = N SMALLEST"), GST Rate %, GST Treatment (Included/Added Separately), Selling Price per smallest unit + per base unit (auto-derived) | Not modelled at all — current form has a single flat `price` + `tax:{mode,percent}`, no multi-unit concept |
| List toolbar | Export → Excel/CSV; Import → file/directory picker → Preview Product modal (parsed-row grid) → Import; Sample → Excel/CSV sample download; Category filter as a custom dropdown (not native `<select>`) | `screen-01.html` stubs Export/Import/Import Images/Google Sheet behind a single "not part of this iteration" alert; category filter is a native `<select>` |
| Bulk selection | Header + row checkboxes present; bulk-action bar state not captured but implied by the affordance | Checkboxes render but do nothing — no bulk bar |
| Product Detail | Image gallery + click-to-zoom lightbox; SKU/Category/Brand/Unit/Base Unit/Barcode fields; Packaging & Units table (per-unit conversion + price); Inventory Summary tiles (Total/Available/Reserved-in-order); "More Actions" menu (Copy SKU, Copy barcode) | `screen-03.html` has a flat 6-item detail grid, no packaging table, no inventory tiles, no image gallery/lightbox, no More Actions |
| Mobile | Cards (not table) with status badges (Out of Stock / Low Stock) absent from desktop; condensed 3-item bottom action bar (Import/Export · Images · +Product) replacing 5 desktop buttons; category filter as horizontal pill row instead of dropdown | No responsive treatment exists yet — screens are desktop-only |

## Decision

Extend the existing 4-screen structure in place (still HTML/CSS/vanilla JS, still `screen-01.html`
… `screen-04.html`, still localStorage-backed) rather than forking a parallel screen set. The
prior multi-screen (not single-screen-with-modals) decision from
[design-principles §5](../design-principles.md#5-decisions-carried-into-development) stands and is
**not** reopened here — List, Add, Detail, and Edit stay four distinct pages/URLs. What's new in
this iteration is everything *within* those four pages:

| # | Decision | Notes |
| - | -------- | ----- |
| D1 | Add/Edit gain the full field set (Description, Images ×4, HSN/SAC, Barcode+scan, searchable Category, Unit & Price, derived Price, Opening Stock, Product Coverage, Brand) | Images/scan/Generate are visual stubs (no real upload/camera/scan pipeline in discovery) |
| D2 | Unit & Price becomes a real nested sub-modal opened from Add/Edit (Smallest Unit, Base Unit, conversion, GST Rate/Treatment, per-unit selling prices) | Doesn't reopen the page-vs-modal decision — it's a secondary step inside an already-a-page flow, same nesting pattern the As-is itself uses |
| D3 | Category (list filter + Add/Edit field) becomes a custom searchable single-select dropdown, replacing the native `<select>` | Matches the observed component; same category source list |
| D4 | Detail gains Packaging & Units (derived from the product's unit/conversion/price data), Inventory Summary tiles (relabelled from the existing `stock.qty/canSell/inOrders` — no data-shape break), More Actions menu (clipboard-copy stubs), image gallery + lightbox | Tile labels: Total Stock ← `qty`, Available Stock ← `canSell`, Stock Reserved In Order ← `inOrders` |
| D5 | List toolbar's Export/Sample become real dropdown menus with stub actions (alert "would download …" — no file generation in discovery); Import gets an actual mini-flow (pick file → Preview Product modal seeded with illustrative parsed rows → Import commits them into the store) | |
| D6 | Bulk-selection gains a bulk-action bar on ≥1 checked row, with **Bulk Delete** only | Bulk Update has no screenshot evidence of its form — stays an alert stub, flagged as an assumption not a confirmed gap |
| D7 | Responsive layout on the same 4 screens/URLs (not a parallel mobile screen set): sidebar collapses, list becomes cards with status badges (Out of Stock / Low Stock) below a breakpoint, toolbar condenses to a 3-item sticky bottom bar | Per the human's original ask to "maintain same workflow across all devices" |
| D8 | "Import Images", "Google Sheet", Duplicate Product, and Status Change stay out of scope / alert-stubs | Zero screenshot evidence of their actual UI in this input set — inventing one would misrepresent the As-is, not replicate it |

## Outcome

Built in place on `screen-01.html`…`screen-04.html` + new `screen-05.html` (Import) + a large
`shared.js`/`shared.css` expansion (custom searchable-select component, generic modal/menu
helpers, a shared `mountProductForm()` used by both Add and Edit so the two field sets cannot
drift apart, packaging/inventory formatting, clipboard + toast helpers, responsive breakpoint at
760px) + `seed-data/seed.json` extended with `unit{}`, `images[]`, `hsnSac`, `barcode`, `brand`,
`coverage`, `description` on every product (added a `p-15` row that mirrors the exact As-is
"Milk Bread 200gm" example — a103 / ₹15.75 / Box=20 Pcs / Pallet=1 Box / 5% incl. tax — for direct
fidelity comparison against the screenshots). `../index.html` wiring hub and transition map
updated for the new screen and events. Sidebar nav in `shared.js` also corrected to the fuller
list observed in this iteration's list screenshot (see design-principles.md note).

**Verified** with a scripted Playwright-over-`google-chrome` smoke pass (desktop 1400px + mobile
375px viewports; no `chromium-cli` available in this environment, so `playwright-core` was pointed
at the system Chrome instead): list loads 15 seeded products; Export/Import/Sample menus open;
category custom-select filters the list; multi-select shows the bulk bar and Bulk Delete works;
Add Product → Unit & Price sub-modal (unit selects, conversion, GST, price auto-derivation
50×10=500) → Save → submit → redirects to the list with the new row; Product Detail renders
Packaging & Units (3-tier) and Inventory Summary panels, image click opens the lightbox, More
Actions exposes Copy SKU / Copy barcode / Delete; Import → Preview Product modal (2 rows, matching
the As-is capture) → Import commits and redirects; mobile viewport renders the card list with
status badges and the sticky bottom bar, hamburger opens the slide-out sidebar. Zero console
errors (only a harmless `favicon.ico` 404). Screenshots retained at
`/tmp/claude-1000/.../scratchpad/pw/shots/` for this session only — not part of the repo.

Not yet marked as an accepted version (R6) — pending human review of this iteration, same as
Addendum 002.
