# Annotation — Product Module full walkthrough (2026-07-27)

> Text derivative (SPEC §12.5, README rule 2) for a **grouped** set of 19 screenshots dropped by
> rakesh@foodbridge.io on 2026-07-25 (files timestamped 2026-07-27 in this folder), covering the
> Product module far beyond the single list screen analysed in
> [Addendum 002](../../addendum-002-as-is-products-list.md). One derivative file covers the set
> because the 19 captures are a single continuous walkthrough (list → add → unit/price sub-modal →
> list toolbar menus → import → mobile equivalents → detail), not 19 independent inputs — noted
> as a deviation from "one derivative per source" for traceability.

Consumed by [Addendum 003](../../addendum-003-full-product-module.md).

## Source files (renamed to convention; originals were `Screenshot from 2026-07-27 HH-MM-SS.png`)

| # | File | Page / state captured | Viewport |
| - | ---- | ---------------------- | -------- |
| 1 | `2026-07-27-products-list-desktop.png` | All Products — list | Desktop |
| 2 | `2026-07-27-add-product-modal-top.png` | Add Product modal — top of form | Desktop |
| 3 | `2026-07-27-add-product-modal-scrolled.png` | Add Product modal — scrolled | Desktop |
| 4 | `2026-07-27-unit-price-modal-smallest-unit-dropdown.png` | Add Pricing and Unit Details sub-modal — Smallest Unit dropdown open | Desktop |
| 5 | `2026-07-27-unit-price-modal-base-unit-dropdown.png` | Add Pricing and Unit Details sub-modal — Base Unit dropdown open | Desktop |
| 6 | `2026-07-27-unit-price-modal-tax-settings.png` | Add Pricing and Unit Details sub-modal — conversion + tax settings | Desktop |
| 7 | `2026-07-27-unit-price-modal-filled.png` | Add Pricing and Unit Details sub-modal — prices entered | Desktop |
| 8 | `2026-07-27-products-list-category-filter.png` | All Products — "Select Category" dropdown open | Desktop |
| 9 | `2026-07-27-products-list-export-dropdown.png` | All Products — Export menu open | Desktop |
| 10 | `2026-07-27-products-list-import-dropdown.png` | All Products — Import menu open | Desktop |
| 11 | `2026-07-27-import-preview-modal.png` | Preview Product (import) modal | Desktop |
| 12 | `2026-07-27-products-list-sample-dropdown.png` | All Products — Sample menu open | Desktop |
| 13 | `2026-07-27-mobile-products-list.png` | All Products — list | Mobile |
| 14 | `2026-07-27-mobile-update-product-modal.png` | Update Product modal | Mobile |
| 15 | `2026-07-27-mobile-product-detail-top.png` | Product Detail — top | Mobile |
| 16 | `2026-07-27-mobile-product-detail-packaging-inventory.png` | Product Detail — Packaging & Units / Inventory Summary | Mobile |
| 17 | `2026-07-27-product-detail-desktop.png` | Product Detail — full page | Desktop |
| 18 | `2026-07-27-product-detail-more-actions-dropdown.png` | Product Detail — "More Actions" menu open | Desktop |
| 19 | `2026-07-27-product-detail-image-lightbox.png` | Product Detail — image lightbox open | Desktop |

## 1. All Products (desktop) — files #1, #8, #9, #10, #12

| Element type | Instances |
| --- | --- |
| Page name | "All Products" (topbar h1, store = "QA store / QA ENV · qaenv") |
| Breadcrumb | None on this screen |
| Sidebar (nav) | Dashboard; **Products** (expanded: All Products[active], Categories, Raw Materials); Customers (expanded: B2B Customers, Retail Customers); Manage Routes; Order; Deliveries; Route Delivery; Returns (expanded: Order Returns, Logistic Returns); Inventory (expanded: Live Stock, Expiry Report); Purchase (collapsed, cut off); Route Delivery (2nd instance, lower); Store QR Code |
| Header / topbar | Store switcher "QA store / QA ENV · qaenv ▾" (left); hamburger + page title "All Products" (center-left); user chip "QA admin / Admin ▾" with green avatar (right) |
| Buttons (toolbar, left) | "⇪ Export" · "⇩ Import" · "⇩ Sample" · "▦ Import Images" |
| Buttons (toolbar, right) | "+ Add Product" (primary, green) |
| Dropdowns / action menus | **Export** → "Export to Excel", "Export to CSV" (file-icon rows); **Import** → "Select Your Product File" (upload icon), "Import from Directory" (globe icon); **Sample** → "Download Excel Sample", "Download CSV Sample"; **Select Category** (top-right of filter row) → single-select list: Bread (highlighted/selected), Donut, Toast, Cream Roll, Cookies, Cake, Sandwich |
| Search bar | "🔍 Search Product" — full-width text input, left of category select |
| Filters | Search box (name / art no, inferred) + Select Category dropdown |
| Table | Columns: checkbox · NAME (thumbnail + name + "Art No: …") · CATEGORY · PRICE (+ tax sub-line) · STOCK (qty + unit "total stock", sub-line "X can sell · Y in orders") · ACTIONS. 12+ rows visible (Milk Bread 200gm/350gm, Brown Bread 250gm/350gm, Kaju Bread 160gm, Special Bread 600gm, Fruit Bun 04pcs, Pizza Base 250gm, Burger Base 250gm, Paw Bread 06pcs/09pcs, Jumbo Bread 700gm…) |
| Checkboxes | Header "select all" + one per row (bulk-selection affordance; no bulk action bar observed while unchecked — state not captured) |
| Cards | None (table-based list, not card-based on desktop) |
| Icons | Row actions: eye (view), pencil (edit), trash (delete) — icon-only, right-aligned per row |
| Status badges | None on the list rows themselves; stock sub-line colour-codes "can sell" (green) and "in orders" (orange when >0, grey/muted at 0) |
| Pagination | Not visible in the captured viewport (list scrolls past the fold) — unconfirmed, flagged as open question |
| Empty / loading state | Not captured |
| Thumbnails | Mixed treatment across rows: real photo, generic picture-frame icon, lock icon, and a placeholder tile with faint grid pattern — same inconsistency already flagged in Addendum 002/design-principles §4 |

## 2. Add Product modal — files #2, #3

| Element type | Instances |
| --- | --- |
| Page name / modal title | "Add Product" — subtitle "Add your product and necessary information from here" |
| Form | Single scrolling modal over the list (list dimmed behind it), close "✕" top-right |
| Fields (in order) | Article No (text + inline "Generate" button, green); Title/Name * (required, red asterisk); Description (textarea); Images (4 empty upload tiles, each a dashed square with a "+" add icon — no image yet); HSN/SAC (text); Barcode (text + green scan-icon button beside it); Category * (searchable select, placeholder "Select Category"); Unit & Price * (button "Select Unit & Price", opens sub-modal — see §3); Price (number, disabled/read-only styling, ⓘ info icon beside label, driven by Unit & Price sub-modal); Opening Stock (number, default 0); Product Coverage (radio: "No Coverage" [default selected], "Warranty Coverage", "Guarantee Coverage" — helper text "Select warranty or guarantee coverage for this product"); Brand (text, placeholder "Enter product brand") |
| Buttons | Primary "Add Product" (green, full-width-ish, bottom-left); "Cancel" (text button, bottom-right, red text) |
| Validation | Required markers (*) on Title/Name, Category, Unit & Price — no inline error observed (not triggered in captures) |
| Icons | "+" add-image icon ×4; scan icon (barcode); ⓘ info icon (Price) |

## 3. Add Pricing and Unit Details (sub-modal) — files #4, #5, #6, #7

| Element type | Instances |
| --- | --- |
| Page name / modal title | "Add Pricing and Unit Details" — subtitle "Configure selling units, conversion quantities, GST treatment, and prices." — nested over the Add Product modal, own "✕" close |
| Form fields | **Smallest Unit** * (searchable dropdown, helper "e.g. Bottle, Piece, KG"; options seen: Loaf, Matka, Pc, Packet, Jaar, Kg, Ltr…); **Base Unit** * (searchable dropdown, helper "e.g. Box, Carton, Dozen"; options seen: Pack, Jar, Box, Gunny Bag, Can, **+ Add new**); conversion row "How many {SMALLEST} per {BASE}?" rendered dynamically once both units chosen, e.g. "1 PACK = [1] LOAF"; **Tax Settings** group box — "GST Rate (%)" dropdown (e.g. 0%) + "GST Treatment" radio-card pair: "Included in Price" (helper "Price already includes GST.") vs "Added Separately" (helper "GST will be added on top."); **Selling Price Per {SMALLEST}** (currency input, ₹ prefix); **Selling Price Per {BASE}** (currency input, ₹ prefix, auto-derives from conversion × unit price when smallest-unit price is entered — observed: entering ₹100 per LOAF auto-filled ₹100.00 per PACK at a 1:1 conversion) |
| Buttons | "SAVE" (full-width, blue — the only place a blue primary button appears; every other primary action in the module is green) |
| Dropdowns | Smallest Unit, Base Unit — both searchable/creatable selects with a scrollable option list |
| Icons | ⓘ info icons beside "Smallest Unit", "Base Unit", "How many X per Y", "Selling Price Per X" labels |

## 4. All Products (mobile) — file #13

| Element type | Instances |
| --- | --- |
| Page name | "📦 All Products" (green box icon + title, left-aligned, larger than desktop h1) |
| Header | Hamburger (left) · "QA ENV / qaenv ▾" (store switcher, center) · "QA admin / Admin ▾" (right, stacked two lines) |
| Search bar | "🔍 Search Product" full-width |
| Filters | Horizontal scrollable pill/chip row replacing the desktop dropdown: "All" (selected, filled green), "Bread", "Donut", "Toast", "Cream Roll", "Coo…" (cut off, more scroll) |
| Cards | One card per product (replaces table): thumbnail (left) + name/art-no/category badge (center) + status badge + price (right); second row of the card: stock total / can sell / in orders (3-column) + view/edit/delete icon row |
| Status badges | "● Out of Stock" (red pill, top-right of card) on 0-stock items; "● Low Stock" (red/orange pill) on the low-stock item — a badge not present at all on the desktop list, which only colour-codes the stock sub-line |
| Icons | Per-card: eye / pencil / trash (same trio as desktop, smaller) |
| Bottom nav / action bar | Sticky bottom bar, 3 items: "⬆ Import/Export", "🖼 Images", "+ Product" (green pill) — a mobile-specific condensed toolbar replacing the desktop's 5 separate buttons |
| Pagination | Not visible (card list scrolls) |
| Browser chrome | iOS Safari frame visible (address bar "b2bgreens.com", nav arrows, share/bookmark icons) — capture artifact, not part of the app UI |

## 5. Update Product modal (mobile) — file #14

| Element type | Instances |
| --- | --- |
| Page name / modal title | "Update Product" — subtitle "Update product and necessary information from here" |
| Fields | Article No (+ "Generate" button); Title/Name * (pre-filled "Milk Bread 200gm"); Description (textarea, empty); Images — 2 filled slots (each with a small pencil/edit badge + a red "✕" remove badge, top corners) + 2 empty "+" add slots; HSN/SAC (empty) |
| Buttons | "Update Product" (primary, green, full-width) / "Cancel" (secondary, full-width) — stacked full-width instead of desktop's inline pair |
| Difference from Add | Title says "Update" not "Add"; images pre-populated with edit/remove affordances; otherwise same field set/order as Add Product |

## 6. Product Detail (mobile) — files #15, #16

| Element type | Instances |
| --- | --- |
| Page name | "Product" (header) |
| Breadcrumb | "Product › **Milk Bread 200gm**" (current page bold, not a link) |
| Cards | Hero image card (full-width) + thumbnail strip below (2 thumbnails, first selected with green border) |
| Status badges | "Active" pill (green) beside product name |
| Buttons | "✎ Edit Product" (outlined green) + "⋮ More Actions ▾" (outlined, split button) — stacked full-width on mobile vs inline on desktop |
| Data fields (label/value pairs) | SKU / Article No. → a103; Category → BREAD; Brand → — (em dash, empty); Unit (Smallest) → Pcs; Base Unit → Box; Barcode → 8541247854; Selling Price (Incl. tax) → ₹15.75; Tax Rate → 5% |
| Table | "📚 Packaging & Units" — columns UNIT / CONVERSION / PRICE (5% INCL. TAX); rows: Pcs — 1 Pcs — ₹15.75; Box — 1 Box = 20 Pcs — ₹315.00; Pallet — 1 Pallet = 1 Box — ₹315.00 |
| Cards (summary) | "📦 Inventory Summary" — 3 stat cards in a row: Total Stock (0), Available Stock (0), Stock Reserved In Order (0), each with a circular icon badge (box / check / lock) |

## 7. Product Detail (desktop) — files #17, #18, #19

| Element type | Instances |
| --- | --- |
| Page name | "Product" (topbar h1) |
| Breadcrumb | "Product › Milk Bread 200gm" |
| Buttons | "✎ Edit Product" (outlined) + "⋮ More Actions ▾" (outlined, opens dropdown) — top-right, inline |
| Action menu | **More Actions** → "⎘ Copy SKU / Article No.", "🏷 Copy barcode" |
| Cards | Left: image card (main image, click-to-zoom) + 2 thumbnails below (selected thumbnail gets green border) |
| Status badges | "Active" pill (green) next to product title |
| Data fields | SKU / Article No., Category, Brand (all top row); Unit (Smallest), Base Unit, Barcode (2nd row) — left/center columns; right column: "Selling Price (Incl. tax)" large ₹ value + "Tax Rate" |
| Table | "📚 Packaging & Units" card — same 3-column table as mobile (UNIT / CONVERSION / PRICE), same 3 rows (Pcs/Box/Pallet) |
| Cards (summary) | "📦 Inventory Summary" card — 3 stat tiles: Total Stock, Available Stock, Stock Reserved In Order, same icon-badge treatment as mobile, laid out side-by-side |
| Modal (lightbox) | Clicking the main image opens a full-size lightbox overlay (dark background) with a single "✕" close, image centered |
| Icons | Edit (pencil in button), More Actions chevron, Copy icons (⎘, 🏷) in the dropdown, circular stat icons (box/check-circle/lock) |

## 8. Import Preview modal — file #11

| Element type | Instances |
| --- | --- |
| Page name / modal title | "Preview Product" + inline "✎ Edit" link beside the title |
| Table | Preview grid with a horizontal scrollbar: # · Category · Sub Category · Product · Price · Cost price · Secondary Unit · Article Number · Desc · Box… (cut off — more columns off-screen); 2 sample rows shown (Demo/Test/Raw Materialss/…, TEST/TEST/Curd/…) |
| Buttons | "Cancel" (outlined) / "Import" (primary, green) — bottom-right, inline pair |
| Behaviour implied | Import is a 2-step flow: pick file (or directory) → server/client parses it → this preview grid lets the admin review parsed rows before committing with "Import" |

## Cross-cutting observations (feed design-principles.md)

| # | Observation |
| - | ----------- |
| 1 | **Two independent nested modals**: Add/Update Product is itself a modal; "Unit & Price" opens a second modal on top of it. Discovery so far (screen-02/04) only modelled a single-page form — this is a material gap. |
| 2 | **Blue "SAVE" is the only non-green primary button** in the entire module — worth flagging as either an inconsistency or an intentional "you're inside a sub-flow" signal; not resolved from screenshots alone. |
| 3 | Price on the Add/Edit form is **derived, not directly editable** — it's set via the Unit & Price sub-modal (Selling Price Per {smallest unit}), and the top-level "Price" field appears read-only/disabled once that's configured. |
| 4 | Desktop list = **table**; mobile list = **cards** with visible status badges ("Out of Stock" / "Low Stock") that have **no desktop equivalent** — the desktop list only colour-codes the stock sub-line, it never shows a pill badge. Open question for design-principles. |
| 5 | Mobile toolbar **condenses** 5 desktop buttons (Export/Import/Sample/Import Images/Add Product) into a 3-item sticky bottom bar (Import/Export combined, Images, + Product) — mobile is not a 1:1 responsive reflow of the same controls, it's a deliberately reduced set. |
| 6 | Product Detail introduces two structures entirely new to the prototype: **Packaging & Units** (multi-unit conversion + price table) and **Inventory Summary** (Total / Available / Reserved-in-order stat tiles) — richer than the current `stock:{qty,unit,canSell,inOrders}` shape in `seed-data/seed.json`. |
| 7 | "More Actions" (copy SKU, copy barcode) and the image lightbox are Product-Detail-only affordances not present on the list. |
| 8 | Category filter on the list is a **custom single-select dropdown** (not a native `<select>` — see the highlighted "Bread" row in file #8), same category source as Add Product's Category field. |
