// Repo layer test — verifies persistence contract, independent of storage engine
// ssotRef: 02-domain-model.v0
import { describe, it, expect } from "vitest";
import { EntityNameRepo } from "../../src/repos/entityNameRepo";

describe("Foodbridge Modules Products — EntityNameRepo", () => {
  it("findAll returns an empty array before any create", async () => {
    const repo = new EntityNameRepo();
    expect(await repo.findAll()).toEqual([]);
  });

  it("create then findById returns the same record", async () => {
    const repo = new EntityNameRepo();
    const created = await repo.create({ field: "Example" });
    expect(await repo.findById(created.id)).toEqual(created);
  });
});
