# Bundle isolation verification

Fails when a bundle-size fixture retains a runtime the package is meant to stay free of, such as a styling engine or icon set that should have been tree shaken away.

## How it works

Each `*.fixture.js` is bundled with webpack — the same bundler behind the bundle-size numbers — and the resulting module graph is inspected. The check fails when a forbidden package survives tree shaking, when bundling resolves to sources instead of built output, or when a baseline entry is no longer reachable.

Failures name the exports that kept the package alive, the modules importing them, and the module in this package that pulled those modules in:

```
AllComponents.fixture.js pulls in forbidden runtime:
    @fluentui/react-icons - 9 modules retained
      ChevronDownRegular
        <- .../react-tag-picker/lib/components/TagPickerControl/useTagPickerControl.js (via lib/tag-picker.js)
    @griffel/core - 11 modules retained
      mergeClasses
        <- .../react-portal/lib/components/Portal/usePortalMountNode.js (via lib/tag-picker.js)
```

`via` matters when a leak arrives through a dependency: above, nothing imports `react-portal` directly - `lib/tag-picker.js` re-exports a render function that mounts a portal, which is what drags Griffel in.

Attribution intersects webpack's `usedExports` with active import connections, and counts an importer only when that module itself survived into a chunk. Import edges are recorded before tree shaking, so a module importing something it no longer uses is not reported.

## Usage

Run from the package root, once the package and its dependencies are built:

```sh
node scripts/verify-bundle-isolation/cli.js
```

| Flag              | Default                        | Description                                                                     |
| ----------------- | ------------------------------ | ------------------------------------------------------------------------------- |
| `--config <path>` | `bundle-isolation.config.json` | Configuration file, resolved from the working directory                         |
| `--analyze`       | off                            | Write a webpack-bundle-analyzer treemap per fixture to `dist/bundle-isolation/` |

## Configuration

The default configuration is `bundle-isolation.config.json` in the package root. Its schema is [`schema.json`](./schema.json).

```json
{
  "$schema": "./scripts/verify-bundle-isolation/schema.json",
  "fixturesRoot": "./bundle-size",
  "externals": ["react", "react-dom", "react/jsx-runtime", "react/compiler-runtime"],
  "forbiddenPackages": ["tabster", "@griffel/*", "@fluentui/react-icons"],
  "knownViolations": {
    "AllComponents.fixture.js": ["@fluentui/react-icons"]
  }
}
```

All configured paths are resolved relative to the package root:

- `fixturesRoot` is the directory containing bundle-size fixtures.
- `externals` lists host-provided modules excluded from the bundle.
- `forbiddenPackages` lists exact package names or scoped globs such as `@griffel/*`.
- `knownViolations` maps fixture paths, relative to `fixturesRoot`, to temporarily tolerated forbidden packages.

## Fixtures

Fixtures follow the existing Monosize convention in `bundle-size/*.fixture.js`. A fixture imports the public API under test and uses the import observably so tree shaking cannot discard it.

```js
import * as Button from '@scope/package/button';

console.log(Button);

export default {
  name: 'Button',
};
```

Sharing fixtures keeps isolation checks and bundle-size measurements aligned.

## Known violations

`knownViolations` is a shrink-only baseline:

- A newly retained forbidden package fails the check.
- A package that no longer survives bundling also fails the check until its baseline entry is removed.
- A baseline entry for a missing fixture fails the check.

This prevents fixed leaks from being silently reintroduced.

## Reuse in another build

The analysis lives in [`bundle-isolation-plugin.js`](./bundle-isolation-plugin.js) as a standard webpack plugin, so it can run inside an existing build instead of the one the CLI creates:

```js
new BundleIsolationPlugin({ forbiddenPackages, workspaceRoot, packageRoot, onReport });
```

`packageRoot` is optional and only powers the `via` origin.

It requires `optimization.concatenateModules: false`, because scope hoisting merges modules into a `ConcatenatedModule` with no per-module `resource`.
