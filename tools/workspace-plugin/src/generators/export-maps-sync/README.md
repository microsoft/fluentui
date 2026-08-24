# export-maps-sync

Nx [sync generator](https://nx.dev/concepts/sync-generators) that keeps `package.json` entry point
fields (`main`, `module`, `typings`) and the `exports` map in sync with each project's declared entry
points.

Applies to non-private `library` projects tagged both `vNext` and `platform:web`.

```sh
yarn nx sync         # fix
yarn nx sync:check   # verify (CI)
```

## Declaring entry points

Entry points cannot be inferred from the file layout, because the same layout means opposite things:

| Project                             | top-level `src/*.ts`                   | export subpaths     |
| ----------------------------------- | -------------------------------------- | ------------------- |
| `react-headless-components-preview` | 55 files                               | all 55 are subpaths |
| `react-button`                      | `Button.tsx`, `CompoundButton.ts`, ... | none — only `.`     |

So each multi-entry project declares its own, in `project.json`:

```jsonc
{
  "metadata": {
    "exportMap": {
      "root": true,
      "subpathEntryPoints": ["src/*.ts"]
    }
  }
}
```

- `root` — whether a `"."` entry resolved from `src/index.ts` is exposed. Defaults to `true`.
- `subpathEntryPoints` — globs, relative to the project root, resolving to the source files backing
  non-root subpaths. Defaults to `[]`.
- `subpathPatterns` — subpath _patterns_, emitted as wildcard export entries rather than expanded.
  Defaults to `[]`.

Single entry point packages omit `metadata.exportMap` entirely and get `{ root: true,
subpathEntryPoints: [], subpathPatterns: [] }`.

Source file names map to subpaths by stripping `src/` and the extension, so `src/color-picker.ts`
becomes `./color-picker` and `src/unstable/index.ts` becomes `./unstable`.

## Wildcard subpaths

`subpathPatterns` emits a wildcard entry instead of one entry per directory:

```jsonc
{ "subpathPatterns": ["src/items/*/index.ts"] }
```

```jsonc
"./items/*": {
  "import": { "types": "./dist/items/*/index.d.ts", "default": "./lib/items/*/index.js" },
  "require": { "types": "./dist/items/*/index.d.cts", "default": "./lib-commonjs/items/*/index.cjs" }
}
```

Each pattern must contain exactly one `*` and end in `/index.ts` — `generate-api` expands a wildcard
entry by scanning for sub-directories and reading `index.d.ts` from each, so any other shape would be
silently skipped. Anything else fails with an explicit error.

Note the deliberate asymmetry with exact entries, which flatten their declarations
(`src/unstable/index.ts` → `./dist/unstable.d.ts`): wildcard declarations stay nested, because that is
what `generate-api` resolves.

## Entries the declaration cannot produce

The generator owns the whole `exports` object, so an entry it cannot derive would be dropped on the
next sync. Rather than deleting it silently, it fails and points at the declaration to add.

## Why a sync generator

The `exports` map is the source of truth for `generate-api` (it derives one api-extractor entry per
subpath) and for consumers. A subpath added to `src/` without a matching `exports` entry is silently
unreachable, and a subpath authored with the legacy flat shape silently breaks `require` type
resolution — both shipped before ([#36606](https://github.com/microsoft/fluentui/pull/36606)).
