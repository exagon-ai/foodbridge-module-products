# Addendum 001 — Working Rules

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-07-25

Standing rules for how we collaborate on the **Foodbridge Modules Products** module. They apply
to every iteration unless a later addendum supersedes them.

## Rules

| # | Rule | Detail |
| - | ---- | ------ |
| R1 | New instructions go in an addendum | Any new instruction or decision is captured as a separate `addendum-NNN-*.md` file, never edited directly into `instructions.md`. |
| R2 | Link every addendum from the index | Each addendum must be linked from `instructions.md` under "Addenda" so the main file stays the single entry point. |
| R3 | Summarise analysis as a table first | Any analysis is presented as a table summary first; narrative is only supporting detail. |
| R4 | Capture each iteration in an addendum first | At the start of each iteration the intent is captured in an addendum; at the end the outcome is appended. The folder becomes a gradual, append-only context build-up. |
| R5 | Everything traces to an SSOT + version | Every instruction that changes behaviour names the source-of-truth artifact(s) and version it affects (SPEC §5). If a decision has no SSOT, propose the SSOT change first. |
| R6 | Never skip the TDD order to move faster | Specification → test schema → test implementation → actual implementation is honored even when compressed into one turn (SPEC §6). |
| R7 | Validate against the SSOTs before executing | An instruction is validated against the SSOT set first; only then is it tuned, finalized, logged, and executed (SPEC §5.4). If validation fails it does **not** run — the addendum is marked `Blocked-pending-SSOT@vN` and carries the proposed SSOT diff until a new version is ratified. |
| R8 | External collaboration goes through the Contract | Anything crossing the module boundary (cross-cutting concerns, reuse, cross-module dependencies) is governed by the Collaboration Contract (SSOT 7) and consumed via an Anti-Corruption Layer — never by reading another module's internals or logs (SPEC §5.3). |
| R9 | Human inputs live in `inputs/`, referenced by the log | Source material a human provides (brief, PDF, image, audio, video, link) goes in `inputs/`, not into `instructions.md`. Non-text inputs carry a text derivative; the consuming addendum cites them via an `Inputs:` header. The input is authoritative over the agent's summary (SPEC §12.5). |

## How this works in practice

| Step | What happens |
| ---- | ------------ |
| 1 | A new ask or decision arrives. |
| 2 | It is written into a new addendum (R1) and linked from `instructions.md` (R2). |
| 3 | It is **validated against the SSOTs** (R7). If it fails, it is marked `Blocked-pending-SSOT` with a proposed SSOT diff and does not execute; otherwise it proceeds. |
| 4 | The work is done: analysis tabled (R3), traced to SSOT + version (R5), TDD order honored (R6), boundary crossings via the Contract (R8). |
| 5 | The addendum is updated with the outcome, becoming the context for the next iteration (R4). |

## Addendum numbering

- Format: `addendum-NNN-short-slug.md` (zero-padded 3-digit sequence).
- This file is `001`. The next instruction is `002`, and so on — numbers are never reused.
