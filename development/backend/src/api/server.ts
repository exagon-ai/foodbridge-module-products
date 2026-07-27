// API layer — Foodbridge Modules Products
// Thin HTTP layer. Derives its routes from api-spec/openapi.v0.yaml.
// Delegates all business logic to the service layer — never talks to repos directly.

import express from "express";
import { EntityNameService } from "../services/entityNameService";
import { EntityNameRepo } from "../repos/entityNameRepo";
import type { EntityNameServiceContract } from "../services/entityNameService.contract";

// The API layer depends only on the service *contract* (inbound port). The default
// composition root wires the real service + repo; tests can inject a mock service
// to verify the api↔service seam without the real service/repo (SPEC §8).
export function createApp(service: EntityNameServiceContract = new EntityNameService(new EntityNameRepo())) {
  const app = express();
  app.use(express.json());

  app.get("/entities", async (_req, res) => {
    const entities = await service.list();
    res.json(entities);
  });

  app.get("/entities/:id", async (req, res) => {
    const entity = await service.get(req.params.id);
    if (!entity) return res.status(404).end();
    res.json(entity);
  });

  app.post("/entities", async (req, res) => {
    const created = await service.create(req.body);
    res.status(201).json(created);
  });

  return app;
}

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT ?? 3000;
  createApp().listen(port, () => {
    console.log(`Foodbridge Modules Products backend listening on :${port}`);
  });
}
