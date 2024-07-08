Fluent UI's React-based packages use various frameworks for different types of testing.

## Unit and functional tests

Most of Fluent UI's tests are built using **[Jest](https://jestjs.io/)**. This allows us to run tests in a Node environment but simulates the browser using [jsdom](https://github.com/jsdom/jsdom).

On top of Jest, we use **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro)** for rendering and interacting with React components. (Some legacy tests still use Enzyme and/or react-test-renderer.)

For more details:

- [Jest testing in `@fluentui/react-components` ("v9") and `@fluentui/react` ("v8")](Testing-with-Jest)
- [Testing in `@fluentui/react-northstar` ("v0")](https://github.com/microsoft/fluentui/blob/master/packages/fluentui/test-a-feature.md)

## End-to-end (in-browser) tests

Some scenarios, particularly those relating to focus management, cannot be realistically/reliably tested with jsdom. In these cases we use **[Cypress](https://docs.cypress.io/)** for testing with a real browser.

For more details:

- [E2E testing in `@fluentui/react-components` ("v9") and `@fluentui/react` ("v8")](E2E-testing-with-Cypress)
- [E2E testing in `@fluentui/react-northstar` ("v0")](https://github.com/microsoft/fluentui/blob/master/packages/fluentui/e2e/README.md)

## Visual regression tests

We use **[Screener](https://screener.io/)** with [Storybook](https://storybook.js.org/basics/introduction/) to document and test various UI states of our components.

For more details:

- [Visual testing in `@fluentui/react-components` ("v9") and `@fluentui/react` ("v8")](Visual-regression-testing-with-Screener)
- [Visual testing in `@fluentui/react-northstar` ("v0")](https://github.com/microsoft/fluentui/blob/master/packages/fluentui/test-a-feature.md#screener-tests)
