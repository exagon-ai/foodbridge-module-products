// Frontend Domain layer — Foodbridge Modules Products
// Pure mapping functions implementing SSOT 4 (Frontend Domain Model).
// Consumes SSOT 2 (Canonical Domain Model) types, never redefines them.

import type { EntityName } from "@foodbridge-modules-products/ssot/domain-model";
import { toEntityNameViewModel, type EntityNameViewModel } from "@foodbridge-modules-products/ssot/frontend-domain-model";

const STATUS_LABELS: Record<string, string> = {
  idle: "Idle",
  next_state: "Complete",
};

export function mapEntityNameToViewModel(
  entity: EntityName,
  state: string
): EntityNameViewModel {
  return toEntityNameViewModel(entity, STATUS_LABELS[state] ?? state);
}
