# SSOT 4 — Frontend Domain Model

**Module:** Foodbridge Modules Products
**Version:** v0
**Mutability:** Versioned
**Scope:** Presentation semantics — a projection of the Canonical Domain Model (SSOT 2) shaped for how the UI needs to consume it. Never redefines business meaning; only reshapes/derives it (formatting, computed display fields, denormalization for rendering).

## 1. View models

### View model: `EntityNameViewModel`

| Field | Derived from (SSOT 2 field) | Presentation rule |
|---|---|---|
| `displayName` | `EntityName.field` | e.g. title-cased, truncated to 40 chars |
| `statusLabel` | (derived from SSOT 1 state) | Human-readable label per state |

## 2. Mapping rules

Describe the pure function(s) that map Canonical Domain Model → View Model. These belong in `frontend/src/domain/`.

---
### Changelog
- v0: initial stub
