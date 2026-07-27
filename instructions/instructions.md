# Instructions — Foodbridge Modules Products (module)

> **Single point of collaboration for this module.** Any coding agent picking up
> work here reads this file first, logs every instruction it is given as an
> addendum, and continues from where the last one left off. This folder is the
> module-level, append-only memory that spans Discovery, Frontend, and Backend.

## Scope

This log governs the **module as a whole** — cross-cutting decisions, priorities,
and instructions that don't belong to a single phase. Phase-specific logs live in:

- `discovery/instructions/`
- `development/frontend/instructions/`
- `development/backend/instructions/`

An instruction goes in the **narrowest** log that fully contains it; if it spans
phases, it belongs here.

## Context / file definitions

Key sources this log points at. Fill in as the module grows.

| Ref | Path | What it is |
| --- | ---- | ---------- |
| SSOTs | `development/sources-of-truth/` | The 8 governing artifacts every decision must trace to (see SPEC §5) |
| Changelog | `development/sources-of-truth/CHANGELOG.md` | Cross-SSOT version history |
| Discovery log | `discovery/instructions/` | Instruction log for the Discovery phase |
| Frontend log | `development/frontend/instructions/` | Instruction log for Frontend work |
| Backend log | `development/backend/instructions/` | Instruction log for Backend work |
| Inputs | `inputs/` | Human-provided source material for module-wide collaboration, any format (§12.5) |
| Resources | `../resources/` | Optional shared cross-scope reference material (design system, research) (§12.5) |

## Working rules

Standing rules for how we work here are in **[Addendum 001 — Working Rules](./addendum-001-working-rules.md)**.
They apply to every iteration unless a later addendum supersedes them.

## Addenda

Append-only index. Every new instruction is a new addendum, linked here.

- [Addendum 001 — Working Rules](./addendum-001-working-rules.md) — standing rules for how we work (addendum-first, table summaries, SSOT traceability, gradual context build-up)
