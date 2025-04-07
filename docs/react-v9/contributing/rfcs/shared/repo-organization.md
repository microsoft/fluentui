# RFC: Repository Organization

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Favor simple language that make your point, fancy words obfuscate // Speak plainly.
- Try to stay concise, but don't gloss over important details
- Feel free to add necessary diagrams in the RFC assets folder
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

_@hotell_

_Date the RFC was originally authored here_: April 2025
_Target end date for feedback_: April 20th

<!-- If substantial updates are made add an "Updated on: $date" below, don't replace the original date -->

## Summary

<!-- Explain the proposed change -->

We need to establish a new repository structure to better scope domains and support consistent and easy branching out projects in EOL/Maintenance mode.

> NOTE: follows https://github.com/microsoft/fluentui/pull/30552

## Background

Please read https://github.com/microsoft/fluentui/pull/30552 for additional background.

## Problem statement

<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is independent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.
-->

## Detailed Design or Proposal

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the intended audience to understand. -->

### Organization

#### Top level folders

Organized by "framework"/domain:

```sh
shared/ # tools,infra, any shared domain related projects (e.g.: tokens)
react/ # v8
react-northstar/ # v0
react-components/ # v9
web-components/ # wc v3
charts/ # v8,v9,wc (current packages/charts)
```

#### Domain folder organization

- prefer flat structure
- we wont introduce `apps/` and `packages/` sub-folders
  - rather prefer using optionally `-app` suffix or prefix
  - note that projectType is covered by nx `projectType` field within `project.json`
- optionally we could collocate `applications` and `tools` under 1 folder

```sh
react-components/ # v9
  react-text/
  react-card/
  react-dialog/
  react-components/
  eslint-plugin-react-components/ # tool
  react-storybook-addon/ # tool
  docsite/ # app (current - public-docsite-v9)
  react-18-tests/ # app (current - react-18-tests-v9)
  ts-minbar-tests/ # app (current - ts-minbar-test-react-components)
  ssr-tests/ # app (current - ssr-test-v9)
  vr-tests/ # app (current - vr-tests-react-components)
```

**Naming:**

Applications with generic names will mirror folder structure within its name to avoid project name clashes

_Example:_

- `/react-components/docsite` -> `react-components-docsite`
- `/react-components/ssr-tests` -> `react-components-ssr-tests`

If applications would live in additional nested `apps`, it will not be reflected within the project name

_Example:_

- `/react-components/apps/docsite` -> `react-components-docsite`
- `/react-components/apps/ssr-tests` -> `react-components-ssr-tests`

#### Shared folder organization

Will contain anything with shared scope, eg

- infra
- tools
- packages used in more than 1 domain ( eg. tokens )

### Execution

1. re-org current master to new proposed structure
2. branch out react-northstar
3. remove any react-northstar artifacts from master

### Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this proposal. If there are multiple proposals include this for each. -->

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
