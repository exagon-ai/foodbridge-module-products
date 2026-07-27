// API Client contract — Foodbridge Modules Products (backend-published copy, mirrors frontend/src/api-client/types.ts)
// This is the package the frontend depends on as an external lib in a real
// multi-repo setup. In this template it's colocated for simplicity.

export interface EntityName {
  id: string;
  field: string;
}

export interface ApiClient {
  listEntities(): Promise<EntityName[]>;
  getEntity(id: string): Promise<EntityName>;
  createEntity(input: Omit<EntityName, "id">): Promise<EntityName>;
}
