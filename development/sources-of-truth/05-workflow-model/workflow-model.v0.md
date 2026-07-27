# SSOT 5 — Workflow Model (FSM Schema)

**Module:** Foodbridge Modules Products
**Version:** v0
**Mutability:** Versioned
**Scope:** Behavioral semantics at the cross-actor **process** level (as opposed to SSOT 1, which governs a single entity's lifecycle). Multiple actors, permissions/scope, and potentially multiple SSOT-1 state machines are coordinated here.

## 1. Process states

| State | Description |
|---|---|
| `initiated` | Process has started |

## 2. Events

| Event | Triggered by (actor) | Payload |
|---|---|---|
| `PROCESS_EVENT` | `actorRole` | `{ field: type }` |

## 3. Transitions

| From | Event | To | Guard | Actions | Permission/scope required |
|---|---|---|---|---|---|
| `initiated` | `PROCESS_EVENT` | `next` | — | — | `actorRole:write` |

## 4. Actors

| Actor | Role in this process | Permissions/scope |
|---|---|---|
| `actorRole` | Description | `read`, `write` |

## 5. Cross-entity coordination

How does this process relate to/drive the SSOT-1 state machines of the entities involved?

---
### Changelog
- v0: initial stub
