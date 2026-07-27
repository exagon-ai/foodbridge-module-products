// SSOT 2 — Canonical Domain Model (executable types) — Foodbridge Modules Products — v0
// FROZEN once domain-model.v0.md status = "frozen". Do not edit after that point;
// fork a new module instead.
//
// Consumed by: backend/src (directly), frontend/src/domain (via projection, SSOT 4)

export interface EntityName {
  id: string;
  field: string;
}
