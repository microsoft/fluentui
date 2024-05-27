# Table of Contents

- [Goals](#goals)
- [Versioning Overview](#versioning-overview)
- [Phase 1: Preparation](#phase-1-preparation)
  - [GitHub set up](#github-set-up)
  - [Background Research](#background-research)
  - [Component Spec](#component-spec)
- [Phase 2: Initial Implementation](#phase-2-initial-implementation)
  - [Implementation](#implementation)
  - [Documentation](#documentation)
  - [Preview Release](#preview-release)
- [Phase 3: Validation and Stable Release](#phase-3-validation-and-stable-release)
  - [Tests](#tests)
  - [Validation](#validation)
  - [Bug Bash](#bug-bash)
  - [Finalize documentation](#finalize-documentation)
  - [Stable Release](#stable-release)

# Goals

This article outlines the steps to follow to make a component for `@fluentui/react-components`, commonly known as 'v9.' It is the successor to the `@fluentui/react` (v8) and `@fluentui/react-northstar` (v0) libraries.

These components are more than just a convergence of the implementations of the v8 and v0 components. We're also taking the opportunity to:

- Clean up the API and align it with the APIs used for similar components across the industry.
- Add support for FluentUI concepts:
  - Composition - The basic logic of the component is separated from the styling so that a user can re-compose the component to create their own modified version of the component.
  - Slots - Supplements of the component can be replaced by the user
  - Tokens - A theming tool common to design and engineering.
- Make sure there is a defined upgrade path from Fabric and Northstar to the converged component.

# Versioning Overview

Each component is released in multiple phases. This process has changed as of July 2023, and is outlined in more detail in the [v9 package release cycle](release-process.md). In summary:

1. **Kickoff phase**: Package has `-preview` suffix and is not yet published to NPM (private).
2. **Preview phase**: Package has `-preview` suffix and is published with version `0.(major).(minor|patch)`. Breaking changes will be marked as minor, but announced as such in changelogs.
3. **Stable phase**: Package is renamed to remove the ~~`-preview`~~ suffix, and has version `9.(minor).(patch)`. The `-preview` package is marked as deprecated on NPM.

# Phase 1: Preparation

## GitHub set up

### GitHub Epic

Create a GitHub Issue for your component, with the label `Type: Epic`. This will be used to track the convergence progress on this component. This should be the source of truth and most up to date information on convergence status **please keep this up to date as you make progress**.

- Issue Template: [Create new Convergence Epic Issue](https://github.com/microsoft/fluentui/issues/new?assignees=&labels=&template=convergence_epic.md)
- Example Issue: [Separator Convergence #15759](https://github.com/microsoft/fluentui/issues/15759)

### Component package

There should be a package in the fluentui repo for the component, named like `react-componentname` (e.g. [`react-button`](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-button)). If the package doesn't exist yet, you can create a new one.

```bash
# NOTE: execute this command from monorepo root
$ yarn create-package
```

Within the package, you can create a sub folder for the main, and all related components.

```bash
# NOTE: execute this command from monorepo root
$ yarn create-component
```

Each package should generally contain one component, and any variants. For example, `react-button` contains `Button`, `MenuButton`, `SplitButton`, and `ToggleButton`, which are all variants of each other. Larger pattern, molecule and organism level components will likely contain multiple related and dependent components.

Make sure that the README.md file is accurate and up to date for the component you are working on. Indicate the status as:

- WIP - Under active development not ready for use except in co-development situations
- Experimental - Ready for close partners; surface may undergo significant changes (alpha release)
- Preview - Ready for public partners; surface may change (beta release)
- Stable - Ready for production use; "1.0" (or in this case 9.0, non-alpha/beta) release. Any more breaking changes require a major release.

## Background Research

Before writing the spec, you should partner with Design to do research to figure out the requirements for this control, and help inform the design and implementation.

### Design Spec

Make sure there's a specification for the visual and interaction design for this component. Work with designers to get the process started early. Consider prototyping ideas to get feedback on technical design to ensure it aligns with existing patterns in the repo. Ideally, the spec is ready by the time you're ready to start implementing the component.

### Existing Fabric and Northstar versions

The goal here is to identify important functionality/props that we should carry forward and record this comparison in an GitHub issue. It's also generally valuable as the component author that you take a deep look at what is already there are understand it.\
We do this by looking at these areas:

#### Documentation websites

- [Fabric/v8 documentation](https://developer.microsoft.com/en-us/fluentui#/controls/web)
- [Northstar/v0 documentation](https://fluentsite.z22.web.core.windows.net/)

#### Implementations

- [Fabric/v8 `@fluentui/react` components: `packages/react/src/components`](https://github.com/microsoft/fluentui/tree/master/packages/react/src/components) - Note there are some independent packages as well
- [Northstar/v0 components: `packages/fluentui/react-northstar/src/components`](https://github.com/microsoft/fluentui/tree/master/packages/fluentui/react-northstar/src/components)

### Open UI Research

The [Open UI](https://open-ui.org/) project is working on standardizing UI component names and structures, but it is still in the early stages. If the component you're converging doesn't already have a research page on Open UI, you should do a survey of other established UI platforms and contribute it to Open UI to help with the standardization effort. This research will help inform the converged component's API, and help the Open UI effort to eventually create a standard for UI platforms.

Creating or updating an Open UI component research page is especially useful as an education and preparation tool for Fluent UI developers. You can find information on contributing here at https://open-ui.org/contribute. Fluent UI developers can participate in Open UI beyond creating or updating a component research page, but it is not required for Fluent UI development.

### Find open issues on GitHub

Create a query for open GitHub issues related to this component, and link it in the Epic issue for the component.
For example, a query for Tooltip might be [`is:issue is:open tooltip`](https://github.com/microsoft/fluentui/issues?q=is%3Aissue+is%3Aopen+tooltip).

- Here's an example issue: [☂ Tooltip: open issues to resolve in converged approach #15102](https://github.com/microsoft/fluentui/issues/15102)

### Draft and prototype implementation

A draft implementation is optional, but you may find it useful to create one before writing the spec. This can help you try out ideas about the component's API, and uncover issues you may need to address in the spec. It is ok to publish a PR for the draft implementation before the spec has been reviewed. Keep in mind that you may need to make larger structural changes to this draft implementation based on the spec review, so you may not want to spend a significant amount of time getting everything working perfectly. Larger, more complex components will likely require multiple prototypes.

## Component Spec

### Resources

- Start with the [Spec Template](Spec-Template)
- Refer to the [Best Practices](https://github.com/microsoft/fluentui/wiki/Implementation-Best-Practices) while designing the component

Write the spec in a file named `SPEC.md` in the component's folder. The spec should document your research above, and outline the proposed API, structure, and usage of the component.

The spec should include the following:

- Link to the GitHub epic issue
- Relevant background research
  - Details about what exists today in Fabric/v8 and Northstar/v0
  - Link to the Open UI research
  - Any relevant customer asks based on the open issues
- The proposed API: the set of props, slots, and tokens for the component.
  - Ideally you'd write the component's `.types.ts` file and use that directly as the API proposal.
- A few examples of code using the component. These could take the form of what would eventually be in an example from the documentation.
- A plan for migration from the v8 and v0 versions of the component.

### Spec Review

The reviewers will help to double check the spec, and the API is consistent with other Fluent UI controls. The review is _not_ intended to check every aspect of the design to ensure that the control works for all use cases--you are still accountable to create a high quality design for the control.

To get a review started:

- Create a pull request that contains `SPEC.md` and `.types.ts` (if applicable).
  - If you have any open questions, call them out with a comment on the PR.
  - Assign all of the core spec reviewers. Your PR should get signed off by at least one of these reviewers to be considered complete:
    - Levi (levithomason)
    - Miro (miroslavstastny)
    - Ben (behowell)
  - Anyone can provide input or feedback on Specs
- If needed, create a spec review meeting or use Spec Review - Office Hours to walk through the spec, and include a link to the PR in the meeting invite.
  - If you have access to the Fluent UI Internal Teams channel, post a link to the spec in the Convergence channel so people know to look at the spec. At-mention the reviewers to ensure it's on their radar.
- The spec does not have to be final with all issues or open questions resolved before merging the first draft.
  - If the open questions are large enough to warrant their own discussion, consider creating separate issues to track those open questions.

# Phase 2: Initial Implementation

Once the first draft of the spec has been reviewed, you can get started on the implementation.

## Implementation

**Requirements**

- Use React hooks
- Use makeStyles
- Respect Figma tokens (and use the Provider)
- Respect API principles, shorthands and slots handling
- No dependency on v0/v7/v8

You can follow examples of other converged components for the structure of the implementation, such as:

- [Button](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-button/src/components/Button)
- [Avatar](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-avatar/src/components/Avatar)

## Documentation

### Storybook stories

The primary public documentation for our controls is in the form of storybook stories demonstrating the various features and recommended usage of the control. The stories are in the /stories subfolder of the component package. In general, each story should cover only one feature of a control, and follow best practices for using the control. The `yarn create-component` command creates a single story for each component. If you're building a larger, more complex, compositional component, it may not make sense to publish a story for every component, so some may just be slightly opinionated flavors of existing v9 components. Be sure to be intentional about the story you're telling around the main component experience.

You can get started by looking at existing storybook stories:

- [Button examples](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-button/stories/Button)
- [Avatar examples](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-avatar/src/stories/Avatar)

### Additional documentation

- Documentation comments in code for all public APIs
- A `README.md` file in the component package
- Initial migration guide from v8 and v0

<a id="unstable-release"></a>

## Preview Release

Once the component is functional, it can be released as an unstable preview. This will allow both `designers` to review the built component and `partners` to try it out and give early feedback.

Tests are not required to be completed before releasing the component as unstable, but it is recommended to at least add conformance tests and some basic unit tests.

Run the following command (replace `MYCOMPONENT` with the appropriate package name):

```bash
yarn nx generate prepare-initial-release --project @fluentui/react-MYCOMPONENT-preview --phase=preview
```

# Phase 3: Validation and Stable Release

Once the component has been released as unstable, you should perform additional validation and complete any tests and documentation that was not finished before.

## Tests

- **Conformance tests**
  - Call `isConformant` from your components' tests.tsx file.
- **Unit tests**
  - Render your component with [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro) for the tests.
  - Use [queries](https://testing-library.com/docs/queries/about) like `getByRole` to find elements in the rendered DOM tree, and check that their attributes are as expected.
  - Avoid using snapshot tests.
  - When deciding what tests to write, generally the tests should cover all functionality in your component's state hook (`use{Component}`)
  - Follow examples from other components for more guidance, such as [Button.test.tsx](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-button/src/components/Button/Button.test.tsx)
- **Visual Regression Tests**
  - VR tests ensure that the components visuals do not change unexpectedly.
  - Add stories to the `vr-tests-react-components` app, for example [Button.stories.tsx](https://github.com/microsoft/fluentui/blob/master/apps/vr-tests-react-components/src/stories/Button.stories.tsx)
  - When deciding what tests to write, generally the tests should cover all states in your component's styling hook (`use{Component}Styles`).
- **Bundle Size Tests**
  - Example: [Button.fixture.js](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-button/bundle-size/Button.fixture.js)
- **Manual Accessibility Tests**
  - For more info see [Manual Accessibility Review Checklist](https://github.com/microsoft/fluentui/wiki/Manual-Accessibility-Review-Checklist)

## Validation

The converged component can't be considered fully complete until it is validated in a real product. Work with a partner team to make sure that they can use it in their product.

## Bug Bash

Organize a bug bash with other Fluent UI crews. This is the last chance to verify architecture consistency across the whole library and raise awareness among all crews. The feedback should be addressed before the stable release. There should be a bug bash for each major Time Zone (e.g. one for US and one for Europe). _Tip: Look for a volunteer from another Time Zone to schedule and run the bug bash for your component._

## Finalize documentation

- Ensure that there are best practices and do's/don'ts as applicable for your component
- Review the storybook stories for completeness and clarity
- Make sure the migration guide from v8 and v0 is complete. Also write codemods to automate the migration process whenever possible.

## Stable Release

Once all validation has been completed, the component is ready for a stable release! 🎉

Use the following script to move the package to stable, replacing `your-component` with the appropriate package name:

```bash
yarn nx generate prepare-initial-release --project @fluentui/react-your-component-preview --phase=stable
```

**Important**: Once the component has been released as stable, it can no longer have any breaking changes before the next major release of the library.
