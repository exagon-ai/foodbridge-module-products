# Design Principles — Foodbridge Modules Products

> Fill this in as discovery progresses. This document is the human-readable bridge
> between "what we role-played" and the SSOTs that will govern development.

<!-- Single file by default. If it outgrows one file, graduate to a
     design-principles/ folder with an index.md entry + fragments (tone.md,
     accessibility.md, decisions.md). Keep it focused on discovery-phase
     UX intent/tone/constraints/decisions — a shared design system belongs in the
     module-level resources/, human-provided research in instructions/inputs/, and
     ratified interaction/presentation semantics in SSOT-3 / SSOT-4 (SPEC §3.1). -->


## 1. Problem statement

Wholesaler admins need to manage their sellable product catalogue (browse, search, add, view
detail, edit, delete) — this module owns that catalogue-management surface. Scoped from the
As-is reference screen (see [Addendum 002](instructions/addendum-002-as-is-products-list.md));
not yet confirmed with a human stakeholder beyond that one screenshot.

## 2. Primary user(s) / actor(s)

- **Wholesaler Admin** — the only actor visible in the As-is screen (topbar shows
  "WHOLESALER… / Admin"). Has full CRUD on products: export/import, add, view, edit, delete,
  bulk-select (checkboxes), search/filter by category.
- Other actors (e.g. a non-admin wholesaler role, or the customer-facing catalogue consumer
  implied by the "Customers → Catalogue" sidebar item) are visible in the nav but out of scope
  for this iteration — not yet explored.

## 3. What "good" looks like

Not yet role-played with a human beyond replicating the reference screen faithfully. Working
hypothesis carried over from the As-is layout: an admin should be able to find a product by
name/art-no or category in one or two actions, and the list should make stock health legible at
a glance (qty vs. sellable vs. reserved-in-orders) without opening each product.

## 4. Constraints learned during discovery

- The As-is screen mixes at least three different "no image" placeholder treatments (generic
  icon, lock icon, text tile) with no visible rule for which applies when — reproduced as-is in
  the prototype rather than normalized, since the rule is unknown (see annotation §4.1).
- Tax is displayed in three different formats depending on mode (`+N% excl. tax`, `N% incl.
  tax`, `0% tax`) — modeled as a `{mode, percent}` pair rather than a single formatted string,
  so the prototype can render all three consistently from one shape.
- Stock unit is per-product, not global (Box / Packet / Crate observed) — modeled as a
  `stock.unit` field on each product, not a module-wide setting.
- "In orders" reads as an attention colour (orange) only when > 0; 0 is muted/grey. "Can sell"
  always reads green. Carried into the prototype as a colour convention worth testing further.
- The As-is screenshot only shows the list screen; view/edit/add destinations for the row-action
  icons (eye/pencil/trash) are an assumption (standard CRUD mapping), not confirmed from the
  source (see annotation §4.6).
- (Addendum 003) A product's sellable price is **not** a flat number — it's derived from a
  "Unit & Price" configuration: a Smallest Unit and a Base Unit, a conversion factor between them,
  a GST rate + treatment (included in price vs added separately), and a selling price captured
  per-unit. The top-level "Price" field on Add/Edit is read-only/derived from this, not directly
  editable.
- (Addendum 003) Desktop list = table; mobile list = cards carrying status badges ("Out of Stock" /
  "Low Stock") that have **no desktop equivalent** — the desktop list only colour-codes the stock
  sub-line text, it never renders a pill badge. Unresolved: is this an intentional mobile-only
  affordance or a gap in the desktop UI? Carried as an open question.
- (Addendum 003) Mobile is not a 1:1 responsive reflow — the 5 desktop toolbar buttons
  (Export/Import/Sample/Import Images/Add Product) condense into a 3-item sticky bottom bar
  (Import/Export combined, Images, +Product) on mobile. Mobile deliberately narrows the control
  surface rather than shrinking every desktop control in place.
- (Addendum 003) The only blue primary button anywhere in the module is "SAVE" inside the Unit &
  Price sub-modal — every other primary action is green. Not resolved whether this is intentional
  (a "you're in a sub-flow" signal) or an inconsistency; reproduced as-is.
- (Addendum 004 — correction) Add Product, Update Product, Import's file-pick step, and Delete
  confirmation are all **modals over the current page** (List or Detail), confirmed by the browser
  address bar staying on `/platform/products` while they're open. Only List → Detail is a real page
  navigation (to `/platform/product/<id>`). Addendum 003 had modelled Add/Edit/Import as separate
  discovery pages (`screen-02/04/05.html`) — corrected in Addendum 004.
- (Addendum 004) Delete confirmation copy is specific and was missed initially: "Delete {name}?" /
  "This product is currently part of 1 catalogues. Deleting it will remove it from all listings
  and you won't be able to recover it later." (the "1 catalogues" plural mismatch is in the As-is
  source — reproduced, not corrected).
- (Addendum 004) The Unit & Price control changes appearance once configured: a bordered button
  ("Select Unit & Price") before, a plain blue text link ("Edit Unit & Price") plus an inline
  summary after. The derived Price field's label includes the configured smallest unit, e.g.
  "Price (Pcs)".

## 5. Decisions carried into Development

| Decision | Rationale | Feeds into SSOT |
|---|---|---|
| Product = `{name, artNo, category, price, tax:{mode,percent}, stock:{qty,unit,canSell,inOrders}, image}` | Shape needed to render every field observed on the As-is list row without collapsing the three tax formats or per-product stock unit | 02-domain-model, 04-frontend-domain-model |
| Row actions map to view / edit / delete as three distinct screens (not modals) | Human chose the full multi-screen flow over single-screen-with-modals for this iteration | 01-state-machine, 05-workflow-model |
| Delete requires an explicit confirm step | Destructive, irreversible action on real inventory data | 01-state-machine |
| Search matches product name or art no.; category is a separate exact-match filter | Matches the two distinct filter controls shown in the As-is toolbar | 05-workflow-model |
| Product pricing = `{smallestUnit, baseUnit, unitsPerBase, gst:{rate,treatment}, priceSmallest, priceBase}`, plus `hsnSac, barcode, brand, coverage, description, images[]` | Shape needed to render the Unit & Price sub-modal and the Packaging & Units / Inventory Summary detail views without collapsing per-unit pricing into a single number (Addendum 003) | 02-domain-model, 04-frontend-domain-model |
| Only List and Detail are distinct pages/URLs. Add, Edit, Import (file-pick), and Delete confirm are all modals over the current page | Superseded by Addendum 004: address-bar evidence shows the As-is app never navigates for these; Addendum 003 had modelled Add/Edit/Import as separate pages, corrected here | 01-state-machine, 05-workflow-model |
| Import is pick-file (native file input, no page) → Preview Product modal (parsed rows) → Import commit, opened over the List | Matches the two-step review-before-commit pattern observed in the As-is import screenshots; the file-pick step has no intermediate page (Addendum 003 + correction in Addendum 004) | 05-workflow-model |
| Bulk actions scoped to Bulk Delete only this iteration | No screenshot evidence of a Bulk Update form; inventing one would misrepresent the As-is (Addendum 003) | 05-workflow-model |
| List paginates at 10 rows/page; category selects (filter + form field) are clearable | Observed pagination footer and clear (×) icon in the Addendum 004 evidence; page size of 10 is an assumption (only a filtered 3-row example was captured) | 05-workflow-model, 03-ux-component-library |

## 6. Accepted version

- Version: *(none yet — this is the first iteration, pending human review)*
- Date accepted:
- Accepted by:
- Link/path: `discovery/versions/vN/index.html`
