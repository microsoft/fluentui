# Declarative package guidance

API catalogue selection and approval to use package instructions are separate decisions. Ask before adding private
packages, and ask before enabling their guidance. Do not open unapproved package guides just because a dependency
advertises them. No plugin code is loaded, no packages are installed, and no network requests are made by init.

## Consumer opt-in

Register an installed or linked workspace package under any valid system name, then explicitly approve its guide:

```json
{
  "schemaVersion": 1,
  "systems": {
    "acme": { "catalogs": [{ "package": "@acme/ui" }] }
  },
  "extensions": ["@acme/ui"],
  "preferences": { "headlessStyling": "css-modules" }
}
```

The styling preference above is an example, not permission to choose it for the user. Preserve all existing system
entries when adding a package. A package in `catalogs` without an `extensions` approval supplies API data only.

Run `fluentui-cli init --dry-run`, review the write receipt, then run `fluentui-cli init`. The generated
[extension index](extensions.md) links to approved package-specific guides. Reuse `recommendedImport` for API
selection; extension ownership is not an alternative import recommendation.

## Package author contract

Publish normal Fluent API metadata using `"fluentuiCatalog": "./metadata.json"`. Add a JSON marker:

```json
{
  "fluentuiExtension": "./fluentui-extension.json"
}
```

When the package has an export map, expose that marker with a string target, for example
`"./fluentui-extension.json": "./fluentui-extension.json"`. Include the descriptor and every listed Markdown file
in the package's published `files`.

```json
{
  "schemaVersion": 1,
  "system": "acme",
  "skill": "./guidance/SKILL.md",
  "references": ["./guidance/components.md"]
}
```

The descriptor schema is shipped at `@fluentui/cli/schemas/fluentui-extension.schema.json`. `system` must match an
enabled configured catalogue containing this package. The entry guide and references are package-relative UTF-8
Markdown files; list every supporting Markdown reference. Relative directory structure is preserved when copied.
Remote URLs, executable hooks, symlinked assets, and paths outside the package are rejected.

Init supports up to 16 approved packages, 32 Markdown files per package, 128 KiB per file, and 2 MiB total guidance.
The installed index records package identities and versions; the ownership receipt records hashes of all managed
copies. Re-running init updates unchanged owned files, rejects local edits, and removes only unedited managed files
whose approval was revoked. Keep project-specific instructions outside these managed copies.
