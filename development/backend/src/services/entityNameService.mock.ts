// Mock service satisfying EntityNameServiceContract. Lets the API layer be
// developed and tested against the service contract before the real service/repo
// exist (SPEC §8.2, extended down the backend layers).

import type { EntityName } from "@foodbridge-modules-products/ssot/domain-model";
import type { EntityNameServiceContract } from "./entityNameService.contract";
import type { EntityNameCreateInput } from "../repos/entityNameRepo.contract";

export function createMockEntityNameService(seed: EntityName[] = []): EntityNameServiceContract {
  const items = [...seed];
  let counter = seed.length;

  return {
    async list() {
      return items;
    },
    async get(id) {
      return items.find((e) => e.id === id) ?? null;
    },
    async create(input: EntityNameCreateInput) {
      counter += 1;
      const entity: EntityName = { id: `entity-${counter}`, ...input };
      items.push(entity);
      return entity;
    },
  };
}
