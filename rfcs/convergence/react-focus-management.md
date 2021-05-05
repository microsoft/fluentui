# RFC: Using Tabster for v9

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

@ling1726 @khmakoto 

## Summary

This RFC proposes the introduction of the [tabster](https://github.com/microsoft/tabster) library in Fluent as a focus management tool. The library will be wrapped in Fluent by a new package `@fluentui/react-tabster`.

Tabster is already used in the `Menu` and `Accordion` components since they need specific keyboard focus behaviours.


## Problem statement


The current `FocusZone` and `FocusTrapZone` are React components that are responsible for keyboarding and focus trap behaviours in v7 and v0. 

The React component pattern for focus management is not ideal, since it breaks React component isolation. These components use DOM operations and a mix of global and synthetic event listeners to implement behaviour. The components also expose a class-based interface for focus operations on children elements, which further breaks isolation.

The current `FocusZone` components apply focus behaviours on **rendered DOM** as opposed to **visible DOM**. The Teams messaging stream is an example of what can happen if focus lands from rendered items, it can be an issue virtualization and may cause unnecessary scrolling which will:

- Force rerender items that aren't visible
- Cause unnecessary network requests due to force rerendering
- Extra narration for screen reader users with unnecessary items not rendered

Nested focusables cause issues on the current `FocusZone` component, where nested focusables behave inconsistently or incorrectly. Here are some recent issues related to this

- [microsoft/fluentui#8551](https://github.com/microsoft/fluentui/issues/8551)
- [microsoft/fluentui#12177](https://github.com/microsoft/fluentui/issues/12177)
- [microsoft/fluentui#16037](https://github.com/microsoft/fluentui/issues/16037)
- [microsoft/fluentui#13210](https://github.com/microsoft/fluentui/issues/13210)

`FocusZone` and `FocusTrapZone` are both large components that handle a lots of different focus management scenarios as one component through props. This can be a foot gun for consumers who might not know what they actually need, or what might be a11y friendly. #17977[https://github.com/microsoft/fluentui/pull/17977] shows how complicated the `FocusZone` component can be.

## Detailed Design or Proposal

### Tabster

Philosophy of tabster:

> **Tab**index on **Ster**oids

[Tabster](https://github.com/microsoft/tabster) is designed to be a lower level utility that manages the state of focusable elements independent from a rendering framework.

[Tabster](https://github.com/microsoft/tabster) manages focus on a lower level than the rendering framework and acts on the **visible** DOM. Since operations are run on visible DOM there is a much clearer path for handling dynamically loaded content that would otherwise require effects outside the rendering lifecycle in React components which breaks component isolation principles.

Tabster has 2 levels of API:
* Declarative with `data-tabster` DOM attribute
* Functional that can accept DOM elemenets or functions

Nesting focusables is a problem that tabster explicitly tries to solve, bringing focus management to a lower level than the rendering framework tries to accomplish this consistently wihtout worrying about rendering cycles.

From the highest level Tabster is opt-in and will not work unless a specific Root element has been configured.


### Modules

The description of the each constituent module in the library can be found in the [tabster README](https://github.com/microsoft/tabster).

The bundle size of each of the differnt modules of the library are listed in the below table. The library is fully tree shakeable, and for most cases only the `Core` part of the library is expected to be used

| Module          | minified (kb) | gzipped(kb |
|-----------------|---------------|------------|
| Core            | 45.3          | 12.2       |
| Deloser         | 13.2          | 3.2        |
| Modalizer       | 4.5           | 0.8        |
| ObservedElement | 3.1           | 0.7        |
| Outline         | 7.9           | 2          |
| CrossOrigin     | 18.9          | 4.4        |

#### Core API

Tabster Core API providers the following functionalities:
* Groupper - handling groups of focusable
* Mover - hanling moving between (groups of) focusables
* Focusable - utilities to find and verify focusable elements
* Focused element state - observes currently focused element
* Keyboard navigation state - observes if the user is navigating with keyboard

All of those functionalities are opt-in

#### Deloser

Elements disappearing from the application and suddenly focusing on `body` is a common problem in the web.

The Deloser API tries to solve this by tracking the focus history and automatically restoring focus, when it is lost. 

The API is opt-in, and can be declarative (`data-tabster`) for the simplest use case. It can also be paused/resumed during runtime.

#### Modalizer

Modal dialogs generally these hard requirements:
* Focus must be trapped
* All non-interactable elements must be hidden from screen readers
* Only one modal can be active at a time

This API is also opt-in handles all the above requirements.

### API integration

Tabster is also also a Microsoft OSS project that is under active development. This RFC purposely does not go into too much design detail since both Fluent and Tabster can go through iteration.

The current principle is that Tabster will be introduced through React hooks under the package `@fluentui/react-tabster` to emphasize that the package is a react wrapper around Tabster.|

### Pros and Cons

#### Pros

We will be able iterate quickly on Tabster since components under development such as `Menu`, `Accordion` and `Tooltip` will require these behaviours in the coming project cycles

Internally tabster leverages the [TreeWalker](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker), which is the recommended the DOM tree traversal method [according to the w3c](https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html). 

Tabster tries to achieve requirements without requiring to use all its features at once unline `FocusZone` or `FocusTrapZone`. Features are encapsulated and opt-in.

The library is already used in Teams, it can be a good source of feedback.

#### Cons

The library is new, and currently partially used in TMP. Contributions are still required as more improvements are identified

For backwards compat and support, the `FocusZone` components might still be needed for partners that don't use Function components in React, which are still relatively new. In this case using plain `Tabster` is supported, and is how the library was originally tested.

It might be more complicated for customers than a single React component.

Documentation is currently not great and code is still the main documentation available in most places. We are actively working on improving documentation.


## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
