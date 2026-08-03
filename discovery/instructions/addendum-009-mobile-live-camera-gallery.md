# Addendum 009 — Mobile live camera gallery

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-08-03

## Inputs and ask

The user supplied six mobile references covering the product list, live Image Gallery capture,
captured-photo/tag actions, thumbnail progress and the My Photos picker. Desktop image import remains
the directory modal; mobile requires a dedicated camera-first workflow.

## Decisions

| # | Decision | Result |
| - | -------- | ------ |
| D1 | Mobile Images opens a dedicated screen. | Desktop continues using the same-page directory modal. |
| D2 | Use the browser camera when available. | `getUserMedia` provides the live preview; native camera/file capture is the fallback. |
| D3 | Support the complete supplied workflow. | Format, resolution, flip, capture, retake, take another, crop, tags, thumbnails, save/next and My Photos. |
| D4 | Persist useful results. | Saved captures become product images and are available in My Photos during the session. |

## SSOT traceability

Discovery interaction update governed by SSOT-3 Component Library v0 and SSOT-5 Workflow Model v0.

## Outcome

The initial camera and captured-photo states were verified at 390 × 844. The mobile Images action
now opens the dedicated gallery while desktop Import Images continues to open the directory modal.
Camera permission uses the secure browser API with a native capture/photo-picker fallback.
