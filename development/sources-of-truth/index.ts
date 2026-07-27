// @foodbridge-modules-products/ssot — aggregate entry point for the module's Sources of Truth.
// Consumers may import from here or from the versioned subpaths
// ("@foodbridge-modules-products/ssot/state-machine", "/domain-model", "/frontend-domain-model").
// Explicit .js specifiers keep the compiled dist valid under native Node ESM.

export { foodbridgeModulesProductsMachine } from "./01-state-machine/state-machine.v0.xstate.js";
export type { EntityName } from "./02-domain-model/domain-model.v0.types.js";
export { toEntityNameViewModel } from "./04-frontend-domain-model/frontend-domain-model.v0.types.js";
export type { EntityNameViewModel } from "./04-frontend-domain-model/frontend-domain-model.v0.types.js";
