// Mock implementation of the published API Client — Foodbridge Modules Products
// Ships alongside the real client so frontend consumers can develop against
// a stable contract before the real backend exists. See SPEC.md §8.2.

import type { ApiClient, EntityName } from "./types";

export function createMockApiClient(): ApiClient {
  const data: EntityName[] = [
    { id: "mock-1", field: "Example one" },
    { id: "mock-2", field: "Example two" },
  ];

  return {
    async listEntities() {
      return data;
    },
    async getEntity(id) {
      const found = data.find((e) => e.id === id);
      if (!found) throw new Error(`not found: ${id}`);
      return found;
    },
    async createEntity(input) {
      const entity = { id: `mock-${data.length + 1}`, ...input };
      data.push(entity);
      return entity;
    },
  };
}
