# SSOT 1 — State Machine

**Module:** Foodbridge Modules Products
**Version:** v0
**Mutability:** Versioned
**Scope:** Lifecycle of a single entity/component within this module (not the cross-actor process — see SSOT 5 Workflow Model for that).

## 1. States

| State | Description |
|---|---|
| `idle` | Initial state |

## 2. Events

| Event | Payload | Valid from states |
|---|---|---|
| `EVENT_NAME` | `{ field: type }` | `idle` |

## 3. Transitions

| From | Event | To | Guard | Action |
|---|---|---|---|---|
| `idle` | `EVENT_NAME` | `next_state` | — | `actionName` |

## 4. Actions

| Action | Effect |
|---|---|
| `actionName` | Describe side effect |

## 5. Actors & Permissions

| Actor | Allowed events |
|---|---|
| `owner` | all |
| `viewer` | none (read-only) |

## 6. XState reference implementation

See `state-machine.v0.xstate.ts` in this folder for the executable definition. The table above and the code must never diverge — the code is generated/edited from this spec, not the other way around.

---
### Changelog
- v0: initial stub
