# Foodbridge Modules Products

An application **module** built to the **Application Module Development Standard (AMDS)**.
This README is the orientation for anyone opening this repo. If you're new: read this top to
bottom, then skim `instructions/instructions.md` (the collaboration log) before changing anything.

## What this is

A self-contained capability with two phases:

- **`discovery/`** — disposable HTML prototypes (`screens/` + a wiring `index.html`) that explored the problem. Not code you build on; it produced the *decisions* below.
- **`development/`** — the real build, an npm **workspace** of three packages:
  - **`sources-of-truth/`** — the `@foodbridge-modules-products/ssot` package: the **8 SSOTs** that govern everything. Frontend and backend *derive* from these; they never invent meaning.
  - **`frontend/`** — React package (layered: components → domain → controllers → services → api-client), runs standalone via `sandbox/`.
  - **`backend/`** — Node/TS package (api → service → repo, each with a contract + mock).

## Run it

```bash
cd development
npm install        # one workspace install: builds @foodbridge-modules-products/ssot and links both halves
npm test           # frontend + backend test suites

npm run sandbox -w @modules/foodbridge-modules-products-frontend   # interactive frontend
npm run dev     -w @modules/foodbridge-modules-products-backend    # backend API (default :3000)
```

> Requires Node 18+ and npm 7+ (workspaces). Everything is ESM + TypeScript, tested with vitest.

## The rules that matter (why the structure is what it is)

| Rule | Meaning |
|---|---|
| **Everything derives from the SSOTs** | No business rule, state, or interaction exists in `frontend/`/`backend/` unless it traces to a file (and version) under `development/sources-of-truth/`. |
| **Import the SSOT package, never reach in** | Use `@foodbridge-modules-products/ssot/...`; never `../../../sources-of-truth/...`. That's what keeps each half portable. |
| **Domain Model is frozen** | SSOT-2 is frozen once ratified — a fundamental change forks a *new* module, not a new version. |
| **TDD order is non-negotiable** | specification → test schema → test (fails first) → implementation, at every layer. |
| **Layer contracts before implementation** | Each backend layer has a `.contract.ts` + `.mock.ts` so api/service/repo build in unison. |
| **Log your work** | Every instruction/decision goes in an `instructions/<scope>/` addendum. Human source material (briefs, recordings, PDFs) goes in `instructions/<scope>/inputs/`. |

## Check compliance

If the AMDS CLI is installed (see the `module-standard` repo), from this module's parent dir:

```bash
check-module ./foodbridge-modules-products
```

It verifies SSOT structure + versions, the package boundary, backend layer contracts, test
traceability, input derivatives, and discovery structure. Exits non-zero on errors — wire it into CI.

## Where things live

| Path | What |
|---|---|
| `instructions/` | The collaboration log — read `instructions.md` first; work is captured in `addendum-NNN-*.md` |
| `instructions/*/inputs/` | Human-provided source material (module + discovery scaffolded; frontend/backend on demand) |
| `resources/` | Optional shared cross-scope material (design system, research) |
| `development/sources-of-truth/CHANGELOG.md` + `ssot.manifest.json` | SSOT version history + per-artifact versions |

This module is governed by AMDS; the full standard (`SPEC.md`) lives in the **`module-standard`** repo.
