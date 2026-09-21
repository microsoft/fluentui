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

Add a `bundle-isolation.config.json` to the package root. That is the whole setup — the workspace plugin infers the
`verify-bundle-isolation` target from the presence of that file, the same way it infers `bundle-size` from a
`bundle-size/` directory. Nothing to add to `project.json`, and the tool does not need to be a devDependency of the
package.

```
yarn nx run <project>:verify-bundle-isolation
```

The target runs against built output. Bundling that resolves to package sources is reported as an error, because the
verdict would not reflect what ships.

The repo pins webpack to a single version through `resolutions` in the root `package.json`. That is deliberate - the
verdict is only meaningful if it comes from the same bundler that produces the bundle-size numbers, and webpack 5.109
changed module resolution in a way that makes these packages resolve to sources rather than built output.

| Flag              | Default                        | Description                                                          |
| ----------------- | ------------------------------ | -------------------------------------------------------------------- |
| `--config <path>` | `bundle-isolation.config.json` | Configuration file, resolved from the working directory              |
| `--analyze`       | off                            | Also write webpack-bundle-analyzer artifacts per fixture             |
| `--strict`        | off                            | Fail on allowed violations too, so the allowlist cannot be relied on |

## Verdicts

| Verdict          | Exit | Meaning                                                                                                                                           |
| ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`           | 0    | No forbidden package survived bundling. Only this verdict claims a bundle is free of them.                                                        |
| `PASS WITH DEBT` | 0    | Every surviving forbidden package is on the allowlist. The leaks are listed with their module counts and entry points.                            |
| `FAIL`           | 1    | A regression, a stale allowlist entry, an orphaned fixture entry, a fixture that failed to bundle, or — under `--strict` — any allowed violation. |

Per fixture the report labels each finding `CLEAN`, `ALLOWED`, `REGRESSION`, `STALE` or `ERROR`; a single fixture can
carry more than one label. Fixtures found in `fixturesRoot` but not opted in are listed under `SKIPPED`. Module and
export counts come from a build with `minimize: false`, so they measure how much of a package is retained, not what it
costs to ship — use monosize for bytes.

## Output

`dist/bundle-isolation/` is wiped on every run, so it only ever contains the fixtures that currently exist.

| Path                    | Written          | Contents                                                                                                                                                                                                                                           |
| ----------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `summary.json`          | always           | The console verdict in structured form — overall `status`, `skippedFixtures`, `orphanedFixtureEntries`, and per fixture its `status`, effective `forbiddenPackages`, `allowedViolations`, `tolerated`, `regressions`, `stale` and full `leaks` map |
| `<Fixture>/report.html` | with `--analyze` | webpack-bundle-analyzer treemap                                                                                                                                                                                                                    |
| `<Fixture>/report.json` | with `--analyze` | The same data the treemap renders from — module tree with `statSize`, `parsedSize` and `gzipSize`                                                                                                                                                  |

`leaks` maps a forbidden package to the exports that survived tree shaking and the modules importing them, so the
summary answers _what_ leaked and _why_, while the analyzer output answers _how much_ it costs.

## Configuration

`bundle-isolation.config.json` in the package root, validated against [`schema.json`](./schema.json).

```json
{
  "$schema": "../../../../tools/verify-bundle-isolation/schema.json",
  "fixturesRoot": "./bundle-size",
  "externals": ["react", "react-dom", "react/jsx-runtime", "react/compiler-runtime"],
  "forbiddenPackages": ["tabster", "@griffel/*", "@fluentui/react-icons"],
  "fixtures": {
    "AllComponents.fixture.js": { "allowedViolations": ["@fluentui/react-icons"] },
    "TagPicker.fixture.js": {},
    "Headless.fixture.js": { "forbiddenPackages": ["@griffel/*"] }
  }
}
```

All configured paths are resolved relative to the package root:

- `fixturesRoot` is the directory containing bundle-size fixtures.
- `externals` lists host-provided modules excluded from the bundle.
- `forbiddenPackages` lists exact package names or scoped globs such as `@griffel/*`.
- `fixtures` selects which fixtures to verify, keyed by path relative to `fixturesRoot` and always with forward slashes.

A fixture entry takes two optional keys. `allowedViolations` records tolerated forbidden packages for that fixture.
`forbiddenPackages` **replaces** the package-level list for that fixture — it overrides rather than extends, because
otherwise a fixture could only ever widen the intent, never narrow it.

The two package lists do not take the same values. `forbiddenPackages` declares intent, so it accepts globs.
`allowedViolations` records what actually leaked, so it takes **exact resolved package names** and rejects globs -
`@griffel/*` there would let a newly leaked `@griffel/anything` hide behind an entry approved for something else. The
debt has to name what it is: `@griffel/core` and `@griffel/react`, separately.

`$schema` has to be a workspace-relative path. Editors resolve it against the config file and do not apply Node package
resolution, so `@fluentui/verify-bundle-isolation/schema.json` will not work there despite the export map. The export
map exists for programmatic consumers, which can `require.resolve('@fluentui/verify-bundle-isolation/schema.json')`.

Validation itself never depends on `$schema` - the CLI always loads the schema shipped alongside it.

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

## Selecting fixtures

`fixturesRoot` is usually shared with monosize, whose fixtures exist to measure bytes and legitimately bundle styling
engines and icons. Verifying everything found there would force every such fixture onto the allowlist, turning tracked
debt into permanent noise and adding churn to an unrelated workflow every time a bundle-size fixture is added.

So the check is opt-in: only the fixtures named in `fixtures` are bundled. The rest are reported as `SKIPPED` rather
than dropped quietly, so what is left unguarded stays visible in CI output and in `summary.json`.

The trade-off is that a newly added fixture is not covered until someone lists it. A key naming a fixture that does not
exist fails the run as an orphan, and a configuration where no listed fixture exists fails rather than reporting a clean
run over nothing.

## Allowed violations

`allowedViolations` is tracked debt, not an exemption. It is shrink-only:

- A newly retained forbidden package fails the check.
- A package that no longer survives bundling also fails the check until its entry is removed.
- A fixture entry naming a fixture that does not exist fails the check.

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
