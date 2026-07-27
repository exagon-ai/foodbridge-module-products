// SSOT 4 — Frontend Domain Model (executable) — Foodbridge Modules Products — v0
// A projection of SSOT 2 (Canonical Domain Model). Never redefines business meaning.

import type { EntityName } from "../02-domain-model/domain-model.v0.types";

export interface EntityNameViewModel {
  id: string;
  displayName: string;
  statusLabel: string;
}

export function toEntityNameViewModel(
  entity: EntityName,
  statusLabel: string
): EntityNameViewModel {
  return {
    id: entity.id,
    displayName: entity.field,
    statusLabel,
  };
}
