# @fluentui/verify-bundle-isolation

Fails when a bundle-size fixture retains a runtime a package is meant to stay free of, such as a styling engine or icon
set that should have been tree shaken away.

## How it works

Each `*.fixture.js` is bundled with webpack — the same bundler behind the bundle-size numbers — and the resulting module
graph is inspected. A forbidden package that survives tree shaking is reported with the exports that kept it alive, the
modules importing them, and the module in the package under test that pulled those modules in:

```
  REGRESSION  AllComponents.fixture.js - 1 forbidden package not on the allowlist
    @griffel/core - 11 modules retained
      mergeClasses
        <- .../react-portal/lib/components/Portal/usePortalMountNode.js (via lib/tag-picker.js)
```

`via` matters when a leak arrives through a dependency: above, nothing imports `react-portal` directly —
`lib/tag-picker.js` re-exports a render function that mounts a portal, which is what drags Griffel in.

Attribution intersects webpack's `usedExports` with active import connections, and counts an importer only when that
module itself survived into a chunk. Import edges are recorded before tree shaking, so a module importing something it
no longer uses is not reported.

## Usage

Add the tool as a devDependency of the package to check and give it a target:

```jsonc
// package.json
{ "devDependencies": { "@fluentui/verify-bundle-isolation": "*" } }
```

```jsonc
// project.json
{
  "targets": {
    "verify-bundle-isolation": {
      "cache": true,
      "dependsOn": ["build", "^build"],
      "command": "yarn run -T verify-bundle-isolation",
      "options": { "cwd": "{projectRoot}" },
      "inputs": [
        "{projectRoot}/bundle-isolation.config.json",
        "{projectRoot}/bundle-size/**/*",
        "{projectRoot}/package.json",
        "{workspaceRoot}/tools/verify-bundle-isolation/**/*",
        { "externalDependencies": ["ajv", "webpack"] }
      ],
      "outputs": ["{projectRoot}/dist/bundle-isolation"]
    }
  }
}
```

The check must run against built output, hence `dependsOn`. It reports an error if bundling resolves to package sources
instead, because the verdict would not reflect what ships.

| Flag              | Default                        | Description                                                          |
| ----------------- | ------------------------------ | -------------------------------------------------------------------- |
| `--config <path>` | `bundle-isolation.config.json` | Configuration file, resolved from the working directory              |
| `--analyze`       | off                            | Also write webpack-bundle-analyzer artifacts per fixture             |
| `--strict`        | off                            | Fail on allowed violations too, so the allowlist cannot be relied on |

## Verdicts

| Verdict          | Exit | Meaning                                                                                                                            |
| ---------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`           | 0    | No forbidden package survived bundling. Only this verdict claims a bundle is free of them.                                         |
| `PASS WITH DEBT` | 0    | Every surviving forbidden package is on the allowlist. The leaks are listed with their module counts and entry points.             |
| `FAIL`           | 1    | A regression, a stale or orphaned allowlist entry, a fixture that failed to bundle, or — under `--strict` — any allowed violation. |

Per fixture the report labels each finding `CLEAN`, `ALLOWED`, `REGRESSION`, `STALE` or `ERROR`; a single fixture can
carry more than one label. Module and export counts come from a build with `minimize: false`, so they measure how much
of a package is retained, not what it costs to ship — use monosize for bytes.

## Output

`dist/bundle-isolation/` is wiped on every run, so it only ever contains the fixtures that currently exist.

| Path                    | Written          | Contents                                                                                                                                                               |
| ----------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `summary.json`          | always           | The console verdict in structured form — overall `status`, and per fixture its `status`, `allowedViolations`, `tolerated`, `regressions`, `stale` and full `leaks` map |
| `<Fixture>/report.html` | with `--analyze` | webpack-bundle-analyzer treemap                                                                                                                                        |
| `<Fixture>/report.json` | with `--analyze` | The same data the treemap renders from — module tree with `statSize`, `parsedSize` and `gzipSize`                                                                      |

`leaks` maps a forbidden package to the exports that survived tree shaking and the modules importing them, so the
summary answers _what_ leaked and _why_, while the analyzer output answers _how much_ it costs.

## Configuration

`bundle-isolation.config.json` in the package root, validated against [`schema.json`](./schema.json).

```json
{
  "fixturesRoot": "./bundle-size",
  "externals": ["react", "react-dom", "react/jsx-runtime", "react/compiler-runtime"],
  "forbiddenPackages": ["tabster", "@griffel/*", "@fluentui/react-icons"],
  "allowedViolations": {
    "AllComponents.fixture.js": ["@fluentui/react-icons"]
  }
}
```

All configured paths are resolved relative to the package root:

- `fixturesRoot` is the directory containing bundle-size fixtures.
- `externals` lists host-provided modules excluded from the bundle.
- `forbiddenPackages` lists exact package names or scoped globs such as `@griffel/*`.
- `allowedViolations` maps fixture paths, relative to `fixturesRoot`, to tolerated forbidden packages.

Editor completions come from the `json.schemas` mapping in `.vscode/settings.json`, so consumers do not need a `$schema`
path. Add one only if you want the file to validate outside this repo.

## Fixtures

Fixtures follow the existing monosize convention in `bundle-size/*.fixture.js`. A fixture imports the public API under
test and uses the import observably so tree shaking cannot discard it.

```js
import * as Button from '@scope/package/button';

console.log(Button);

export default {
  name: 'Button',
};
```

Sharing fixtures keeps isolation checks and bundle-size measurements aligned.

## Allowed violations

`allowedViolations` is tracked debt, not an exemption. It is shrink-only:

- A newly retained forbidden package fails the check.
- A package that no longer survives bundling also fails the check until its entry is removed.
- An entry for a missing fixture fails the check.

This prevents fixed leaks from being silently reintroduced. Deleting an entry is the goal; adding one is a regression.

## Layout

| File                             | Responsibility                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `src/bundle-isolation-plugin.ts` | The analysis — which forbidden packages survived, and why. A standard webpack plugin. |
| `src/config.ts`                  | Configuration loading, fixture discovery, path conventions                            |
| `src/report.ts`                  | Turns raw results into a verdict and renders it. No webpack, no file system.          |
| `src/cli.ts`                     | Argument parsing and the webpack run that feeds the above                             |

Keeping `report.ts` free of webpack and I/O is what makes the verdict testable without bundling anything;
`bundle-isolation-plugin.spec.ts` covers attribution by bundling a purpose-built module graph.

## Reuse in another build

The analysis is a standard webpack plugin, so it can run inside an existing build instead of the one the CLI creates:

```ts
new BundleIsolationPlugin({ forbiddenPackages, workspaceRoot, packageRoot, onReport });
```

`packageRoot` is optional and only powers the `via` origin.

It requires `optimization.concatenateModules: false`, because scope hoisting merges modules into a `ConcatenatedModule`
with no per-module `resource`.
