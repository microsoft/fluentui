# RFC: Introducing ability-helpers as @fluentui/react-focus-management

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

@ling1726

## Summary

This RFC proposes the introduction of the [ability-helpers](https://github.com/microsoft/ability-helpers) library in Fluent as a focus management tool. The library will be wrapped in Fluent by a new package `@fluentui/react-focus-managent` which will expose a React Context and hooks based API.

This initial RFC proposes a simple initial API for keyboard arrow navigation and focus traversing utilities. These APIs already have a testing ground in the `Menu` and `Accordion` components that are under development that rely on specific keyboard focus behaviours.

<!-- If there is relevant background include it here -->

## Problem statement

<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is indepenent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.

In the end, please make sure to present a neutral Problem statement, rather than one that motivates a particular solution
-->

The current `FocusZone` and `FocusTrapZone` are React components that are responsible for keyboarding and focus trap behaviours in v7 and v0. The main difference between the two libraries is that v7 makes these components publicly available while v0 does not.

The React component pattern for focus management is not ideal, since it breaks all React paradigms for component isolation. These components rely on complex DOM operations and event listeners to implement behaviour. The components also expose a class-based interface for focus operations on children elements, which further breaks this paradigm.

The current `FocusZone` components apply focus behaviours on **rendered DOM** as opposed to **visible DOM**. The Teams messaging stream is an example of what can happen if focus lands from rendered items, it can be an issue virtualization and may cause unnecessary scrolling which will:

- Force rerender items that aren't visible
- Cause unnecessary network requests due to force rerendering
- Extra narration for screen reader users with unnecessary items not rendered

Nested focusables are a source of issues on the current `FocusZone` component, where nested focusables behave inconsistently or incorrectly. Here are some recent issues related to this

- [microsoft/fluentui#8551](https://github.com/microsoft/fluentui/issues/8551)
- [microsoft/fluentui#12177](https://github.com/microsoft/fluentui/issues/12177)
- [microsoft/fluentui#16037](https://github.com/microsoft/fluentui/issues/16037)
- [microsoft/fluentui#13210](https://github.com/microsoft/fluentui/issues/13210)

## Detailed Design or Proposal

### Ability helpers

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the inteded audience to understand. -->

The `@fluentu/react-focus-management` package will act as a facade wrapper around [ability-helpers](https://github.com/microsoft/ability-helpers) and exposes a set of hooks and utilities for focus management. The [ability-helpers](https://github.com/microsoft/ability-helpers) library is designed to be a lower level utility that manages the state of focusable elements than any rendering framework.

[ability-helpers](https://github.com/microsoft/ability-helpers) manages focus on a lower level than the rendering framework and acts on the **visible** DOM. Since operations are run on visible DOM there is a much clearer path for handling dynamically loaded content that would otherwise require effects outside the rendering lifecycle in React components which breaks component isolation principles.

Patterns in [ability-helpers](https://github.com/microsoft/ability-helpers) are **declarative**, and therefore decoupled more easily with framework and application code. Groups of focusables are managed by declaring `data-*` attributes which the lower level utilties use to define focusable behaviour.

Nesting focusables is a problem that ability-helpers explicitly tries to solve, bringing focus management to a lower level than the rendering framework tries to accomplish this consistently independent of rendering cycles.

### Modules

The description of the each constituent module in the library can be found in the [ability-helpers README](https://github.com/microsoft/ability-helpers).

The bundle size of each of the differnt modules of the library are listed in the below table. The library is fully tree shakeable, and for most cases only the `Core` part of the library is expected to be used

| Module          | minified (kb) | gzipped(kb |
|-----------------|---------------|------------|
| Core            | 45.3          | 12.2       |
| Deloser         | 13.2          | 3.2        |
| Modalizer       | 4.5           | 0.8        |
| ObservedElement | 3.1           | 0.7        |
| Outline         | 7.9           | 2          |
| CrossOrigin     | 18.9          | 4.4        |

### Initial API

#### FocusManagementProvider

Context provider that hosts the [ability-helpers](https://github.com/microsoft/ability-helpers) instance and its API objects.

The below table defines what is included in the context value.

> Note that this table will increase as more ability-helpers features are included in Fluent

| Name      | Value        | Description                           |
| --------- | ------------ | ------------------------------------- |
| focusable | FocusableAPI | API for traversing focusable elements |

The below table defines the props used by the provider component. All context values can be used as props in the provider component but are optional.

| Name                   | Value              | Description                                                                                                           |
| ---------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| dir                    | 'ltr' \| 'rtl'     | Direction indicator, some keyboard behaviour will need to change based on this value                                  |
| Deloser                | DeloserAPI         | Tools to help automatically restore focus when it gets lost without manually calling `.focus()` from application code |
| internal\_\_ahInstance | AbilityHelpersCore | The ability helpers instance, not expected to be be used directly                                                     |

#### Hooks

This spec proposes an API based on React hooks pattern. [ability-helpers](https://github.com/microsoft/ability-helpers) works mainly on adding `data-*` attributes to DOM elements to apply configurable behaviours to the 'groups' of focusables.

However some internal behaviours such as `modalizer` or `deloser` require DOM elements during the configuration phase, which will be most easily configured in React using `refs`. However the initial implementation will be based on simple spreading of data attributes.

```typescript
// Basic up/down keyboard navigation
const [attributes] = useKeyboardNavigationGroup();

<div {...attributes}}>{props.children}</div>;
```

```typescript
const ref = React.useRef<HTMLElement>();
const {
  findFirst,
  findLast,
  findAll,
} = useFocusable();

findFirst(ref.current) // first focusable within a root
findLast(ref.current) // first last focusable within a root
findAll(ref.current, condition: () => true) // first all focusables with condition in a root

<div ref={ref}>{props.children}</div>
```

#### useFocusable

A hook that exposes helper methods to traverse focusable elements in the context of a DOM element.

The below table lists the helper functions to support:

| Name      | Value         | Options                  | Description                                         |
| --------- | ------------- | ------------------------ | --------------------------------------------------- |
| findFirst | HTMLElement   |                          | Finds the first focusable element                   |
| findLast  | HTMLElement   |                          | Finds the last focusable element                    |
| findAll   | HTMLElement[] | boolean matcher function | Finds all focusable elements that match a condition |

#### useKeyboardNavigationGroup

A hook that returns a set of data-* attributes to be spread to the container of a group of focusable elements that should support keyboard navigation

The below table lists the configuration options that the hook should support:

| Name          | Value                  | Description                                                                                               |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------------------- |
| axis          | vertical \| horizontal | Indicates which direction keyboard navigation should use                                                  |
| enableHomeEnd | boolean                | Enables the use of `Home` and `End` keys to navigate to first and last elements of the group respectively |
| circular      | boolean                | Indicates that navigation should not stop at first and last elements respectively                         |

### Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

#### Pros

The current development pace of converged components means we will be able iterate quickly on this API since components under development such as `Menu`, `Accordion` and `Tooltip` will require these behaviours in the coming project cycles

Internally ability-helpers leverages the [TreeWalker](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker), which is the recommended the DOM tree traversal method [according to the w3c](https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html). This API is dynamic and operations are designed represent underlying changes to the DOM which is a big plus for handling dynamic or lazy loaded content through a rendering framework.

A hook based implementation will be a lot easier to maintain for end users, since function calls can be added/removed/mocked easily which leads to easier adaptation in large codebases where extensive unit or snapshot testing is involved.

#### Cons

The library is new, and currently partially used in TMP. Not all issues have been identified. And contributions were still needed to the library to support the initial keyboard navigation API proposed in this RFC

For backwards compat and support, the `FocusZone` components will still be needed for partners that don't use Function components in React, which are still relatively new.

The complex bi-directional navigation `FocusZone` supports has not been explored with ability-helpers, and might require contributions back to the library to support such a case.

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
