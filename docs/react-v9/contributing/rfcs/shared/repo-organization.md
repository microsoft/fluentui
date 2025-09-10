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

_Contributors: @hotell_

- _Date the RFC was originally authored here_: April 2025
- _Target end date for feedback_: April 30, 2025

<!-- If substantial updates are made add an "Updated on: $date" below, don't replace the original date -->

## Summary

<!-- Explain the proposed change -->

We propose a new repository structure to better scope domains and support consistent branching for projects entering EOL/Maintenance mode. This structure will simplify navigation, improve scalability, and ensure clear separation of concerns.

> NOTE: follows https://github.com/microsoft/fluentui/pull/30552

## Background

The current repository structure has grown organically, leading to challenges in maintaining clear boundaries between domains and frameworks. As some projects transition to EOL/Maintenance mode, a more structured organization is required to ensure long-term maintainability and ease of contribution.

## Problem statement

<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is independent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.
-->

The current monorepo structure lacks clear separation between domains and frameworks, making it harder to:

- Decouple projects in active development from those in maintenance mode.
- Enforce boundaries between domains (e.g., react-components, react-northstar, web-components).
- Scale the repository as new frameworks or domains are introduced.

## Detailed Design or Proposal

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the intended audience to understand. -->

### Organization

#### 1. Top-Level Folder Structure

Organize the repository by "framework" or "domain" to ensure clear separation:

```sh
shared/           # Shared tools, infrastructure, and domain-agnostic projects (e.g., tokens)
react-v0/         # React Northstar (v0)
react-v8/         # React v8
react-components/ # React v9
web-components/   # Web Components (v3)
charts/           # Charting libraries (v8, v9, wc)
```

**NOTE:**

After branching out `react-8/` and `react-v0/`, the top-level structure will contain only four primary folders:

```sh
shared/           # Shared tools, infrastructure, and domain-agnostic projects (e.g., tokens)
react-components/ # React v9
web-components/   # Web Components (v3)
charts/           # Charting libraries (v8, v9, wc)
```

This structure allows for future expansion if additional frameworks are introduced.

#### 2. Domain level Folder structure

Contains 4 folders:

- `/apps`
- `/packages`
- `/tools`
- `/shared`

_Example: `react-components` Folder_

```sh
charting/ # Charting
web-components/ # Web Components
react-components/ # React v9
  apps/ # applications
    docsite/                      # current: public-docsite-v9
    react-18-tests/               # current: react-18-tests-v9
    ts-minbar-tests/              # current: ts-minbar-test-react-components
    ssr-tests/                    # current: ssr-test-v9
    vr-tests/                     # current: vr-tests-react-components
  packages/ # React/UI specific libraries
    react-text/
    react-card/
    react-dialog/
    react-components/             # Suite package
  tools/  # any non UI specific tools ( storybook plugin, eslint plugins, nx react-components plugin etc)
    eslint-plugin-react-components/
    react-storybook-addon/
  shared/ # any shared logic used in more than 2 sub-domains
    some-shared-logic-lib/
```

#### 3. `Shared` domain folder organization

Will contain anything with shared scope

- Infrastructure and tools (e.g., build scripts, linting configurations).
- Shared packages used across multiple domains (e.g., tokens).

#### 4. Miscellaneous folders at current root organization

Current repo structure contains additional folders at the root:

```
/docs
/specs
/starter-templates
/typings
```

These will be moved to appropriate domains based on structure outlined in previous paragraphs, like following:

**/docs**

_💡NOTE:_ we can consider keeping this as is.

```
/docs/react-wiki-archive -> /react-v8/docs
/docs/react-v9 -> /react-components/docs
```

**/starter-templates**

```
/starter-templates -> /react-components/apps/starter-templates
```

**/specs**

_💡NOTE:_ this contains only v8 related specs. to align with existing pattern we will move those under package `/docs` folder

```
/specs -> /react-v8/packages/react/docs
```

**/typings**

_💡NOTE:_ we can consider keeping this as is as it affects global TypeScript types and aligns to single version policy.

```
/typings -> /shared/typings
```

#### Project Naming Conventions

Projects with generic names will mirror folder structure within its name to avoid project name clashes

_Example (application):_

- `/react-components/apps/docsite` -> `react-components-docsite`
- `/react-components/apps/ssr-tests` -> `react-components-ssr-tests`

### Branching strategy

**Default Branch**

The default branch will contain only actively developed frameworks/domains.

**Branching for Maintenance/EOL**

When a framework/domain transitions to maintenance or EOL, it will be branched out from the default branch.

**Branch Naming Convention:**

`{framework/domain-type}-{major-version}`

_Examples:_

- Branching out `react-northstar` → `react-v0`
- Branching out `react` → `react-v8`
- Branching out `react-components` → `react-v9`
- Branching out `web-components` → `web-components-v3`

### Execution Plan

1. Reorganize the current default branch to the proposed structure.
2. Branch out react-northstar into react-v0.
3. Remove all react-northstar artifacts from the default branch.

### Pros and Cons

**Pros**

- Clear separation of domains and frameworks.
- Simplified branching for EOL/Maintenance projects.
- Easier navigation and contribution for developers.
- Scalable structure for future frameworks or domains.

**Cons**

- Initial reorganization effort may disrupt ongoing work.
- Contributors will need to adapt to the new structure.

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
