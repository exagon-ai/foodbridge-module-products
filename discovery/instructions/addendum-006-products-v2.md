# Addendum 006 — Responsive Products V2 release

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-08-03

## Inputs

Twenty-two desktop and mobile screenshots supplied on 2026-08-03 are archived verbatim under
`inputs/ProductModuleItteration/As-is/2026-08-03-v2-reference/`.

## Ask

Create a separately accessible Version 2 without removing Version 1. Match the supplied product
list, detail, import, unit-pricing, add-product and image-gallery UX across desktop and mobile.
All visible controls should be clickable. Required flows include real CSV/Excel export, file or
directory import with a preview modal, image import/gallery, bulk actions, direct price/stock
editing in desktop rows and mobile cards, and an add/edit product drawer. The discovery landing
page must explain and open both versions.

## Decisions

| # | Decision | Notes |
| - | -------- | ----- |
| D1 | Keep V1 at `screens/screen-01.html` and release V2 independently at `preview/v2.html`. | Makes comparison and rollback immediate. |
| D2 | Use one responsive V2 document: desktop table/sidebar at wide widths and mobile cards/bottom actions at narrow widths. | Both layouts operate on the same data and interaction model. |
| D3 | Persist V2 product changes and uploaded images in browser local storage. | Keeps the static GitHub Pages prototype functional without a backend. |
| D4 | Export creates real downloadable CSV or Excel-compatible files; import always shows a parsed-data preview before mutation. | Matches the supplied workflow rather than using toast-only placeholders. |
| D5 | Use real food photography for primary seeded products and user-selected files for newly added products. | Product imagery is visible in list cards/rows and detail gallery. |
| D6 | Add a clear Versions section to the discovery landing page with desktop and phone launch actions for V2. | V1 remains the preserved As-is baseline. |

## Outcome

V2 is a fully clickable static prototype covering list/search/filter, responsive cards, selection,
bulk update/tag/delete/edit, per-row/per-card inline edit, add/edit drawer, pricing modal, product
detail, gallery capture/tag flow, import preview, downloadable export, theme switch, and locally
persistent product/image data.
