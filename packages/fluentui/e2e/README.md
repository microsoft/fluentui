# Fluent UI E2E tests

This directory provides end-to-end (in-browser) tests for critical scenarios for Fluent UI.
All test scripts, as well as examples this scripts are running against, are contained in `./tests` directory.

## Run browser tests

The following `yarn` scripts are provided to deal with browser tests:

- `yarn test:e2e` - independent task: builds, serves and runs tests. Supports flags:
  - `--skip-build` - disables prior (re)build of Docs site which end-to-end tests are running against.
- `yarn test:e2e:serve` - builds and serves site with E2E examples. Index page of this site contains link to all E2E examples.

## Add browser test

Lets suppose that one would like to introduce tests for some scenario with `<scenarioName>`. This is the set of steps to follow:

- all test files should be added to `e2e/tests` directory of the repo
- create React example file named as `<scenarioName>-example.tsx`
  - provide component to render, export it as the default one
  - to check how it renders, run `yarn test:e2e:serve` and go to `/scenario-name` URL (kebab-cased name of scenario) - or go to the index page (`/`) and search for the link to your example there.
- create test file named `<scenarioName>-test.ts`
  - to render corresponding example, use `await e2e.gotoTestCase('<scenarioName>')`. This call is usually made in `beforeEach()` test setup function
  - for safe rename refactoring, it is recommended to use `__filename` variable of NodeJS as an argument:
    - `e2e.gotoTestCase(__filename)`
    - this `gotoTestCase` function will trim `-(example|test).tsx?` postfix from file name, to leave only `<scenarioName>` part

## Use browser API

There is global `e2e` object provided to each test function that serves as a thin wrapper on top of `puppeteer's` API. This `e2e` object should be used as a single client's entry point to simulate browser stuff: clicks, focus and keyboard events.

## How browser tests work

This is what happens when `yarn test:e2e` script is executed:

- test files in `./tests` directory are discovered
- bundled, all the bundle artifacts go to `./dist` directory
- server starts on dedicated for end-to-end tests port (value is defined in config and will be presented in console output), it serves from `./dist`
- each test scenario in `./tests` is executed against the test examples served
