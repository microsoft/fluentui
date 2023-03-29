# RFC: Component CSS Transitions on mount/unmount

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

@marcosmoura

## Summary

This RFC describes how CSS transitions in Fluent UI components can be applied.

## Background

Currently it is not possible to add CSS transition to components on mount/unmount. A usage of this pattern would be transitions to components that has a open/close toggle, such as Drawer, Dialog and more.

## Problem statement

In order to display that a content is showing or hiding from screen, CSS transitions should be applied. Due to React's way of rendering, there is no builtin support for this, therefore we need to create a solution that can provide with the status of component on screen.

## Detailed Design or Proposal

### A `useAnimationState` hook based solution

To differentiate the animation state of a component, a hook could be created and be part of the react-utilities. Note that every time a status change (from not visible to entering for example) the component will rerender. A draft implementation of the hook: [useAnimationState](https://github.com/marcosmoura/fluentui/blob/marcosmoura/feat/drawer-component/packages/react-components/react-drawer/src/components/Drawer/useAnimationState.ts)

Usage in the component:

```ts
import * as React from 'react';
import { getNativeElementProps, useAnimationState } from '@fluentui/react-utilities';

import type { SampleProps, SampleState } from './Sample.types';

export const useSample_unstable = ({ open = false }: SampleProps, ref: React.Ref<HTMLElement>): SampleState => {
  const { visible, mounted, animating, entering, exiting } = useAnimationState(open, {
    enterDuration: 200,
    exitDuration: 250,
  });

  return {
    components: {
      root: 'div',
    },

    root: getNativeElementProps('div'),

    visible,
    mounted,
    animating,
    entering,
    exiting,
  };
};
```

Applying styles:

```ts
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SampleSlots, SampleState } from './Sample.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const SampleClassNames: SlotClassNames<SampleSlots> = {
  root: 'fui-Sample',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    transitionTimingFunction: 'ease-out',
    transitionProperty: 'opacity',
  },

  entering: {
    transitionDuration: '200ms',
  },

  exiting: {
    transitionDuration: '250ms',
  },

  visible: {
    opacity: 1,
  },
});

export const useSampleStyles_unstable = (state: SampleState): SampleState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    SampleClassNames.root,
    state.visible && styles.visible,
    state.entering && styles.entering,
    state.exiting && styles.exiting,
    styles.root,
  );

  return state;
};
```

#### Pros

- 👍 Simple hook.
- 👍 Use Griffel styles to create transitions
- 👍 Easy to style components based on state.
- 👍 Freedom to declare transitions as well as animations.

#### Cons

- 👎 Need to sync the duration values in styles and hook parameter.
- 👎 In order to use tokens to express the durations, a change to the [tokens package](https://github.com/microsoft/fluentui/blob/master/packages/tokens/src/global/durations.ts) would be needed to export the values as numbers, so they could be used in JS.
