# RFC: Authoring storybook stories

---

_List contributors to the proposal:_ @hotell, @miroslavstastny, @ling1726, @andrefcdias

<!-- toc -->

- [Summary](#summary)
- [Problem statement](#problem-statement)
- [Detailed Design or Proposal](#detailed-design-or-proposal)
  - [1. what should we use for interactive props playground - controls or knobs?](#1-what-should-we-use-for-interactive-props-playground---controls-or-knobs)
  - [2. how to use `argTypes`](#2-how-to-use-argtypes)
  - [3. should controls work for all stories or only for general/default one](#3-should-controls-work-for-all-stories-or-only-for-generaldefault-one)
  - [4. should we render descriptions table in Canvas Control pane](#4-should-we-render-descriptions-table-in-canvas-control-pane)
  - [5. how to author e2e suites for those stories](#5-how-to-author-e2e-suites-for-those-stories)
  - [6. how to properly annotate stories with TS metadata to get the best DX possible](#6-how-to-properly-annotate-stories-with-ts-metadata-to-get-the-best-dx-possible)
  - [7. how structure stories in the storybook nav tree](#7-how-structure-stories-in-the-storybook-nav-tree)
  - [8. dissecting big story files into smaller ones](#8-dissecting-big-story-files-into-smaller-ones)
  - [Pros and Cons](#pros-and-cons)
- [Discarded Solutions](#discarded-solutions)
- [Open Issues](#open-issues)

<!-- tocstop -->

## Summary

Currently we have no style-guide/functionality requirements on how to be consistent when writing stories for converged components. This RFC should describe (as we progress) the style we want going forward.

## Problem statement

For convergence (vNext) we agreed on a collocated stories approach that uses [Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf) for implementation.

**What are we missing:**

1. what should we use for interactive props playground - controls or knobs?
2. how to use `argTypes`
3. should controls work for all stories or only for general/default one
4. should we render descriptions table in Canvas Control pane
5. how to author e2e suites for those stories
6. how to properly annotate stories with TS metadata to get the best DX possible
7. how structure stories in the storybook nav tree / @miroslavstastny
8. what to do if story files are getting way too big (dissecting big story files into smaller ones) / @ling1726

> **💡 NOTE:**
> This RFC will address the first 4 points for now (should be updated with others later).

## Detailed Design or Proposal

### 1. what should we use for interactive props playground - controls or knobs?

**Proposal:**

We should use [controls](https://storybook.js.org/docs/react/essentials/controls).

**Why:**

- while there are some limitations with using controls (they don't mirror the state in URL thus cannot be tested in e2e scenarios), using them is an industry standard in the open source world, also knobs will be deprecated in the next major storybook versions.

### 2. how to use `argTypes`

A pattern that is used in some of the converged stories is to define everything by hand:

```ts
AccordionExample.argTypes = {
  inline: {
    defaultValue: false,
    control: 'boolean',
  },
  navigable: {
    defaultValue: false,
    control: 'boolean',
  },
  circular: {
    defaultValue: false,
    control: 'boolean',
  },
  multiple: {
    defaultValue: false,
    control: 'boolean',
  },
  // ... other definitions of controls
};
```

**Proposal:**

> **NOTE:** we still need to manually provide `argTypes` until all vNext packages including react-components will be migrated to new DX. See [#18514](https://github.com/microsoft/fluentui/issues/18514)

- this is not necessary as storybook generates all those controls automatically from TS metadata (Props interface)
- `argTypes` can be used for use cases when:

  - SB is unable to generated appropriate controls
  - we wanna override default value based on API
  - we wanna hide some controls that don't make sense to be handled in particular story

  ```tsx
  const StoryName = (props: {defaultOpen?:boolean}) => { /* ... */ }
  // HIDE actionable Control
  StoryName.argTypes = {
    defaultOpen: {
      control: false,
    },
  },
  ```

### 3. should controls work for all stories or only for general/default one

**Proposals (2)**

_1. ✅ provide controls with control pane only for default/playground story_

> This is preferred approach - Based on feedback from @teams-prg/@cxe-prg team

With that approach we would probably need to completely get rid of `controls` addon pane from all stories except `Docs` view and our `Default/Playground` story.

This can be achieved by following config:

```js
// @filename .storybook/preview.js

export const parameters = {
  // disable control pane/addon for all stories except `Docs` view
  controls: {
    disable: true,
  },
};
```

```tsx
// @filename FooBar.stories.tsx
export const Playground = (props:FooBarProps) => {.....}
Default.parameters = {
  controls: {
    // Enable Controls Pane only for our default/playground
    disable: false,
  },
};
```

Results in:

- ![Playground story - including controls pane](https://user-images.githubusercontent.com/1223799/121183395-50093e80-c864-11eb-99bd-6e532981fb76.png)
- ![Specific story - no controls pane](https://user-images.githubusercontent.com/1223799/121184014-f35a5380-c864-11eb-9b2b-046ff4c7b741.png)
- ![Docs view - includes controls for Default/Playground story](https://user-images.githubusercontent.com/1223799/121184339-4a602880-c865-11eb-842c-f6534f083cda.png)

_2. Make controls work for all stories besides default/playground_

> this would require additional effort from our side (documented below) and we might run into issues when dealing with complex controls although [storybook provides decent amount of customization](https://storybook.js.org/docs/react/essentials/controls#fully-custom-args).

<details>
Storybook will generate controls table with API descriptions (Extracted from JSDoc) based on default export per story file.

```tsx
// @filename FooBar.stories.tsx
export default {
  title: 'Components/FooBar',
  component: FooBar,
};
```

By default the controls pane will be used for every story in the story file. This creates confusing DX to the consumer as those controls will generate only a warning message with the inability to use them.

To make the control pane work for every story, we need to provide props argument with proper type so SB generates those stories accordingly. Also they need to be passed to the underlying component.

**Before:**

- Pane generated
- Warnings that controls cannot be generated

```tsx
import {FooBar} from './index'

export const Example = () => {
  return <FooBar onClick={handleClick} value={value}><div>{/* ..... */}</div></Foobar>
}
```

**After:**

- Pane Generated
- No warnings and controls work

```tsx
import {FooBar,FooBarProps} from './index';

export const Example = (props: FooBarProps) => {
 return <FooBar {...props}><div>{/* ..... */}</div></Foobar>
}
```

For more focused stories that showcase more focused behaviors (lets say a controlled version of component), we need to handle this by hand and also turn off controls for props that are being implemented by us.

**Before:**

- Pane Generated
- No warnings but controls don't work (or do but in a weird way)

```tsx
import {FooBar,FooBarProps} from './index';

export const Example = (props: FooBarProps) => {
  const handleClick = () => {};
  const value = 'hello';

  return (
    <FooBar onClick={handleClick} value={value}>
      <div>{/* ..... */}</div>
    </Foobar>
  )
}
```

**After:**

- Pane Generated
- No warnings and controls work
- `value` is not interactive in controls pane as that's handled by our custom logic

```tsx
import {FooBar,FooBarProps} from './index'

export const Example = (props: FooBarProps) => {

  const handleClick = () => {};
  const value = 'hello';

  const resolvedProps = {...props,value,handleClick};

  return <FooBar {...props}><div>{/* ..... */}</div></Foobar>
}

// define all props (except callbacks - those are omitted by default) that are handled by our custom logic
Example.argTypes = {
  // this is needed to remove interactive control from controls pane, otherwise the DX would be confusing (sometimes it works sometimes it doesn't)
  value: {
    control: false,
  },
} as ArgTypes;
```

</details>

### 4. should we render descriptions table in Canvas Control pane

**Proposal**

- we should
- this can be set up in root Storybook config via

```ts
// @filename ./storybook/preview.js
export const parameters = { controls: { expanded: true } };
```

**Before:**
![](https://user-images.githubusercontent.com/1223799/121168458-44f9e280-c853-11eb-8d27-ad5404faf9a7.png)

**After:**
![](https://user-images.githubusercontent.com/1223799/121168684-84c0ca00-c853-11eb-8742-2fa10a797809.png)

### 5. how to author e2e suites for those stories

> This section assumes that the storybook stories forms the core documentation of Fluent converged.
> This may change in the future so the measures proposed in this section might no longer be relevant
> if this assumption is no longer true.

`react-menu` already has entire test suites dedicated to testing against storybook. Since each PR build will
deploy a storybook, the cypress testing solution for converged components will test against the PR storybook. This
includes the constraint that until a component is added to `react-components` it cannot be tested in CI.

The e2e testing solution for `react-menu` can be used for any converged component using storybook, and is also used by
`react-accordion` and `react-popover`. The purposes of E2E tests currently is to run internaction tests against the browser.
Visual regression tests are handled by screener in `app-vrtests` and is out of the scope of this RFC.

We propose to write an NX workspace generator to setup the e2e testing folder structure and dependencies for each package. The process is quite simple currently but still needs to be done manually.

How to write E2E tests is out of the scope of the RFC. Testing is encouraged to use publicly viewable stories as much as possible. However there will be edge cases and scenarios that will be tested which require stories that are accessible to the E2E test runner but not viewable by public consumers. We provide a proposal to handle this in a later section in this RFC.

### 6. dissecting big story files into smaller ones

For easier maintainability, each story should be in its own file. Common utilities can be shared in their own modules.
We need to make sure that no code used in stories accidentally leak into the exported package. To make this more explicit
in the repo, all colocated stories and related code should be stored under a `/stories` folder in the package. Below is
an example of the proposed file tree:

```
packages/react-menu/
├─ stories/
│  ├─ Menu/
│    ├─ Default.stories.tsx
│    ├─ Controlled.stories.tsx
│  ├─ MenuList/
│    ├─ Default.stories.tsx
│    ├─ WithIcons.stories.tsx
│  ├─ tmp-icons.tsx
├─ src/
│  ├─ index.js
├─ .gitignore
├─ package.json
├─ README.md
├─ Spec.md
```

The name of each `stories` file should be the name of the story in storybook, for easy searching in the IDE. Since we follow
`Component Story Format (CSF)` a different folder should be used for each component in storybook.

We should invest in creating lint rules and automation that will enforce this file structure and guarantee imports
from storybook related code do not leak into the package.

### 7. how structure stories in the storybook nav tree

> This section assumes that the storybook stories forms the core documentation of Fluent converged.
> This may change in the future so the measures proposed in this section might no longer be relevant
> if this assumption is no longer true.

Previous proposals regarding controls state that each component will contain one Default/Playground story which should
be the first story that is displayed when the component is selected in storybook. By default storybook's CSF will display
the first story loaded by import when a component is selected.

Following the proposal by the previous section to extract each story into its own file, the order that storybook loads
stories is no longer deterministic. Therefore, we need to modify the root storybook configuration to use a custom
sorting algorithm so that a story called `Default` will always be sorted to be the first story under a component.

The `Default` story will be reserved and unique for each component. Each package can choose to document stories for each
component that is exported, as stated in the previous section.

#### Internal stories

As mentioned in for E2E testing, we should ensure maximum coverage for all publicly viewable stories by our consumers.
For more complex scenarios that need to be tested we should make sure that stories exist for E2E tests but should not be
easily accessible publicly.

Storybook has proposed a feature for this in [storybookjs/storybook](https://github.com/storybookjs/storybook/issues/9209)
which will configure stories to exist in deeplink URL format, but do not appear in the nav tree. As stated in the issue,
we can workaround before the release of this feature by modifying `manager-head.html` and set `display:none`for all
stories with a specific DOM `id` attribute. Storybook uses the `id` attribute for each link in the nav tree, and sets
the value to the story id.

We propose to use an extra filename extension and naming convention for internal stories:

```ts
// MenuTabstops.internal.stories.tsx

export const MenuTabstopsInternal = () => {
  // story
};
```

The filename extension `.internal.` is used for IDE searchability and codebase readability.

The naming convention of the story simply adds the `Internal` keyword to the Pascal case story name. This will match the
filename. More importantly the generated id will contain `menu-tabstops-internal`.

We can simply use a css wildcard query selector:

```css
[id*='internal'] {
  display: none;
}
```

This means that `Internal` will be a reserved keyword in our stories which will determine visibility. This does not cause
any conflicts with current stories, since this word is never used in any story name.

This solution will only need to be applied `react-components` storybook since that is the storybook currently targeted for
public use. Individual component storybooks are only used for local development, so there is no need to hide internal stories from their nav trees.

### 8. how to properly annotate stories with TS metadata to get the best DX possible

TBA

### Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

N/A for now

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

N/A

## Open Issues

- https://github.com/microsoft/fluentui/projects/44#card-60382483
