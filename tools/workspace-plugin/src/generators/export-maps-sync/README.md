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

Single entry point packages omit `metadata.exportMap` entirely and get `{ root: true,
subpathEntryPoints: [] }`.

Source file names map to subpaths by stripping `src/` and the extension, so `src/color-picker.ts`
becomes `./color-picker` and `src/unstable/index.ts` becomes `./unstable`.

## Why a sync generator

The `exports` map is the source of truth for `generate-api` (it derives one api-extractor entry per
subpath) and for consumers. A subpath added to `src/` without a matching `exports` entry is silently
unreachable, and a subpath authored with the legacy flat shape silently breaks `require` type
resolution — both shipped before ([#36606](https://github.com/microsoft/fluentui/pull/36606)).
