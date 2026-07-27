# Instructions — Foodbridge Modules Products (backend)

> **Single point of collaboration for the Backend.** Any coding agent working on
> this package reads this first, logs every instruction it is given as an
> addendum, and continues from where the last one left off.

## Scope

Backend work is **strictly derived** from the State Machine, Domain Model, and
Workflow Model, down the cascade `API Spec → API Client (+ mock) → Service → Repo`
(SPEC §8). No layer
invents its contract locally. Every instruction here must trace to the SSOT(s) it
derives from.

## Context / file definitions

| Ref | Path | What it is |
| --- | ---- | ---------- |
| Consumed SSOTs | `../../sources-of-truth/` | Canonical Domain Model (02, frozen), Workflow Model (05), State Machine (01), Test Bed Schema (06), Collaboration Contract (07 — governs the public API subset) |
| API spec | `../api-spec/` | Versioned API contract derived from State Machine + Domain + Workflow models |
| API client | `../api-client/` | Consumable lib incl. mock implementation (SPEC §8.2) |
| Tests | `../tests/` | `api` / `services` / `repos` — the spec→schema→test→impl cascade per layer |

## Working rules

Standing rules are in **[Addendum 001 — Working Rules](./addendum-001-working-rules.md)**.

## Addenda

- [Addendum 001 — Working Rules](./addendum-001-working-rules.md) — standing rules for backend work (addendum-first, table summaries, SSOT traceability, derivation order, TDD order, gradual context build-up)
