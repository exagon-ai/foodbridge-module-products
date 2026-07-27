// Service layer — Foodbridge Modules Products
// Business orchestration. Contract derived from Domain Model + Workflow Model.
// Never talks to HTTP; never assumes a specific persistence mechanism.

import type { EntityName } from "@foodbridge-modules-products/ssot/domain-model";
import type { EntityNameRepoContract, EntityNameCreateInput } from "../repos/entityNameRepo.contract";
import type { EntityNameServiceContract } from "./entityNameService.contract";

// Re-exported for consumers/tests that import the error from the service module.
export { NotFoundError } from "./entityNameService.contract";

export class EntityNameService implements EntityNameServiceContract {
  constructor(private readonly repo: EntityNameRepoContract) {}

  async list(): Promise<EntityName[]> {
    return this.repo.findAll();
  }

  async get(id: string): Promise<EntityName | null> {
    return this.repo.findById(id);
  }

  async create(input: EntityNameCreateInput): Promise<EntityName> {
    // Apply any SSOT-2 invariants / SSOT-5 workflow guards here before persisting.
    return this.repo.create(input);
  }
}
