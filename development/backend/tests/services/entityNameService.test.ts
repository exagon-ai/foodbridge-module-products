// Service layer test — service↔repo seam. Verifies business orchestration against
// the repo *contract* (via createMockEntityNameRepo).
// ssotRef: 06-test-bed-schema.v0 (service↔repo seam) / 02-domain-model.v0 / 05-workflow-model.v0
import { describe, it, expect } from "vitest";
import { EntityNameService } from "../../src/services/entityNameService";
import { createMockEntityNameRepo } from "../../src/repos/entityNameRepo.mock";

describe("Foodbridge Modules Products — EntityNameService", () => {
  it("creates and retrieves an entity", async () => {
    const service = new EntityNameService(createMockEntityNameRepo());
    const created = await service.create({ field: "Example" });
    const fetched = await service.get(created.id);
    expect(fetched).toEqual(created);
  });
});
