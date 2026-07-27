// Mock repo (in-memory, fixture-seedable) satisfying EntityNameRepoContract.
// Lets the service layer be developed and tested against the repo contract
// before a real persistence adapter exists (SPEC §8 — layer contracts).

import type { EntityName } from "@foodbridge-modules-products/ssot/domain-model";
import type { EntityNameRepoContract, EntityNameCreateInput } from "./entityNameRepo.contract";

export function createMockEntityNameRepo(seed: EntityName[] = []): EntityNameRepoContract {
  const store = new Map<string, EntityName>(seed.map((e) => [e.id, e]));
  let counter = seed.length;

  return {
    async findAll() {
      return Array.from(store.values());
    },
    async findById(id) {
      return store.get(id) ?? null;
    },
    async create(input: EntityNameCreateInput) {
      counter += 1;
      const entity: EntityName = { id: `entity-${counter}`, ...input };
      store.set(entity.id, entity);
      return entity;
    },
  };
}
