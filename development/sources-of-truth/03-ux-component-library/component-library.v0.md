# SSOT 3 — UX Component Library

**Module:** Foodbridge Modules Products
**Version:** v0
**Mutability:** Versioned
**Scope:** Interaction semantics — how a human operates the UI. Not visual styling (that's a design-system concern), not data shape (SSOT 4).

## 1. Components in this library

### Component: `ComponentName`

- **Purpose:** what interaction it enables
- **Props (interaction-relevant only):**
  | Prop | Type | Interaction meaning |
  |---|---|---|
  | `onAction` | `() => void` | Fires when the user does X |
- **States:** default / hover / disabled / loading / error — describe user-visible behavior for each
- **Accessibility contract:** keyboard interaction, focus behavior, ARIA role
- **Composability:** can this be nested/reused inside other components in this module?

## 2. Interaction patterns shared across this module

Describe any cross-component conventions (e.g. "all destructive actions require a confirm step").

---
### Changelog
- v0: initial stub
