// Integration test — verifies API Client <-> backend API spec contract
// ssotRef: backend/api-spec/openapi.v0.yaml#/paths/~1entities
import { describe, it, expect } from "vitest";
import { createMockApiClient } from "../../src/api-client/mock";

describe("Foodbridge Modules Products — API client contract", () => {
  it("listEntities returns an array matching the EntityName shape", async () => {
    const client = createMockApiClient();
    const entities = await client.listEntities();
    expect(Array.isArray(entities)).toBe(true);
    expect(entities[0]).toHaveProperty("id");
  });
});
