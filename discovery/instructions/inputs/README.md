# Inputs — Foodbridge Modules Products (discovery scope)

> **Human drop-zone for Discovery source material** — the firehose: briefs, research,
> personas, competitor references, recorded walkthroughs, reference screenshots. Discovery
> is "the conversation" (SPEC §3.1, §9), so most human inputs land here. The agent's log
> (`../instructions.md` + addenda) references these; it never replaces them (SPEC §12.5).

## Rules (SPEC §12.5)

| # | Rule |
| - | ---- |
| 1 | **Any format is allowed** — `.md`, PDF, image, audio, video, links. Humans may also hand-author an addendum directly. |
| 2 | **Text inputs are used as-is.** A non-text input **must** have a sibling **text derivative**: `<name>.transcript.md` (audio/video), `<name>.summary.md` (PDF/doc), `<name>.annotation.md` (image). |
| 3 | **Large / binary / sensitive media → a reference, not the blob** — `<name>.link.md` with the URL + the text derivative. |
| 4 | **The consuming addendum cites the input** via an `Inputs:` header — file(s), format, text-derivative link, provenance (who / when). |
| 5 | **The input is authoritative** over the agent's summary; the agent amends the log to reconcile. |
| 6 | **Traceability is text-based** — decisions trace to a text derivative or an SSOT, never to opaque media. |

Discovery inputs feed the *decisions* that become SSOTs; a decision carried into Development
should record which input it came from (see `../../design-principles.md`).

## Naming

`YYYY-MM-DD-<slug>.<ext>` for the source, with the matching text derivative beside it.
