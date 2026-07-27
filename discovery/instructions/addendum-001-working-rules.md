# Addendum 001 — Working Rules

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-07-25

Standing rules for the **Foodbridge Modules Products** Discovery phase. They apply to every
iteration unless a later addendum supersedes them.

## Rules

| # | Rule | Detail |
| - | ---- | ------ |
| R1 | New instructions go in an addendum | Any new ask or decision is captured as a separate `addendum-NNN-*.md` file, never edited into `instructions.md`. |
| R2 | Link every addendum from the index | Each addendum is linked from `instructions.md` under "Addenda". |
| R3 | Summarise analysis as a table first | Any analysis is presented as a table summary first; narrative is supporting detail. |
| R4 | Capture each iteration in an addendum first | Intent is logged before the iteration; outcome is appended after. The folder is an append-only build-up. |
| R5 | HTML only, disposable | Prototypes stay HTML/CSS/JS with seed data (SPEC §3.1). Nothing here is a dependency of Development — only the *decisions* carry forward. |
| R6 | An accepted iteration becomes a version | When the human accepts an iteration, log it and snapshot it under `../versions/vN/`; record which decisions feed which SSOT so Development can inherit them. |
| R7 | The validate-gate is relaxed here | Discovery *produces* the SSOT content, so it is not gated on SSOTs that don't exist yet (SPEC §5.4, §3.1). Instructions run freely; their output is what Development's gate later enforces. |
| R8 | Human inputs live in `inputs/` | Discovery is the input firehose — briefs, research, personas, walkthroughs, screenshots go in `inputs/`. Non-text inputs carry a text derivative; large/binary media is referenced by link; the consuming addendum cites them via an `Inputs:` header (SPEC §12.5). |

## How this works in practice

| Step | What happens |
| ---- | ------------ |
| 1 | A new ask or scenario arrives. |
| 2 | It is written into a new addendum (R1) and linked from `instructions.md` (R2). |
| 3 | The prototype iteration is built and role-played against seed data; analysis is tabled (R3). |
| 4 | The addendum records the outcome; if accepted, the iteration is snapshotted as a version (R4, R6). |

## Addendum numbering

- Format: `addendum-NNN-short-slug.md` (zero-padded 3-digit sequence).
- This file is `001`. The next is `002`, and so on — numbers are never reused.
