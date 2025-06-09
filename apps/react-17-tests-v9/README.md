# @fluentui/react-17-tests-v9

**Tests for React 17 compatibility in [Fluent UI React v9](https://react.fluentui.dev)**.

## Usage

### React 17 integration tests against all v9 code in monorepo

Following Targets are used:

#### type-check:integration

`yarn nx run react-17-tests-v9:type-check:integration`

runs `tsc` against all monorepo v9 stories with properly pinned `@types/react@17`

_Note:_ react-migration-v8-v9, react-migration-v0-v9 and any `react-*-compat` are excluded from this check

#### e2e:integration

`yarn nx run react-17-tests-v9:e2e:integration`

runs `cypress` against all monorepo v9 `*.cy.tsx?` with properly pinned `react18` runtime deps

### `start`

```shell
# yarn start
```

This app has a simple CRA style `App.tsx` file to allow testing and triaging Fluent UI components in a React 17 environment. Please do not commit any new content to this file that isn't useful for everyone else.

This file and process will be replaced with Storybook once we are able to get storybook working in React 17 in our mono-repo.

### `test`

```shell
# yarn test
```

Add test files for React 17 issues that have been triaged and resolved so that we do not regress.

### `type-check`

To be able to type-check cross React versions we need all v9 libraries build up front so we don't type check all v9 implementation rather public API surface.

For that purpose we use `tsconfig.react-compat-check.json` as target for `type-check` npm script task, which disables path aliases and forces `tsc` to consume linked monorepo build packages.

**Local machine flow:**

```sh
yarn nx run react-17-tests-v9:build

yarn nx run react-17-tests-v9:type-check
```

**CI:**

nx defines `build` targets to be executed prior to `type-check`.
