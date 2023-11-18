# @fluentui/react-18-tests-v9

**Tests for React 18 compatability in [Fluent UI React v9](https://react.fluentui.dev)**.

## Usage

### `start`

```shell
# yarn start
```

This app has a simple CRA style `App.tsx` file to allow testing and triaging Fluent UI components in a React 18 environment. Please do not commit any new content to this file that isn't useful for everyone else.

This file and process will be replaced with Storybook once we are able to get storybook working in React 18 in our mono-repo.

### `test`

```shell
# yarn test
```

Add test files for React 18 issues that have been triaged and resolved so that we do not regress.

### `type-check`

To be able to type-check cross React versions we need all v9 libraries build up front so we don't type check all v9 implementation rather public API surface.

For that purpose we use `tsconfig.react-compat-check.json` as target for `type-check` npm script task, which disables path aliases and forces `tsc` to consume linked monorepo build packages.

**Local machine flow:**

```sh
lage build --to @fluentui/react-18-tests-v9

yarn workspace @fluentui/react-18-tests-v9 type-check
```

**CI:**

lage defines `build` targets to be executed prior to `type-check`.
