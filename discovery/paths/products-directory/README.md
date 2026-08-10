# Discovery path — `products-directory`

Static **HTML replica** of the storefront-frontend **Products module**, built for
the `foodbridge-module-production` discovery workflow. It reproduces three live
admin screens as a no-build, click-through prototype for both **desktop and mobile**.

| Screen | Route (live app) | Source component |
| --- | --- | --- |
| All Products | `/products` | `storefront-frontend/src/pages/Products.jsx` + `components/product/ProductTable.jsx` |
| Categories | `/categories` | `storefront-frontend/src/pages/Category.jsx` + `components/category/CategoryTableCollapse.jsx` |
| Raw Materials | `/raw-materials` | `storefront-frontend/src/pages/RawMaterials.jsx` (shared product table, `isRawMaterial`) |

## What it replicates

- **Shared app shell** — sidebar with the expanded **Products** group (All Products /
  Categories / Raw Materials), topbar with breadcrumb, and clickable navigation between screens.
- **All Products** — searchable/filterable table: image + name + `Art No`, category chip,
  price with GST-exclusive tax label, batch-wise **stock** (`total`, `can sell`, `in orders`),
  row select + select-all, per-row view/edit/delete, and pagination.
- **Categories** — collapsible **parent → subcategory** tree (`Name`, `Description`,
  `Parent Category`, `Products` count, `Actions`), a **Show subcategories** toggle, and search.
- **Raw Materials** — same table shape with a **Purchasing Price** column instead of
  sell price / tax.
- **Responsive** — under 768px the tables switch to cards, a category **chip rail** appears,
  and a sticky **mobile bottom footer** (Import / Add / Bulk) is shown, matching the React pages.

Interactive actions (Add, Edit, Delete, Import, Bulk) fire a toast — this is a discovery
prototype, not a wired backend.

## Layout

Mirrors the other discovery paths (e.g. `batch-management`): a `screens/` folder for
the current working copy, `seed-data/` for canonical JSON, and `versions/` for snapshots.

```
products-directory/
├── index.html               # launcher → screens/products (current)
├── README.md
├── CHANGELOG.md
├── screens/
│   └── products/            # ← current working screens (v2)
│       ├── index.html       # path overview + screen cards
│       ├── all-products.html
│       ├── categories.html
│       ├── raw-materials.html
│       └── assets/
│           ├── styles.css   # emerald / Windmill-UI design system
│           ├── data.js      # seed data (window.SEED)
│           └── app.js       # shell + screens + working actions
├── seed-data/               # canonical seed JSON (generated from data.js)
│   ├── products.json
│   ├── categories.json
│   └── raw-materials.json
└── versions/
    ├── v1/                  # snapshot — "html-replica" (Murli UI, demo actions)
    └── v2/                  # snapshot — "working-actions" (== screens/products)
```

## Run it locally

No dependencies. Either:

```bash
# option A — just open the file
open screens/products/index.html      # macOS   (xdg-open on Linux)

# option B — serve the folder (nicer URLs)
python3 -m http.server 4173
#   → http://localhost:4173/screens/products/index.html
```

Then click **All Products / Categories / Raw Materials** in the sidebar, or start
from the version landing page.

## Versioning

The live/current version is never edited in place. Each iteration is a full snapshot
under `versions/`. This is **v1** (`html-replica`); the next change ships as `v2`, and so on.
