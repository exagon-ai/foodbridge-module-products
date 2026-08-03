# Instructions — Foodbridge Modules Products (discovery)

> **Single point of collaboration for the Discovery phase.** Any coding agent
> iterating on the HTML prototypes reads this first, logs every instruction it is
> given as an addendum, and continues from where the last iteration left off.
> This is the append-only record of the *build → measure → learn* loop.

## Scope

Discovery is **HTML only** — no frameworks, no real data layer (SPEC §3.1). Each
instruction here shapes a prototype iteration or the problem framing. When the
human marks an iteration as a version ("this is the one"), that acceptance is
logged as an addendum and snapshotted under `versions/`.

## Context / file definitions

| Ref | Path | What it is |
| --- | ---- | ---------- |
| Prototype | `../index.html` | Current/latest discovery prototype |
| Versions | `../versions/` | Accepted snapshots, one folder per accepted iteration |
| Seed data | `../seed-data/seed.json` | Fake but representative data driving the prototype |
| Design principles | `../design-principles.md` | UX intent, tone, constraints learned during discovery |
| Inputs | `inputs/` | Human-provided discovery source material — briefs, research, personas, walkthroughs, screenshots (§12.5) |

## Working rules

Standing rules are in **[Addendum 001 — Working Rules](./addendum-001-working-rules.md)**.

## Addenda

- [Addendum 001 — Working Rules](./addendum-001-working-rules.md) — standing rules for how we work in discovery (addendum-first, table summaries, iteration-as-version, gradual context build-up)
- [Addendum 002 — As-is Products List → clickable prototype](./addendum-002-as-is-products-list.md) — analysis of the As-is products list screenshot, decision to build a full clickable list/add/view/edit flow
- [Addendum 003 — Full Product Module](./addendum-003-full-product-module.md) — analysis of 19 further screenshots (Add Product fields, Unit & Price sub-modal, list toolbar menus, import flow, Product Detail packaging/inventory, mobile), decision to extend the 4 existing screens in place
- [Addendum 004 — Add/Edit/Import/Delete are modals, not pages (correction)](./addendum-004-modal-not-page-correction.md) — corrects Addendum 003: Add/Edit/Import/Delete are modals over List or Detail, not page navigations; adds pagination and a clearable category select
- [Addendum 005 — Add/Update Product is a right-side drawer](./addendum-005-add-edit-drawer.md) — corrects Addendum 004: Add/Update Product is a slide-in right-side drawer (~2/3 width, sticky footer), not a centered modal dialog
- [Addendum 006 — Responsive Products V2 release](./addendum-006-products-v2.md) — preserves V1 and releases the new persistent, fully clickable desktop/mobile V2 with product imagery, gallery, import/export, inline editing, bulk actions and version landing links
- [Addendum 007 — V2 desktop visual parity](./addendum-007-v2-desktop-visual-parity.md) — aligns the V2 desktop product list shell, spacing, table and controls to the supplied 1917 × 1012 reference while preserving functionality and mobile UX
