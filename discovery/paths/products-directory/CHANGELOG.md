# Changelog — `products-directory`

All notable changes to this discovery path. Newest first. Each version under
`versions/` is a full, self-contained snapshot; the current working copy lives in
`screens/products/`.

## v2 — working-actions (2026-08-10)

Reworked to match the live **Murli** storefront-admin screenshots and make every
action functional (no placeholders).

### Added (2.1)
- **Image Gallery** screen (`/image-directory`) added under the Products group:
  search (name/category/article/tag), **All / Unlinked** tabs + tag chips with counts,
  **Add images** (upload/take photos → real file preview), **Upload images to products**,
  **Bulk actions** (add tags / link to product / delete), **Add tag**, and per-card
  **⋮ menu** (add tags / link to product / delete).
- **Bulk actions reworked to match the app**: **Recategorize** is now a right **drawer**
  ("Move the selected products into a new category in one go."); **Update prices** is an
  inline **"Editing N products"** edit mode (per-row Unit / Price / Incl-Excl + GST, Cancel /
  Save changes); **Assign tags** is the **"Create product tag"** drawer (search, tag input +
  Add Tag, product grid with checkboxes and current tags).

### Added
- **Folder layout** aligned with the other discovery paths: `screens/products/`
  holds the current working screens; `seed-data/` the canonical JSON; `versions/v2/`
  the snapshot. Root `index.html` opens the current screens.
- **Import** — real preview modal (`Category · Sub Category · Product · Price · Cost
  price · Base Unit · Secondary Unit`) that loads a built-in sample **or** a browsed
  CSV, then imports the rows so they appear in the table.
- **Export** — real downloads: Export to Excel (`.xls`), Export to CSV, Download
  Sample template; plus a Google-Sheets-ready CSV export.
- **Bulk actions** — Recategorize (category picker modal), Update prices (per-row
  price/GST modal), Assign tags (tag drawer with quick + custom tags), Delete.
- **Unit & Price modal** in the Add/Edit drawer (smallest/base unit, conversion,
  price, GST → live incl-tax preview) that writes back to the form.
- **Real image upload** preview in the drawer's image grid; barcode "scan" fills a code.
- Seed data reworked to the Murli catalogue (waters, breads, cakes, cookies, …) with
  full product-detail fields; Raw Materials seeded from **Maida** onward.

### Note
- Sidebar entries outside the Products module (Dashboard, Orders, Customers, …) are
  intentionally out of scope for this prototype and show a short notice when clicked.



## v1 — html-replica (2026-08-10)

Initial fork of the storefront-frontend Products module into a static HTML replica.

### Added (1.1 — full interaction pass)
- **Real photographic thumbnails** — every product / raw material / category shows a
  real, subject-matched food photo (keyword-driven), replacing the emoji tiles, with a
  graceful initials fallback if an image can't load.
- **Add / Edit drawers** — right slide-in panels replicating the ProductDrawer fields
  (Article No, Title, Description, Images, SKU, Barcode, Category, Unit, GST, Original /
  Sale price, Opening / Min stock), CategoryDrawer (Name, Parent, Description, Icon) and a
  Raw-Material form. Saving mutates the in-memory data and re-renders.
- **Delete confirmation modal** — matches the app's copy ("Are you sure you want to
  delete …?", Keep / Delete), for single rows and bulk.
- **Import / Export menu** — Import (file / from Directory), Export (Excel / CSV),
  Download Sample — as an anchored popover (desktop) and via the mobile footer.
- **Bulk Action menu** — Recategorize, Update prices, Assign tags, Delete (products);
  Recategorize / Delete (raw materials), with "select first" guards.
- **Toast messages** — success / error tones for every action.
- **Working mobile footer** — Import/Export, Add and Bulk buttons wired to the real menus.

### Added
- **App shell** — shared sidebar (Products group: All Products / Categories / Raw Materials),
  topbar breadcrumb, and clickable cross-screen navigation.
- **All Products screen** (`/products`) — product table with image/name/`Art No`, category
  chip, price + GST-exclusive tax label, batch-wise stock (`total` / `can sell` / `in orders`),
  row + select-all selection, per-row view/edit/delete, live search, category filter, pagination.
- **Categories screen** (`/categories`) — collapsible parent → subcategory tree
  (Name / Description / Parent / Products / Actions), "Show subcategories" toggle, search.
- **Raw Materials screen** (`/raw-materials`) — product-table layout with a Purchasing Price
  column and total stock.
- **Responsive** — desktop tables convert to mobile cards, category chip rail, and a sticky
  mobile bottom footer (Import / Add / Bulk).
- Seed data (`assets/data.js`) with 27 products, 6 category groups (with subcategories),
  and 12 raw materials in an Indian food-distribution context (₹ / GST). Mirrored to
  `seed-data/*.json`.
