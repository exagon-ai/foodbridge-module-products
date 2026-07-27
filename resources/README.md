# Resources — Foodbridge Modules Products (shared, cross-scope)

> **Optional shared reference corpus.** Material that *many* scopes read — a design system,
> a research corpus, brand assets, glossaries. Distinct from `instructions/*/inputs/`, which
> holds inputs tied to a specific scope's collaboration. Frontend/backend usually **reference
> up** to this folder rather than keeping their own copies (SPEC §12.5).

Create subfolders as needed (e.g. `design/`, `research/`, `assets/`). The same input rules
apply: **non-text material carries a text derivative**, and **large/binary/sensitive assets
are referenced by link** (`<name>.link.md`) rather than committed.

This folder is **created when shared material first exists** — it may be empty or absent in a
new module. Scope-specific one-off inputs belong in the relevant `instructions/*/inputs/` instead.
