# Inputs — Foodbridge Modules Products (module scope)

> **Human drop-zone for source material.** This is where a human provides raw inputs
> for cross-cutting, module-wide collaboration — briefs, business context, anything
> that spans phases. The agent's *log* (`../instructions.md` + addenda) references
> these; it never replaces them. Inputs are **sources**; the log is *derived* (SPEC §12.5).

Drop material here in any format. An input belongs in the **narrowest** scope that owns
it — module-wide here, else `discovery/`, `frontend/`, or `backend/` inputs. Reference
shared, cross-scope material (design system, research corpus) from the module-level
`resources/` folder instead of copying it.

## Rules (SPEC §12.5)

| # | Rule |
| - | ---- |
| 1 | **Any format is allowed** — `.md`, PDF, image, audio, video, links. Humans may also hand-author an addendum directly; chat is only one path in. |
| 2 | **Text inputs are used as-is.** A non-text input **must** have a sibling **text derivative**: `<name>.transcript.md` (audio/video), `<name>.summary.md` (PDF/doc), `<name>.annotation.md` (image). The agent and the validate-gate consume the text, not the media. |
| 3 | **Large / binary / sensitive media → store a reference, not the blob.** Add `<name>.link.md` with the URL (Drive, ticket, recording host) + the text derivative. Keeps the repo clean. |
| 4 | **The consuming addendum cites the input** via an `Inputs:` header — file(s), format, text-derivative link, and provenance (who / when). |
| 5 | **The input is authoritative.** If the agent's summary and the input disagree, the input wins; the agent amends the log to reconcile. |
| 6 | **Traceability is text-based.** A decision traces to a text artifact (an input's derivative or an SSOT) — never to opaque media ("see the video"). |

## Naming

`YYYY-MM-DD-<slug>.<ext>` for the source, with the matching `YYYY-MM-DD-<slug>.transcript.md`
/ `.summary.md` / `.annotation.md` / `.link.md` beside it.
