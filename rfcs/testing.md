# RFC: Testing standards

---

_@andrefcdias_

## Summary

The purpose of this RFC is to standardize our testing process and clarify the purpose of each of the testing layers we have. It is supposed to define what is the intended result from tests and why they are required.

## Background

This RFC came from the discussion of unit testing styles in components such as Flex and Text and the debate of having a valuable test vs a "correct" one.

## Problem statement

At the moment, everyone has their own testing standards and there is no common approach to problems like components that only apply styles and need to be tested.
There is no majority decision on the solution for this problem, being split between Visual Regression tests (VR tests) and Unit Tests (UT).

By defining a common approach, we can make the testing process less ambiguous, as well as provide a guide for the community to follow.

## Detailed Design or Proposal

To start, this is the proposal for defining the goals of each testing layer.

- **Conformance**

  Ensuring the consistency of our components. They test that props like `as`, `ref`, `className` are supported and that the component is rendered.

  These can be achieved simply through the `isConformant` function generated when creating a converged component.

- **DOM Snapshot**

  Stricly DOM structure consistency enforcing. This will guarantee we do not introduce breaking changes for users who expect a certain structure to be rendered by our components.

  They are achieved with Jest's `expect(component).toMatchInlineSnapshot(...)`. This is preferred over `.toMatchSnapshot` as it is immediately explicit what is expected from the test.
  If the snapshot ends up being massive then we should look into more granular assertion tests as big snapshots are difficult to manage for reviewers.

- **Unit**

  Focus on testing the behaviour or functionality. We should use them to guarantee the outcome, whether this is a styling, behaviour or functionality change.
  We should try to focus on behaviour, when possible, but mainly on the expected results for the code.
  We also try to mock as little as possible and join in integration testing.

  These are all the additional unit tests defined in your `*.test.ts[x]` file.

- **Performance**

  Focus on the rendering performance and avoiding its degradation. They are currently covered by the [flamegrill](https://github.com/microsoft/Flamegrill) utility.

- **Bundle size**

  Prevent regressions in the bundle size. Currently measured using our custom solution under `/packages/bundle-size`.

- **Accessibility**

  We do not automate accessibility testing as of the writing of this document. E2E tests are used to ensure the component's accessibility requirements are met.
  Research on accessibility testing automation is being done and tracked in [issue #17243](https://github.com/microsoft/fluentui/issues/17243).

- **Visual Regression**

  Prevent regressions in component styling. Covered currently with [Screener](https://screener.io/).

- **E2E**

  Prevent regressions in user flows by testing interactions. This is especially helpful for testing keyboard interactions and focus behaviors. We're currently using [Cypress](https://www.cypress.io/) for this.

We should also consider as a best practice for writing our tests the following article: https://kentcdodds.com/blog/write-tests

### Pros and Cons

There are no pros and cons currently. We should agree on the standards first.

## Discarded Solutions

N/A
