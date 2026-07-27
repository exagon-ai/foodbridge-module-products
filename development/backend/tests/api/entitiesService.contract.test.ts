// api↔service seam contract test — drives the API layer against a service MOCK,
// proving the API can be built and verified before the real service/repo exist
// (SPEC §8 — backend layer contracts; §8.2 extended down the layers).
// ssotRef: 06-test-bed-schema.v0 (api↔service seam) / api-spec.v0
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../src/api/server";
import { createMockEntityNameService } from "../../src/services/entityNameService.mock";

describe("Foodbridge Modules Products — api↔service contract (API against a service mock)", () => {
  it("routes create + list through the service contract", async () => {
    const app = createApp(createMockEntityNameService());
    const created = await request(app).post("/entities").send({ field: "From mock" });
    expect(created.status).toBe(201);

    const list = await request(app).get("/entities");
    expect(list.body).toEqual(expect.arrayContaining([expect.objectContaining({ field: "From mock" })]));
  });
});
