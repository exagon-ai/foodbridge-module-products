# Addendum 007 — V2 desktop visual parity

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-08-03

## Input

The user supplied a desktop All Products reference at 1917 × 1012 and requested that V2 use the
same UI treatment while retaining the V2 functionality and responsive mobile experience.

## Decisions

| # | Decision | Notes |
| - | -------- | ----- |
| D1 | Match the desktop shell and product-list geometry to the reference. | 252px sidebar, compact top bar, pale page canvas and squared, low-shadow data surfaces. |
| D2 | Preserve the existing V2 behaviors. | Import/export, gallery, bulk actions, inline editing, drawers and mobile cards are not removed. |
| D3 | Scope parity overrides to wide viewports. | Mobile keeps its purpose-built card and bottom-action layout. |

## SSOT traceability

This is a discovery-only visual iteration governed by SSOT-3 Component Library v0 and SSOT-5
Workflow Model v0. It changes presentation, not product-domain meaning or workflow transitions.

## Outcome

The V2 desktop shell was visually checked at the reference's exact 1917 × 1012 viewport. The
sidebar, header, toolbar, search/filter row, table geometry, row density, typography, statuses,
actions and pagination now follow the supplied reference. Desktop-only category chips were removed
to preserve the reference sequence from search directly into the table; mobile chips remain intact.
The desktop hamburger and Customers submenu were restored to match the supplied navigation shell.
