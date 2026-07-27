# Service Layer — Foodbridge Modules Products

Only add a service here if there is genuine cross-cutting logic the controller
shouldn't own directly — e.g. caching across multiple components, retry policies,
or aggregating multiple API Client calls into one operation.

If you don't need one yet, leave this folder empty. The Controller talking
directly to the API Client is the default and preferred path (see SPEC.md §7.2).
