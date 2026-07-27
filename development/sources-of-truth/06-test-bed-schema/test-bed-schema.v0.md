# SSOT 6 — Test Bed Schema

**Module:** Foodbridge Modules Products
**Version:** v0
**Mutability:** Versioned
**Scope:** The executable specification / implementation contract. Every test written in `frontend/tests/` and `backend/tests/` must conform to the shape defined here.

## 1. Test case schema

Every test case, regardless of layer, is expressed as:

```ts
interface TestCase<Input, ExpectedOutput> {
  id: string;                 // e.g. "domain-entityname-001"
  description: string;        // human-readable, references the SSOT + section it verifies
  ssotRef: string;             // e.g. "02-domain-model.v0#invariant-1"
  input: Input;
  expectedOutput: ExpectedOutput;
  category: "business" | "behavioural" | "functional" | "integration";
}
```

## 2. Coverage matrix (fill in as tests are added)

| SSOT | Section | Test category | Test file | Status |
|---|---|---|---|---|
| 02-domain-model.v0 | Invariant 1 | business | `frontend/tests/business/...` | ☐ not started |
| 01-state-machine.v0 | Transition table | behavioural | `frontend/tests/behavioural/...` | ☐ not started |
| 03-ux-component-library.v0 | Component X | functional | `frontend/tests/functional/...` | ☐ not started |
| api-spec.v0 | Endpoint Y | integration | `frontend/tests/integration/...` | ☐ not started |
| 06-test-bed-schema.v0 (api↔service seam) | API against the service mock | integration (backend) | `backend/tests/api/entitiesService.contract.test.ts` | ☐ not started |
| 06-test-bed-schema.v0 (service↔repo seam) | Service against the repo mock | integration (backend) | `backend/tests/services/entityNameService.test.ts` | ☐ not started |
| 06-test-bed-schema.v0 (repo seam) | Adapter satisfies the repo contract | integration (backend) | `backend/tests/repos/entityNameRepo.test.ts` | ☐ not started |

## 2.1 Backend layer-contract seams (SPEC §8)

Each backend layer boundary is a **contract**, derived from the SSOTs, **ratified and
mock-backed before implementation** so the three layers build in unison — each layer is
verified against the adjacent layer's *contract*, never its concrete implementation.
These test schemas are entries in this SSOT-6, not separate SSOTs. Add a seam only for a
layer that actually exists (a stateless module has no repo seam — SPEC §7.2).

| Seam | Contract (port) | Mock (stand-in) | Test schema (this SSOT) |
|---|---|---|---|
| api ↔ service | `backend/src/services/entityNameService.contract.ts` (`EntityNameServiceContract`, inbound port; owns error types) | `entityNameService.mock.ts` | API-against-service-mock |
| service ↔ repo | `backend/src/repos/entityNameRepo.contract.ts` (`EntityNameRepoContract`, outbound port) | `entityNameRepo.mock.ts` | Service-against-repo-mock |
| repo | `EntityNameRepoContract` | (real in-memory adapter) | Adapter satisfies the persistence contract |

Rule: an implementation may only be built once its inbound and outbound contracts exist
and are mock-backed. The API spec (`backend/api-spec/`) is the topmost such contract;
`EntityNameServiceContract` and `EntityNameRepoContract` are the two below it.

## 3. Rule

No test may exist without a `ssotRef`. No implementation file may exist without a corresponding test written first (TDD order, Section 6 of SPEC.md).

---
### Changelog
- v0: initial stub
