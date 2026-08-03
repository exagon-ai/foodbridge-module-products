# Addendum 008 — Image Directory modal and mobile parity

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-08-03

## Inputs

The user supplied desktop references for the Import Images trigger, the Global Foodbridge Directory
upload state, the Local Directory grid state, and the established mobile All Products card layout.

## Ask and decisions

| # | Decision | Result |
| - | -------- | ------ |
| D1 | Import Images stays on All Products. | It opens a large overlay modal; it does not navigate to the former capture/gallery page. |
| D2 | Replace the former capture workflow. | Global upload and Local Directory selection are the supported image-import flows. |
| D3 | Make the modal functional. | Tab switching, search, category chips, drag/drop or file browse, image selection, Select and Import all work. |
| D4 | Preserve mobile workflow parity. | Mobile cards retain selection, view/edit/tag/delete, bulk actions, import/export, images, add product and sheet actions. |

## SSOT traceability

Discovery presentation and interaction update governed by SSOT-3 Component Library v0 and SSOT-5
Workflow Model v0. No product-domain invariant changes.

## Outcome

The former user-facing capture/gallery route has been removed from V2 navigation. Import Images,
Image Directory and the mobile Images action now open the same responsive directory modal over the
product list. Desktop and 390 × 844 mobile states were visually verified after the modal animation,
and the existing mobile product-card actions remain available beneath the overlay.
