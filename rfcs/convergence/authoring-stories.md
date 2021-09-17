# RFC: Authoring storybook stories

---

_List contributors to the proposal:_ @hotell, @miroslavstastny, @ling1726, @andrefcdias, @PeterDraex

<!--
command to generate TOC:
yarn doctoc --github rfcs/convergence/authoring-stories.md
-->
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
  - [7. dissecting big story files into smaller ones](#7-dissecting-big-story-files-into-smaller-ones)
  - [8. location and naming convention](#8-location-and-naming-convention)
  - [9. UX of stories](#9-ux-of-stories)
    - [first story is called default](#first-story-is-called-default)
    - [appearance of stories](#appearance-of-stories)
    - [story code should be useful](#story-code-should-be-useful)
  - [10. Internal stories for testing](#10-internal-stories-for-testing)
  - [Pros and Cons](#pros-and-cons)
- [Discarded Solutions](#discarded-solutions)
- [Open Issues](#open-issues)

<!-- tocstop -->

## Summary

Currently we have no style-guide/functionality requirements on how to be consistent when writing stories for converged components. This RFC should describe (as we progress) the style we want going forward.

## Problem statement

For convergence (vNext) we agreed on a collocated stories approach that uses [Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf) for implementation.

In this RFC we supplement CSF with our own conventions for writing stories to ensure that format of our stories is consistent and compatibile with internal tooling.

## Detailed Design or Proposal

### 1. what should we use for interactive props playground - controls or knobs?

**Proposal:**

We should use [controls](https://storybook.js.org/docs/react/essentials/controls).

**Why:**

- while there are some limitations with using controls using them is an industry standard in the open source world and knobs will be deprecated in the next major storybook versions.

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

- this is not necessary as storybook generates all those controls automatically from TS metadata (Props interface)
- `argTypes` can be used for use cases when:

  - Storybook is unable to generated appropriate controls
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

### 5. how to properly annotate stories with TS metadata to get the best DX possible

TBA

### 6. file structure

The following rules must be followed when writing stories. They are put in place to allow easy intergration with CodeSandbox.

1. Every component can have at most one `.stories.tsx` file with default export which configures metadata about the component. This file must be called `Component.stories.tsx`, for example `Button.stories.tsx`.
2. Individual stories must be put into additional `.stories.tsx` files as a named export, and then re-exported from `Component.stories.tsx` file like this: `export * from ‘./IndividualStoryFile.stories’;`
3. `Component.stories.tsx` file must not contain any stories besides the default export.

**Good Example - multiple files**

```tsx
// @filename Button.stories.tsx
import { Button } from './Button'; // the component
import { Meta } from '@storybook/react';

// 💡 `Default` re-export needs to be always first !
export * from 'ButtonDefault.stories';
export * from 'ButtonWithIcon.stories';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;
```

```tsx
// @filename ButtonDefault.stories.tsx
export const ButtonDefault = (props: ButtonProps) => <Button {...props}>Button</Button>;
ButtonDefault.storyName = 'Default';
```

```tsx
// @filename ButtonWithIcon.stories.tsx
export const ButtonWithIcon = () => <Button icon={<CalendarIcon />}>Text</Button>;
```

**Bad Example 1 - multiple stories in a single file**

```tsx
// @filename Button.stories.tsx
import { Button, ButtonProps } from './Button'; // the component
import { Meta } from '@storybook/react';

export const Default = (props: ButtonProps) => <Button {...props}>Button</Button>;
export const ButtonWithIcon = () => <Button icon={<CalendarIcon />}>Text</Button>;

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;
```

**Bad example 2** - only `Component.stories.tsx` can have a default export

```tsx
// @filename  ButtonDefault.stories.tsx
export const ButtonDefault = (props: ButtonProps) => <Button {...props}>Button</Button>;
ButtonDefault.storyName = 'Default';

// don’t do this
export default {
  title: 'Components/Button',
  component: Button,
} as Meta;
```

```tsx
// @filename  ButtonWithIcon.stories.tsx
export const ButtonWithIcon = () => <Button icon={<CalendarIcon />}>Text</Button>;

// don’t do this
export default {
  title: 'Components/Button',
  component: Button,
} as Meta;
```

**Bad example 3** - mixing re-exports with inline definition within the main story

```tsx
// @filename  Button.stories.tsx
export const ButtonDefault = (props: ButtonProps) => <Button {...props}>Button</Button>;
ButtonDefault.storyName = 'Default';

export * from 'ButtonWithIcon.stories';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;
```

```tsx
// @filename  ButtonWithIcon.stories.tsx
export const ButtonWithIcon = () => <Button icon={<CalendarIcon />}>Text</Button>;
```

### 8. location and naming convention

All `.stories.tsx` which are related to a single docs page files must be in the same folder, which can either be the folder with component code, or a folder called `stories`.

### 9. UX of stories

#### default story

Every component must have a story called `Default`, which:

- must be re-expored as the first story - see [chapter 7](#7-dissecting-big-story-files-into-smaller-ones) for examples
- must support auto generated [Controls](https://storybook.js.org/docs/react/essentials/controls) - more details in [chapter 3](#3-should-controls-work-for-all-stories-or-only-for-generaldefault-one)

Storybook will render a Controls table under this story.

#### appearance of stories

Public stories should follow Fluent Design Language to give developers better feel for patterns they should utilize. For example, when a button is necessary to demonstrate usage of a component, Fluent UI Button should be used instead of a pure HTML button.

**Do:**

```tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please (see https://github.com/microsoft/fluentui/pull/18695)
import { Button } from '@fluentui/react-button';

export const Default = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface>Content</PopoverSurface>
  </Popover>
);
```

**Don’t:**

```tsx
export const Default = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger>
      <button>Popover trigger</button>
    </PopoverTrigger>

    <PopoverSurface>Content</PopoverSurface>
  </Popover>
);
```

#### story code

The user should be able to copy&paste the example code to their project and it should behave exactly the same as in the documentation. You can test this by exporting your story to CodeSandbox.

Because of this, using [Decorators](https://storybook.js.org/docs/react/writing-stories/decorators) is discouraged.

### 10. Internal stories for testing

As mentioned in for E2E testing, we should ensure maximum coverage for all publicly viewable stories by our consumers.
For more complex scenarios that need to be tested we should make sure that stories exist for E2E tests but should not be
easily accessible publicly.

Storybook has proposed a feature for this in [storybookjs/storybook#9209](https://github.com/storybookjs/storybook/issues/9209)
which will configure stories to exist in deeplink URL format, but do not appear in the nav tree or the docs page. As stated in the issue,
we can workaround before the release of this feature by modifying `manager-head.html` and set `display:none`for all
stories with a specific DOM `id` attribute. Storybook uses the `id` attribute for each link in the nav tree, and sets
the value to the story id.

Filename should mirror the name of the story, which will include the `Internal` keyword and therefore an `Internal.stories` suffix. This will enable easy IDE search. For example:

```ts
// MenuTabstopsInternal.stories.tsx
// Deep link /story/components-menu--tabstops-internal
// Does not appear in the sidebar or docs page
export const TabstopsInternal = () => {
  // story
};
```

The naming convention of the story simply adds the `Internal` keyword to the Pascal case story name. This will match the
filename. More importantly the generated id will contain `-internal` suffix, as in `menu-tabstops-internal`.

To hide these stories from published documentation, we can simply use a css wildcard query selector:

```css
[id*='internal'] {
  display: none;
}
```

This means that `Internal` will be a reserved keyword in our stories which will determine visibility. This does not cause
any conflicts with current stories, since this word is never used in any story name.

This solution will only need to be applied within `react-components` storybook configuration since that is the storybook currently targeted for
public use. Individual component storybooks are only used for local development, so there is no need to hide internal stories from their nav trees.

## Open Issues

- https://github.com/microsoft/fluentui/projects/44#card-60382483
