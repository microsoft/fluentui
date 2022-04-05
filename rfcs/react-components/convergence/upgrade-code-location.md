# RFC: Upgrade code location

---

@GeoffCoxMSFT

## Summary

Partners and customer developers will need some helper code to upgrade from v0 or v8 to v9.
This will include

- shim components - take v0 or v8 props and render v9 components
- shim functions - functions to help map between v0/v8 themes, styles, etc. and v9
- code mod scripts - scripts that update code calling v8 to call v9 components
- examples - web applications or stories that show before (v0/v8), during (side-by-side), and after (v9)

## Background

We currently have code for upgrade v8 to v9 in the [fluentui-react-upgrade repository](https://github.com/microsoft/fluentui-react-upgrade). This repository is currently accessibly only within the Microsoft organization. This repo also has the upgrade guide for v8 to v9 which is in progress being moved into the v9 storybook documentation.

So far the few partners that have done flighting of v9 components prefer access to the shim source code that they can extract into their own repositories to modify for their specific flighting scenarios.
They have not yet asked for a package of shims to take a dependency on, but prefer to write their own shims if they are not upgrading to v9 directly.
They have tended to author their own code-mod scripts.

## Problem statement

Where should upgrade helper code live?

## Detailed Design or Proposal

### Option G: Create separate storybook projects for composition

This would be separate storybooks under apps/ for v0->v9 and v8->9 that can
be composed into the react-components storybook documentation.

Suggested by Micah based on https://www.chromatic.com/docs/composition

Pros

- Same to adding stories to react-components.
- Has room for other example apps and tools related to upgrade.

Cons

- Similar to adding stories to react-components, but without the con of adding a v8 or v0 weak dependencies to that package.
- More projects in the tree to build

CHOSEN: This option provides the best dependency management without affecting packages,
avoid shipping packages of shims to npm, and encourages the behavior we want by integrating
with documentation.

## Discarded Solutions

### Option A: Create upgrade packages in the fluent repo

These would be react-upgrade-v8 react-upgrade-v0 packages containing the shim components and functions.
These packages would be part of the build, produce storybook content, and publish to npm with semantic versioning.

Pros

- Shims keep up with v8 and v9 changes and break when there are breaking changes to address
- Easy adoption for customers and partners
- If v8 lives for a long time, the shims will provide long-term value

Cons

- Adding more packages to the build system costs time and energy
- It is probably overkill to expect shim code to meet the same quality bar as v9 component code
- Shipping a package to npm indicates that we will support it for a significant time
- Shipping a package to npm may entice customers to **never** move off of v8 entirely
- Not a great place for the code-mod scripts

DISCARDED: We don't want to ship these as packages permanently

### Option B: Create an annex folder in the fluent repo

This would be a folder that is **not** part of the fluent build.
It would contain various folders with shims, code-mod scripts, and example web apps.
Readme.md files would indicate who owns the project as a point of contact.

Pros

- Does not affect build time
- Starter location for community contrib of other shims, examples and unofficial components.

Cons

- Could end up being unmanagable
- Possible low quality with broken builds
- Barrier to entry for customers to have to sync, build, and run examples.

DISCARDED: The apps folder already provides a place for things outside packages.

### Option C: Put upgrade code in react-component/stories

The shims would be components within the storybook stories in react-components, similar
to the positioning components. The shims would not ship with the published react-components package (like the current stories).

Pros

- Shims and their example stories are easy to find as they are part of storybook
- Shims can be opened in codesandbox
- Encourages cut-and-paste of shims into customer codebase

Cons

- Impacts build time
- react-components stories take a weak dependency on v8 due to shim dependency
- Have to double check that it doesn't bloat the bundle size of react-components

DISCARDED: Cannot take the v0 and v8 dependencies in react-components

### Option D: Make the upgrade repository public

Make the upgrade repo public.

Pros

- Separates the upgrade stuff from the v9 stuff. Easy to delete when v8 goes away.
- Don't have to move code and there is room for v0.

Cons

- Compliance for another public repo
- Hard to delete a public repo if customers depend on it
- Barrier to entry since separate from storybook

DISCARDED: The cost of creating a public complient repo for upgrade is too high.

### Option E: Create a community-contrib repo

Pros/Cons similar to Option D

DISCARDED (for now): The community contrib repo should be part of a bigger community engagement.
We haven't planned that out enough to start with upgrade.

### Option F: Only create codesandbox.io sandboxes with shim code

Pros

- Lightweight approach
- Encourages cut-and-paste use of shims
- Temporal and can disappear as v8 retires

Cons

- We don't have an official codesandbox account
- Links to sandboxes can be fragile
- Some upgrade code is bigger than a typical sandbox
- Easy to have them not work due to changes in v8 or v9
- Hard to share code between shims
- Hard to catalog community contrib sandboxes

DISCARDED: Without a corporate account, these would get lost easily and be too difficult to keep up to date.

## Open Issues

None yet
