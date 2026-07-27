// API Client contract — Foodbridge Modules Products
// Derived from backend/api-spec. Both the real and mock implementation
// satisfy this same interface so they are swappable with zero frontend changes.

import type { EntityName } from "@foodbridge-modules-products/ssot/domain-model";

export interface ApiClient {
  listEntities(): Promise<EntityName[]>;
  getEntity(id: string): Promise<EntityName>;
  createEntity(input: Omit<EntityName, "id">): Promise<EntityName>;
}
