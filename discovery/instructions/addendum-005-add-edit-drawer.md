# Addendum 005 — Add/Update Product is a right-side drawer, not a centered modal

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-07-27

**Inputs:** 3 further screenshots shared inline by rakesh@foodbridge.io on 2026-07-27, showing the
Add Product panel anchored to the right edge of the viewport, spanning full height, covering
roughly two-thirds of the content area (sidebar and a sliver of the dimmed list still visible on
the left) — not a centered, margin-on-all-sides dialog as Addendum 004 built it.

## Ask

Correct Addendum 004's Add/Update Product container: it must be a **right-side slide-in drawer**
(full height, ~2/3 width, sticky footer) over the dimmed List or Detail page — same "no
navigation" behaviour as before, only the container shape/position changes. The Unit & Price
sub-modal, Preview Product modal, and Delete confirmation modal are unaffected — their screenshots
show a genuinely centered dialog, so they keep using `openModal()`.

## Decision

| # | Decision | Notes |
| - | -------- | ----- |
| D1 | New `FBP.openDrawer()` helper: full-height panel fixed to the right edge (`left: 240px` to leave the sidebar visible, matching the screenshot), ~66% width capped at 900px, slides in via `transform: translateX()`, sticky header + scrollable body + sticky footer. Shares the same `[data-fbp-modal]` stacking/close semantics as `openModal()` so Unit & Price still stacks correctly on top. | Width/slide timing are visual judgement calls, not pixel-measured from the screenshots |
| D2 | `openProductModal()` now calls `openDrawer()` instead of `openModal()`; the footer buttons (`Add Product`/`Update Product`, `Cancel`) moved out of the scrolling form into a fixed `.drawer-footer`, linked to the form via `form="product-form"` | Matches the screenshot showing the footer buttons visible without scrolling the whole form |
| D3 | Mobile (≤760px): drawer goes full-width (`left: 0`), same as before — no separate mobile drawer treatment, consistent with the existing "responsive, not a separate build" decision | |

## Outcome

Built: `FBP.openDrawer()` added to `shared.js` (`closeModal()` now also handles the slide-out
transition before removing a drawer from the DOM); `openProductModal()`'s markup restructured into
`.drawer-header` / `.drawer-body` (the `<form>` itself) / `.drawer-footer`; `shared.css` gained
`.drawer-overlay`/`.drawer-panel`/`.drawer-header`/`.drawer-body`/`.drawer-footer` plus a mobile
override. Verified visually in a browser: Add Product now slides in from the right, sidebar and a
dimmed strip of the list stay visible on the left, footer buttons stay put while the field list
scrolls, and closing plays the reverse slide before the DOM node is removed. Pending human review,
same as prior iterations.
