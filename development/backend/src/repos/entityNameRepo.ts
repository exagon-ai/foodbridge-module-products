// Repo layer — Foodbridge Modules Products
// Persistence only. Swap the in-memory store below for a real DB adapter
// without changing the service layer's contract.

import type { EntityName } from "@foodbridge-modules-products/ssot/domain-model";
import type { EntityNameRepoContract, EntityNameCreateInput } from "./entityNameRepo.contract";

export class EntityNameRepo implements EntityNameRepoContract {
  private store = new Map<string, EntityName>();
  private counter = 0;

  async findAll(): Promise<EntityName[]> {
    return Array.from(this.store.values());
  }

  async findById(id: string): Promise<EntityName | null> {
    return this.store.get(id) ?? null;
  }

  async create(input: EntityNameCreateInput): Promise<EntityName> {
    this.counter += 1;
    const entity: EntityName = { id: `entity-${this.counter}`, ...input };
    this.store.set(entity.id, entity);
    return entity;
  }
}
