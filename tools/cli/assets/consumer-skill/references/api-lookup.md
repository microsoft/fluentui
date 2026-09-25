# API lookup and imports

`fluentui-cli api` reads the public metadata shipped by packages installed for the selected project.

- Prefer `--system fluent-v9` for the styled `@fluentui/react-components` facade.
- Prefer `--system headless` for `@fluentui/react-headless-components-preview` public subpaths.
- Use `--from <npm-import-path>` when the import path must be exact.
- Omit the symbol to list an import path's exports.
- Prefer `--json --dense` for the compact, versioned agent response. Plain `--json` returns full metadata.

These are built-in presets, not a closed list. Read configured system names from the project configuration and
doctor output; use `--system <configured-name>` for private UI packages. A local catalogue path can provide API data,
but package guidance requires an installed/linked catalogue package and explicit `extensions` approval.

The recommended import is consumer-facing. Definition ownership explains where an API is declared and can point to
a leaf or shared package. Never replace `recommendedImport` with the definition owner unless the CLI reports that
owner as a verified public import candidate.

If `recommendedImport` is null, inspect `importStatus`, `importCandidates`, and diagnostics. Resolve ambiguity with
`--from`; do not choose alphabetically. Use `--verbose` for provenance and export routes, `--include-inherited` for
inherited React/DOM members, and `--expand-types` for full slot/member types.

Dense detail has response type `fluentui.api-detail.dense`; listings use `fluentui.api-index.dense`.
Read component members from `data.result.props[].members`, and direct props/slots/state type members from
`data.result.members.members`. Signatures and descriptions stay readable. `required` is explicit; omitted
`readonly` means false and omitted `default` means no documented default. A `typeSummary: "slot"` marks a
documentation summary rather than an exact TypeScript expression.

`props: null` means props metadata is unavailable; `props: []` means the component has no props.
Collapsed inherited members are counted in `omittedInherited`; their incomplete members remain in `omittedIssues`.
Unclassified members stay visible. Never interpret the default view as the complete accepted-prop list, or partial
and unavailable statuses as proof that an API is unsupported. Check envelope diagnostics and coverage.

Drop `--dense` only when raw declaration/provenance data is necessary. `--verbose` adds compact provenance,
not full metadata. Without `--json`, `--dense` leaves the already compact Markdown output unchanged.
