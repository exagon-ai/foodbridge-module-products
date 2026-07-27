# Addendum 001 — Working Rules

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-07-25

Standing rules for the **Foodbridge Modules Products** Frontend. They apply to every iteration
unless a later addendum supersedes them.

## Rules

| # | Rule | Detail |
| - | ---- | ------ |
| R1 | New instructions go in an addendum | Any new ask or decision is a separate `addendum-NNN-*.md` file, never edited into `instructions.md`. |
| R2 | Link every addendum from the index | Each addendum is linked from `instructions.md` under "Addenda". |
| R3 | Summarise analysis as a table first | Any analysis is a table summary first; narrative is supporting detail. |
| R4 | Capture each iteration in an addendum first | Intent logged before, outcome appended after — append-only build-up. |
| R5 | Everything traces to an SSOT + version | Every behavioural change names the SSOT artifact(s) and version it derives from (SPEC §5, §7.1). No code encodes a rule not traceable to `sources-of-truth/`. |
| R6 | Never skip the TDD order | Specification → test schema → test implementation → actual implementation, at component, controller, service, and api-client layers (SPEC §6). Tests fail first. |
| R7 | Respect the layering | `components → domain → controllers → services → api-client`; no component reaches past its layer (SPEC §7.2). |
| R8 | Validate against the SSOTs before executing | An instruction is validated against the SSOT set first; if it fails it does **not** run — mark the addendum `Blocked-pending-SSOT@vN` with the proposed SSOT diff until a new version is ratified (SPEC §5.4). Cross-module needs go through the Collaboration Contract (SSOT 7) via an ACL (SPEC §5.3). |
| R9 | Human inputs are lazy here | Frontend derives from SSOTs, not fresh media, so there is no `inputs/` by default. If a human does provide source material, create `inputs/` on first use (same rules as SPEC §12.5); otherwise reference the module-level `resources/`. |

## How this works in practice

| Step | What happens |
| ---- | ------------ |
| 1 | A new ask arrives. |
| 2 | It is written into a new addendum (R1) and linked from `instructions.md` (R2). |
| 3 | The work is done: analysis tabled (R3), traced to SSOT + version (R5), TDD order honored (R6), layering respected (R7). |
| 4 | The addendum records the outcome, becoming context for the next iteration (R4). |

## Addendum numbering

- Format: `addendum-NNN-short-slug.md` (zero-padded 3-digit sequence).
- This file is `001`. The next is `002`, and so on — numbers are never reused.
