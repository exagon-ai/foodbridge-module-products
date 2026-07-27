# SSOT 2 — Canonical Domain Model

**Module:** Foodbridge Modules Products
**Version:** v0 (draft — not yet frozen)
**Mutability:** FROZEN once ratified. Do not edit after `status: frozen` below is set.
**Scope:** Business semantics only. No UI, no API, no persistence detail here.

> ⚠️ Once this document's status changes to `frozen`, any further change requires
> forking a new module rather than editing this file. Ratify carefully.

**Status:** `draft`

## 1. Entities

### Entity: `EntityName`

| Field | Type | Required | Business meaning / invariant |
|---|---|---|---|
| `id` | string (UUID) | yes | Unique identifier |
| `field` | string | yes | Describe business meaning, not storage detail |

**Invariants:**
- Invariant 1 (e.g. "an EntityName cannot exist without an owner")

## 2. Relationships

| From | Relationship | To | Cardinality |
|---|---|---|---|
| `EntityName` | belongs to | `OwnerEntity` | many-to-one |

## 3. Vocabulary / Ubiquitous Language

| Term | Definition |
|---|---|
| Term | What the business means by this word — used consistently everywhere (code, UI copy, docs) |

## 4. Explicit non-goals

What this domain model deliberately does NOT define (to prevent scope creep into other modules).

---
### Changelog
- v0: initial draft, not yet frozen
