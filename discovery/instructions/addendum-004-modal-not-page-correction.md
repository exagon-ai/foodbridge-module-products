# Addendum 004 — Add/Edit/Import/Delete are modals, not pages (correction)

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-07-27

**Inputs:** 8 further screenshots supplied inline by rakesh@foodbridge.io on 2026-07-27 (not yet
filed under `inputs/` as of this addendum — see Outcome), showing: the delete-confirmation dialog,
the category filter's clearable state + list pagination footer, the Add Product modal, the Import
menu + Preview Product modal, the Update Product modal (with an already-configured Unit & Price
row), and the Product Detail page — all captured with the browser address bar visible, showing
`b2bgreens.com/platform/products` **unchanged** while Add/Update/Import/Delete are open, and only
changing to `b2bgreens.com/platform/product/<id>` for Product Detail.

## Ask

Correct a fidelity gap from Addendum 003: Add Product, Edit Product, Delete confirmation, and the
Import file-pick step were built as **separate page navigations** (`screen-02.html`,
`screen-04.html`, `screen-05.html`). The address-bar evidence above shows the As-is app never
navigates for any of these — they are modals layered over whichever page you were already on
(List or Detail). Only clicking into a product (List → Detail) is a real navigation. Also add: the
exact delete-confirmation copy, list pagination, and a clearable (×) category select — all visible
in this new evidence but missing from the prototype.

## Analysis summary (R3)

| Screenshot | As-is finding | Prototype gap |
| --- | --- | --- |
| Delete confirm | Modal: red circular trash icon, **"Delete {name}?"**, *"This product is currently part of 1 catalogues. Deleting it will remove it from all listings and you won't be able to recover it later."*, Cancel / Delete (solid red) buttons | Used the browser's native `confirm()` with different, shorter copy |
| List + category filter | Selecting "Donut" shows the select with an **× clear icon** before the caret; footer reads **"SHOWING 1-3 OF 3"** with a green page-number pill and prev/next chevrons | No clear icon on the select; no pagination at all — the full filtered set always rendered in one page |
| Add Product modal | Opens **over the dimmed All Products list**, same URL | Navigated to `screen-02.html`, a distinct full page |
| Import → Preview Product | Import menu → file picker → Preview Product modal, all **over the dimmed list**, same URL | Navigated to `screen-05.html` first, an intermediate drop-zone page not evidenced anywhere in either screenshot set |
| Update Product modal | Opens over the dimmed list; **Unit & Price row**, once configured, renders as a blue text link "Edit Unit & Price" plus an inline summary ("1 Box = 20 Pcs · ₹15.00 · +5% excl. tax") — not a bordered button; **Price label reads "Price (Pcs)"** — the configured smallest unit in parentheses; Category field shows the same clearable (×) affordance | Unit & Price rendered as a full-width bordered button with the summary baked into its own label in all states; Price label was static "Price"; Category field had no clear icon |
| Product Detail | Confirms the already-built desktop layout (gallery, fields, Packaging & Units, Inventory Summary) — no new gap | — |

## Decision

| # | Decision | Notes |
| - | -------- | ----- |
| D1 | Add Product and Update Product become **modals** opened from wherever the trigger lives: List (toolbar "+ Add Product", row pencil icon) or Detail ("Edit Product" button) — never a page navigation. `screen-02.html` and `screen-04.html` are retired as navigation targets. | Supersedes Addendum 003's D1/D2 framing of these as "screens"; the underlying field set + Unit & Price sub-modal content is unchanged, only the container changes from a page to a modal |
| D2 | Import's file-pick step is folded into the List screen: the Import menu's "Select Your Product File" triggers a native file input directly, and on selection opens the Preview Product modal in place. `screen-05.html` is retired — there is no intermediate drop-zone page in the As-is app. | |
| D3 | Delete confirmation (single and bulk) uses a custom modal matching the observed copy/icon/buttons, replacing `confirm()`. | Bulk-delete copy is extrapolated (pluralised) from the single-delete copy — no bulk-delete screenshot exists yet |
| D4 | List gains pagination: "Showing X–Y of Z" + page controls, page size 10 (assumption — the captured example was a filtered 3-row set, so the true page size isn't confirmed) | Flagged as an assumption pending a full (unfiltered, >10 rows) list screenshot |
| D5 | Category selects (list filter + Add/Edit field) gain a clearable × icon before the caret whenever a value is set | |
| D6 | Unit & Price control has two visual states: unconfigured → bordered button "Select Unit & Price" (as seen in the Add Product capture); configured → blue text link "Edit Unit & Price" + inline summary (as seen in the Update Product capture). Price field label becomes "Price ({smallest unit})" once configured. | |
| D7 | `screen-01.html` (List) and `screen-03.html` (Detail) remain the only two real pages/URLs in the prototype. | Tightens Addendum 003's D7/D1 rather than contradicting them — "distinct pages" was correct only for List↔Detail, not for Add/Edit/Import/Delete |

## Outcome

Built. `screen-02.html`, `screen-04.html` and `screen-05.html` are **deleted** — Add Product,
Update Product, and the Import file-pick step no longer exist as pages. `shared.js` gained:
`openModal()`/`closeModal()` reworked to a stack (so the Unit & Price sub-modal can open on top of
the Add/Edit modal without destroying it — closing pops only the topmost); `mountSearchSelect()`
gained a `clearable` option (× icon, shown only once a value is set); `mountProductForm()` was
replaced by `openProductModal({ meta, product, mode, onSaved })`, which renders the exact same
field set inside a modal instead of a page, does the actual `addProduct`/`updateProduct` call
itself, and calls back into `onSaved()` so the caller (List or Detail) can refresh in place; a new
`openDeleteModal({ title, message, onConfirm })` reproduces the observed icon/copy/buttons and
replaced every `confirm()` call (row delete, bulk delete, Detail's More Actions delete). The Unit &
Price control now renders two ways per D6 (bordered button unconfigured, blue link + inline
summary once configured), and the Price field label shows the configured smallest unit. List
pagination (10/page, "SHOWING X–Y OF Z" + numbered controls) and the Import flow (native file
input → Preview Product modal, no drop-zone page) were built directly into `screen-01.html`.
`index.html`'s screen grid now lists only the two real pages (List, Detail) with a note that
Add/Edit/Import are modals from those screens; the transition map was rewritten to match.

**Verified** with a second scripted Playwright pass covering every corrected behaviour: Add
Product opens as a modal with the URL unchanged; the Unit & Price sub-modal stacks and returns to
the still-open Add modal on Save; the unconfigured/configured Unit & Price states render correctly
("Select Unit & Price" button vs. "Edit Unit & Price" link + "1 Pack = 10 Loaf · ₹50.00 · 0% tax");
the Price label shows "Price (Loaf)"; submitting closes the modal and the new row appears with no
navigation; Edit-from-list and Edit-from-Detail both open the modal over the calling page and
refresh it in place afterward; the delete modal reproduces the exact copy including the "1
catalogues" plural quirk; bulk delete titles itself "Delete 2 Products?"; Import opens the OS file
chooser directly from the menu and goes straight to the Preview Product modal with no intermediate
page, importing on confirm; clicking the eye icon is confirmed as the only real navigation (to
`screen-03.html?id=…`); pagination shows "SHOWING 1-10 OF 15/16" with working page controls on both
desktop and the 375px mobile card view. Zero console errors (only the harmless `favicon.ico` 404).

The 8 screenshots that motivated this correction were shared inline in conversation rather than
dropped into `inputs/`; per R8 they should still be filed with a text derivative for traceability
— flagged as follow-up housekeeping, not blocking. Neither this nor Addendum 003's iteration has
been marked as an accepted version (R6) — still pending human review.
