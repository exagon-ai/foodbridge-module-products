// API layer test — verifies api-spec/openapi.v0.yaml contract
// ssotRef: api-spec/openapi.v0.yaml#/paths/~1entities
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../src/api/server";

describe("Foodbridge Modules Products — /entities API contract", () => {
  it("POST /entities then GET /entities returns the created record", async () => {
    const app = createApp();
    const created = await request(app).post("/entities").send({ field: "Example" });
    expect(created.status).toBe(201);

    const list = await request(app).get("/entities");
    expect(list.status).toBe(200);
    expect(list.body).toEqual(expect.arrayContaining([expect.objectContaining({ field: "Example" })]));
  });
});
