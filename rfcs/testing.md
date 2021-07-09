# RFC: Testing standards

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

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

  These are unit tests that focus on ensuring the consistency of our components. They test that props like `as`, `ref`, `className` are supported and that the component is rendered.

  These can be achieved simply through the `isConformant` function generated when creating a converged component.

- **Snapshot**

  These are unit tests that strictly enforce the DOM structure consistency and nothing else. This will guarantee our users don't have breaking changes when they expect a certain structure.

  They are achieved with Jest's `expect(component).toMatchSnapshot()`.

- **Unit**

  These are tests that focus on testing the behaviour or functionality. We should use them to guarantee the outcome, wheter this is a styling, behaviour or functionality change.
  We should try to focus on behaviour, when possible, but mainly on the expected results for the code.

  These are all the additional unit tests defined in your `*.test.ts[x]` file.

- **Integration**

  Integration tests mirror Unit tests in terms of focus but for cases where you want to test your component/service with other components/services, without mocking those dependencies. Currently we don't differentiate them from Unit tests but a possibility would be to split them into separate files. However, given our tight dependency on other utilities on our components (i.e. `make-styles`) such deliniation might be complicated.

- **Performance**

  These are tests that focus on testing rendering performance. They are covered by our performance testing utility

- Accessibility
- Bundle size
- Visual Regression
  Avoid unwanted changes in the styling
- E2E
  User behavior/interaction testing

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the inteded audience to understand. -->

### Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->
