// Service Contract (inbound port) — Foodbridge Modules Products — v0
// Versioned. The "api-looking" interface the API layer calls into. Derived from
// the API spec (itself derived from SSOT-1/-2/-5). Ratified and mock-backed BEFORE
// the API or the real service is implemented, so the API layer builds against it
// while the service is still unwritten (SPEC §8 — backend layer contracts).
//
// The contract owns its error semantics so the API layer behaves identically
// against the real service and against a mock.

import type { EntityName } from "@foodbridge-modules-products/ssot/domain-model";
import type { EntityNameCreateInput } from "../repos/entityNameRepo.contract";

/** Referenced entity does not exist (→ HTTP 404). */
export class NotFoundError extends Error {}

export interface EntityNameServiceContract {
  list(): Promise<EntityName[]>;
  get(id: string): Promise<EntityName | null>;
  create(input: EntityNameCreateInput): Promise<EntityName>;
}
