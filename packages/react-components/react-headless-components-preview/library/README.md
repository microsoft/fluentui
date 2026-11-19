# @fluentui/react-headless-components-preview

**React Headless Components for [Fluent UI React](https://react.fluentui.dev/)**

> [!WARNING] > **This package is in preview and not production-ready.** APIs may change without notice before final release. **Do not use in production.**
>
> This package exposes unstyled, headless Fluent UI v9 primitives for teams building custom design systems. For most teams, [`@fluentui/react-components`](https://www.npmjs.com/package/@fluentui/react-components) remains the recommended default.

## State selector contract

Headless components expose resolved interaction and structural state through `data-*` attributes. Consumers that wrap these components, including visual-system packages, must preserve the attributes on the slot where headless emits them.

Existing attributes retain their current names and value semantics. Visual axes such as appearance, size, and shape are intentionally not part of the headless contract.

## Bundle-size fixtures

Each public subpath has a generated fixture in `bundle-size/`, declared in
`project.json#metadata.bundleSizeFixtures`. A component fixture measures the entire entry point,
including its child components, hooks, render functions, and runtime helpers. It is not the size of
importing only one component. The `positioning`, `provider`, and `utils` entry points are measured
separately as well.

```sh
yarn nx sync
yarn nx sync:check
yarn nx run react-headless-components-preview:bundle-size
yarn nx run react-headless-components-preview:verify-bundle-isolation
```

Add an `entryPoint` fixture declaration when adding a public subpath, then run `yarn nx sync`.
Do not edit generated fixtures or rename existing fixture `name` values: those names identify
historical bundle-size baselines. Fixtures use named imports from the public package subpaths, not
source files or namespace imports.

Monosize writes measurements and bundled output to `dist/bundle-size/`, using the repository's
shared bundler configuration and peer-dependency exclusions. Compare individual entry points to
find expensive dependencies; do not sum their sizes, since they share code. `AllComponents.fixture.js`
continues to measure the combined library and enforce the forbidden-package rules in
`bundle-isolation.config.json`.

For readable bundles, add `--debug --artifacts-location=dist/bundle-size-debug` to the bundle-size
command. For a dependency treemap of the combined library, add `--analyze` to the isolation command.
