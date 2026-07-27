# Addendum 002 — As-is Products List → clickable prototype

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-07-25

**Inputs:** `inputs/ProductModuleItteration/As-is/2026-07-25-products-list-as-is.png`
(screenshot, provided by rakesh@foodbridge.io 2026-07-25) with text derivative
[`2026-07-25-products-list-as-is.annotation.md`](./inputs/ProductModuleItteration/As-is/2026-07-25-products-list-as-is.annotation.md).

## Ask

Analyse the As-is input (a screenshot of the legacy/reference "All Products" admin screen) and
turn it into a proper, clickable discovery prototype — not a static mock, but screens a human can
actually click through.

## Analysis summary (R3)

See the annotation's tables in full; condensed here:

| Aspect | As-is finding | Prototype decision |
| --- | --- | --- |
| Screen scope | Screenshot shows only the list screen | List is the anchor; view/edit/add destinations are inferred from the 3 row-action icons (eye/pencil/trash) + "Add Product" CTA, since the human asked for a full clickable flow, not just the one screen |
| Chrome | Full sidebar (11+ nav items, 2 expanded submenus) + topbar present on every screen | Replicated once as static chrome per screen (discovery screens must stay standalone-openable — no shared template includes in plain HTML) |
| Data shape | 12 product rows with: name, art no, category, price, tax (3 differing formats), stock qty, unit, can-sell, in-orders, thumbnail | Modeled as `seed-data/seed.json` fields: `name, artNo, category, price, tax:{mode,percent}, stock:{qty,unit,canSell,inOrders}, image` |
| "No image" placeholder | 3 different treatments in the source (generic icon, lock icon, text tile) — unresolved, flagged as an open question in the annotation | Reproduced as-is (not normalized) so the inconsistency is visible and discussable, rather than silently "fixed" during discovery |
| Row actions | Icon-only, no labels, destinations not observable from a static image | Assumed standard CRUD mapping: eye → read-only detail screen, pencil → edit form, trash → delete with confirm. Flagged as an assumption, not a confirmed decision |
| Filters | Search box (name/art no) + category select | Implemented as live client-side filtering over the row set |

## Decision

Build the full CRUD loop as separate discovery screens (per human's explicit choice: "Full
multi-screen flow" over a single-screen-with-modals option):

| Screen | Purpose |
| --- | --- |
| `screen-01.html` | All Products — list, search, category filter, row actions, entry point |
| `screen-02.html` | Add Product — form, on save returns to list with new row |
| `screen-03.html` | Product Detail — read-only view of one product, reached via the eye icon |
| `screen-04.html` | Edit Product — form pre-filled from a product, reached via the pencil icon or from detail |

State is kept in `localStorage` (seeded from `seed-data/seed.json` on first load) so add/edit/
delete actually persist while clicking across screens in one browser session — still no real API,
still disposable (SPEC §3.1/R5), just enough to make the flow *feel* real for role-play.

## Outcome

Built as `screen-01.html` … `screen-04.html` + `screens/shared.js` (data/CRUD helpers) + rewritten
`seed-data/seed.json` (12 as-is rows + 2 extra edge-case rows) + wiring updated in `../index.html`
+ transition map filled in. Not yet marked as an accepted version (R6) — pending human review of
this first iteration.
