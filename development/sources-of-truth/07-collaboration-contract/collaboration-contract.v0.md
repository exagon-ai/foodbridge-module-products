# SSOT 7 — Collaboration Contract

**Module:** Foodbridge Modules Products
**Version:** v0 (default — **fully private**, no external surface)
**Mutability:** Versioned by **semver**. Additive change = minor; breaking change = major + a published deprecation window. External consumers pin to a version and upgrade deliberately.
**Scope:** The module's boundary only — how it collaborates with *other modules*. Not internal wiring (that is SSOTs 1–6).

> This is a **projection** of the Canonical Domain Model (SSOT 2) *outward* to other
> modules — the mirror of how the Frontend Domain Model (SSOT 4) projects it inward
> to the UI. It may expose a subset of the domain; it must never contradict it.
>
> Default posture is **fully private**. Add to `provides`/`requires` only when a real
> cross-module need appears — do not design a public interface before there is a consumer.

**Status:** `draft`

## 1. `provides` — the open surface

What this module publishes to others for reuse. Empty in v0.

| Export | Kind (entity / event / capability) | Shape / ref | Stability guarantee |
|---|---|---|---|
| _(none yet)_ | | | |

## 2. Guaranteed invariants

Promises this module will always hold for external consumers (the "rigid" part of the contract).

- _(none yet)_

## 3. `private` — never exposed

What this module deliberately keeps internal and will not expose across the boundary.

- Everything not listed in §1 (private by default).

## 4. `requires` — external dependencies

What this module depends on from other modules' Collaboration Contracts, pinned by version.
Consumed **only through an Anti-Corruption Layer** (an adapter that translates the external
language into this module's own domain — see SPEC §5.3).

| Depends on module | Contract export | Version pinned | Consumed via (ACL location) |
|---|---|---|---|
| _(none yet)_ | | | |

## 5. Deprecations

Published deprecations and their removal window (breaking changes only).

| Export | Deprecated in | Removed in (planned) | Migration |
|---|---|---|---|
| _(none)_ | | | |

---
### Changelog
- v0: initial draft — fully private, no external surface
