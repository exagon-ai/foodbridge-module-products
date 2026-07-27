// Real API Client implementation — Foodbridge Modules Products
// Talks to the actual backend, per backend/api-spec. Swappable 1:1 with mock.ts
// via dependency injection — no consumer code should import this directly;
// wire it at the app composition root instead.

import type { ApiClient } from "./types";
import type { EntityName } from "@foodbridge-modules-products/ssot/domain-model";

export function createApiClient(baseUrl: string): ApiClient {
  return {
    async listEntities(): Promise<EntityName[]> {
      const res = await fetch(`${baseUrl}/entities`);
      if (!res.ok) throw new Error(`listEntities failed: ${res.status}`);
      return res.json();
    },
    async getEntity(id: string): Promise<EntityName> {
      const res = await fetch(`${baseUrl}/entities/${id}`);
      if (!res.ok) throw new Error(`getEntity failed: ${res.status}`);
      return res.json();
    },
    async createEntity(input: Omit<EntityName, "id">): Promise<EntityName> {
      const res = await fetch(`${baseUrl}/entities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error(`createEntity failed: ${res.status}`);
      return res.json();
    },
  };
}
