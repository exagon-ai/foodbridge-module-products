# Instructions — Foodbridge Modules Products (frontend)

> **Single point of collaboration for the Frontend.** Any coding agent working on
> this package reads this first, logs every instruction it is given as an
> addendum, and continues from where the last one left off.

## Scope

Frontend work is **strictly derived** from the SSOTs — it may not invent business
meaning, state shape, or interaction behavior (SPEC §7). Every instruction here
must trace to the SSOT(s) it consumes and honor the layering
`components → domain → controllers → services → api-client`.

## Context / file definitions

| Ref | Path | What it is |
| --- | ---- | ---------- |
| Consumed SSOTs | `../../sources-of-truth/` | State Machine (01), UX Component Library (03), Frontend Domain Model (04), Workflow Model (05), Test Bed Schema (06) |
| Sandbox | `../sandbox/` | Standalone shell to run/demo the module in isolation against the mock API client |
| API client | `../src/api-client/` | Typed client + mock; frontend never blocks on backend availability (SPEC §8.2) |
| Tests | `../tests/` | `business` / `behavioural` / `functional` / `integration` (SPEC §7.3) |

## Working rules

Standing rules are in **[Addendum 001 — Working Rules](./addendum-001-working-rules.md)**.

## Addenda

- [Addendum 001 — Working Rules](./addendum-001-working-rules.md) — standing rules for frontend work (addendum-first, table summaries, SSOT traceability, TDD order, layering, gradual context build-up)
