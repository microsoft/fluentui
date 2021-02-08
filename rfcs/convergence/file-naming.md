# RFC: General File Naming Guidelines - Convergence

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

_List contributors to the proposal : @hotell_

## Summary

<!-- Explain the proposed change -->

Apply consistent, easy to navigate style guide for naming files within converged components.

## Background

<!-- If there is relevant background include it here -->

This RFC builds on [RFC for convergence implementation patterns](https://github.com/microsoft/fluentui/pull/16806/files).

## Problem statement

<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is indepenent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.

In the end, please make sure to present a neutral Problem statement, rather than one that motivates a particular solution
-->

Currently converged package contains following files:

> We'll use contrived name of package - `example` which lives in `/packages/example` folder

- `index.ts` - barrel / Public API surface
- `Example.tsx` - (complete component to be used as is)
- `useExample.ts` - (CONTROLLER/MODEL /main logic behind component - re-usable hook)
- `useExampleClasses.ts` - (STYLES/ main logic for styling component - re-usable hook)
- `useExampleRandom.tsx` - (some encapsulated logic - not really a hook)
- `renderExample.tsx` - (VIEW/ main logic that handles rendering - re-usable hook)
- `Example.types.ts` - (TYPES/ all TypeScript types used within package)

**Potential issues from developer point of view:**

- inconsistent file naming
  - some files contain suffix (`.types`)
  - some files have `.ts` some `.tsx` what's the difference ?
  - some files are PascalCased, some camelCased
- not explicitly communicating the intent
  - what does `use` mean ?
    - seasoned react dev will probably guess that it's a hook. Thing is, that this file might export more that 1 hook.

## Detailed Design or Proposal

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the inteded audience to understand. -->

**Proposed rules applied on current state:**

> see [Explanation](#Explanation) for more details about applied rules

| Current File Name   | Proposed File name  | Symbol Name                                                                         | Remarks                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| index.tsx           | index.ts            |                                                                                     | No changes from current                                                                                                                                                                                                                                                                                                   |
| Example.tsx         | example.ts          | `export const Example = () => {..}`                                                 | To enforce rendering logic only within `.view.` type file/s. TS will enforce this by default. Not extremely picky on this one, we can use `.tsx` as well to match extension with test/story - priority is to be consistent                                                                                                |
| Example.test.tsx    | example.spec.tsx    | `describe->it`                                                                      | Integration test on JSDOM level (jest) for whole component                                                                                                                                                                                                                                                                |
| storybook (NONE)    | example.stories.tsx | `export const Example = () => {..}`                                                 | Specific file type for Storybook consumption. Main "starting" point for inner loop - daily development.                                                                                                                                                                                                                   |
| mdx (NONE)          | example.stories.mdx | ---                                                                                 | Markdown(MDX) for consumer facing documentation(mainly for storybook at the moment, but can be transformed to any other tool that can parse MDX).                                                                                                                                                                         |
| renderExample.tsx   | example.view.tsx    | `export const render = () => {..}`                                                  | `.render` might work as well, to match symbol name.                                                                                                                                                                                                                                                                       |
| useExample.ts       | example.hook.ts     | `export const useExample = () => {}`                                                | main logic encapsulated under hook -> name should be the same as encapsulated component (in our case `example`)                                                                                                                                                                                                           |
| useExampleStyles.ts | example.styles.ts   | `export const useStyles = makeStyles(); export const useIconStyles = makeStyles();` | with `makeStyles` 1 to N hooks for particular component styling needs. Why we currently use a solution that provides hooks, having `.styles` could be a good enough convention to explicitly communicate the intent. (if we switch implementation in the future we wouldn't need to change the type name as it's generic) |
| useExampleRandom.ts | example.utils.ts    | `export const foo = () => {}`                                                       | aggregated set of reusable utils used within other parts of component implementation. Note there are no real react hooks!                                                                                                                                                                                                 |
| Example.types.ts    | example.types.ts    | `export type Foo = {}; export interface Hello {}`                                   | aggregated set of reusable type definitions used within other parts of component/also might be re-exported for public API surface                                                                                                                                                                                         |

### Explanation

- use consistent names for all files.
- follow a pattern that describes the symbol's feature or the file scope(component name) then its type.
  - The recommended pattern is `feature.type.ts`.
- use conventional **type** names including
  - `.hook`
  - `.view`
  - `.styles`
  - `.types`
  - `.utils`
  - `.stories`
  - invent additional type names if you must but take care not to create too many

**Why?**

- Type names provide a consistent way to quickly identify what is in the file.
- Type names make it easy to find a specific file type using an editor or IDE's fuzzy search techniques.
- Type names provide pattern matching for any automated tasks.

---

- use `.tsx` only for files that contain view/rendering related logic

**Why?**

- will enforce to use JSX only where necessary (renderer only)
- same as for Type Names

---

- (optional) use `.spec.` instead `.test.` suffix as we already follow behavioral driven approach (describes/it) rather than atomic `test()` approach
  - as a next step, enable lint rule that will enforce one way or another within tests

**Why?**

- consistency/proper intent

---

- (optional) use kebab case for naming

**Why?**

- kebab case is more human readable especially in longer words
- mitigates issues with git on various OS/case in/consistent files systems (eg. rename `helloWorld` to `helloworld`, commit, push, merge... now someone wants to change it back to `helloWorld`... )

---

<br/>

### Pros and Cons

**Pros:**

- explained in Why? sections above

**Cons:**

- potential confusion between `.styles` and `.hook` _file type_ (see `example.styles.ts` remarks)

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
