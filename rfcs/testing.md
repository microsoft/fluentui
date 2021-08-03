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

- **Snapshot**

  Stricly DOM structure consistency enforcing. This will guarantee we do not introduce breaking changes for users who expect a certain structure to be rendered by our components.

  They are achieved with Jest's `expect(component).toMatchSnapshot()`.

- **Unit**

  Focus on testing the behaviour or functionality. We should use them to guarantee the outcome, wheter this is a styling, behaviour or functionality change.
  We should try to focus on behaviour, when possible, but mainly on the expected results for the code.

  These are all the additional unit tests defined in your `*.test.ts[x]` file.

- **Integration**

  Share focus with Unit tests, but for cases where you want to test your component/service with other components/services, without mocking those dependencies. Currently we don't differentiate them from Unit tests but a possibility would be to split them into separate files. However, given our tight dependency on other utilities on our components (i.e. `make-styles`) such delineation might be complicated.

- **Performance**

  Focus on the rendering performance and avoiding its degradation. They are currently covered by the [flamegrill](https://github.com/microsoft/Flamegrill) utility.

- **Bundle size**

  Prevent regressions in the bundle size. Currently measured using our custom solution under `/packages/bundle-size`.

- Accessibility

  We do not automate accessibility testing as of the writing of this document.

- Visual Regression

  Prevent regressions in component styling. Covered currently with [Screener](https://screener.io/).

- E2E

  Prevent regressions in user flows by testing interactions. We're currently using [Cypress](https://www.cypress.io/) for this.

### Pros and Cons

There are no pros and cons currently. We should agree on the standards first.

## Discarded Solutions

N/A
