# Bundle isolation verification

Verifies that headless package bundle-size fixtures do not retain browser runtimes that the headless API must avoid.

The check bundles each `*.fixture.js` file with esbuild and inspects the retained module graph. It fails when a configured forbidden package survives tree shaking, when bundling resolves to package source instead of built output, or when a known violation becomes stale.

## Usage

Run from the package root after building the package and its dependencies:

```sh
node scripts/verify-bundle-isolation/cli.js
```

Use a different package-root-relative configuration file with:

```sh
node scripts/verify-bundle-isolation/cli.js --config ./bundle-isolation.config.json
```

The Nx target builds dependencies and runs the check with the correct working directory:

```sh
yarn nx run react-headless-components-preview:verify-bundle-isolation
```

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
import * as HeadlessButton from '@fluentui/react-headless-components-preview/button';

console.log(HeadlessButton);

export default {
  name: 'HeadlessButton',
};
```

Using the same fixtures keeps bundle isolation and bundle-size measurements aligned.

## Known violations

`knownViolations` is a shrink-only baseline:

- A newly retained forbidden package fails the check.
- A package that no longer survives bundling also fails the check until its baseline entry is removed.
- A baseline entry for a missing fixture fails the check.

This prevents fixed leaks from being silently reintroduced.
