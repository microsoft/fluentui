# todo demo app

Sample todo app using Fluent UI React.

## Basic info

To run this app from within the Fluent UI React repo, **start at the root of the repo** and run:

```
yarn
yarn buildto todo-app
yarn workspace todo-app start
```

This will watch for changes and rebuild/refresh as needed.

### File structure

- `src/index.tsx`: app bootstrap file
- `src/components/`: various React components
- `src/components/TodoApp.tsx`: root of the main app content
- `src/DataProvider.ts`: tracks the list of todos, simulating server calls.
  - TODO: Update with a more realistic server interaction and state management model

### Build info

(This app uses a semi-manual tooling configuration for demonstration purposes, but if you don't need much customization, you can use Create React App for bootstrapping and copy in demo code, which should work with a few minor configuration changes.)

Fluent UI React is written in [TypeScript](https://www.typescriptlang.org/index.html).

The todo app and other Fluent UI React projects use [Just](https://microsoft.github.io/just/) for build orchestration. It also provides a library of tasks to help with common build needs. Configuration is in `just.config.ts`, and basic command are listed in `package.json`.

It uses [Webpack](https://webpack.js.org) for [serving the app](https://webpack.js.org/guides/development/#using-webpack-dev-server). Due to the complexity of configuring webpack, this package doesn't currently have a standalone setup and instead relies on the Fluent UI repo's shared internal config utility, which you can view [here](https://github.com/microsoft/fluentui/blob/master/scripts/webpack/webpack-resources.js).

## Component demo _(TODO: update with new patterns)_

The demo app components currently use an older method of CSS-in-JS styling while we're working on finalizing details of the new recommended styling pattern. This older method will continue to work but will not be recommended going forward and should not be viewed as prescriptive.

## Testing demo

This app also demonstrates how to do testing against React and Fluent UI React.

To run tests, ensure you've done a build of the repo as described above, then choose one of the following commands:

- `yarn test`: run the tests once
- `yarn start-test`: run the tests, watch for changed files, and re-run

### Dependencies

The following deps from this package's `package.json` are related to testing:

- [**`jest`**](https://jestjs.io)
- `jest-cli`
- `jest-environment-jsdom`
- [`ts-jest`](https://kulshekhar.github.io/ts-jest/)
- `@types/jest`
- [**`enzyme`**](https://airbnb.io/enzyme/)
- `enzyme-adapter-react-16`
- `@types/enzyme`
- `@types/enzyme-adapter-react-16`
- [`react-test-renderer`](https://reactjs.org/docs/test-renderer.html) for snapshot tests
- `@types/react-test-renderer` for snapshot tests
- `@fluentui/jest-serializer-merge-styles` for snapshot tests

### Configuration

- `jest.config.js`: main Jest configuration file (more comments inline)
- `config/tests.js`: global test setup at runtime (more comments inline)
- `tsconfig.json`:
  - Add `"jest"` to the `types` array to get Jest global types
  - You must either set `module` to `"commonjs"` here, or specify an override tsconfig in `jest.config.js` `ts-jest` options (this package demos the second option)
- Tests live under `src` named as `*.test.(ts|tsx)` (or sometimes `*.spec.(ts|tsx)`), either grouped under a `__tests__` directory or next to the relevant files

#### Warnings

As of writing, Jest's support for ECMAScript modules (ES modules or ESM) is [still in progress](https://github.com/facebook/jest/issues/9430). This means that for testing purposes, you must use CommonJS modules by:

- Compiling your project into CommonJS modules
- Using `moduleNameMapper` settings in `jest.config.js` to point Jest to CommonJS (or UMD?) versions of any dependencies which are published as ES modules by default, such as Fluent UI React

By convention, Fluent UI React projects publish ESM versions under `lib` and CommonJS versions under `lib-commonjs`.

Note that if you've happened onto this page but are using `create-react-app`, you'll need to add the `moduleNameMapper` config in `package.json`--see the [CRA testing docs](https://create-react-app.dev/docs/running-tests/#configuration) for details.

#### Writing unit tests

You can use Jest without React/Enzyme. See `DataProvider.test.ts` for an example.

#### Writing component tests and snapshot tests

See `TodoApp.test.tsx` and `TodoItem.test.tsx` for examples of interactive and snapshot testing with Enzyme and Jest.
