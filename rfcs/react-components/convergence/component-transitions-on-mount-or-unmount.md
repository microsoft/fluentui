# RFC: Component CSS Animations/Transitions on mount/unmount

---

@marcosmoura

## Summary

This RFC outlines the implementation details for effectively tracking CSS animations/transitions within Fluent UI components, with a particular focus on the mount/unmount state.

## Background

Currently, there is a limitation in incorporating motion effects to components during their mounting or unmounting. This restricts the ability to apply CSS transitions/animations for components featuring an open/close behavior, such as Drawer, Dialog, and various others.

## Problem statement

In order to display that a content is showing or hiding from screen, CSS transitions or animations should be applied. React lacks built-in support for applying CSS animations or transitions specifically during the mount and unmount phases of a component's lifecycle and we need to develop a solution that can determine the on-screen status of a component. Even though there are existing packages available that could solve this issue, they either would increase bundle size (e.g., [Framer Motion](https://www.framer.com/motion/) and [React Spring](https://www.react-spring.dev/)) or lacking flexibility and better integration with Griffel ([React Transition Group](https://reactcommunity.org/react-transition-group/)).

## Detailed Design or Proposal

### A `useMotionPresence` hook based solution

To determine the motion state of a component, a hook could be created as part of the @fluentui/react-utilities package. A preliminary implementation of this hook can be found here: [useMotionPresence](https://github.com/marcosmoura/fluentui/blob/feat/drawer-motion/packages/react-components/react-utilities/src/hooks/useMotionPresence.ts).

#### What is it?

A tracker hook, that monitors the state of animations and transitions for a particular element. A hook to track the state of animations/transitions. This hook does not directly create animations but instead synchronizes with CSS properties to determine the rendering status, visibility, entering, leaving, and ongoing animation of a component. If any CSS changes or properties are overridden, this hook will automatically adjust and stay synchronized.

#### Usage

State:

```ts
import * as React from 'react';
import { getNativeElementProps, useMotionPresence, useMergedRefs } from '@fluentui/react-utilities';

import type { SampleProps, SampleState } from './Sample.types';

export const useSample_unstable = ({ open = false }: SampleProps, ref: React.Ref<HTMLElement>): SampleState => {
  const { ref: componentRef, shouldRender, visible, motionState } = useMotionPresence(open);

  return {
    components: {
      root: 'div',
    },

    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, componentRef),
    }),

    shouldRender,
    visible,
    motionState,
  };
};
```

Renderization:

```tsx
import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SampleState, SampleSlots } from './Sample.types';

/**
 * Render the final JSX of Sample
 */
export const renderSample_unstable = (state: SampleState) => {
  const { slots, slotProps } = getSlots<SampleSlots>(state);

  if (!state.shouldRender) {
    return null;
  }

  return <slots.root {...slotProps.root} />;
};
```

Styles, in case of CSS transitions:

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
    opacity: 0,
    transitionTimingFunction: 'ease-out',
    transitionProperty: 'opacity',
    willChange: 'opacity',
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
    state.motionState === 'entering' && styles.entering,
    state.motionState === 'exiting' && styles.exiting,
    styles.root,
  );

  return state;
};
```

Styles, in case of CSS animations:

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
const visibleKeyframe = {
  ...shorthands.borderRadius(0),
  opacity: 1,
  transform: 'translate3D(0, 0, 0) scale(1)',
};

const hiddenKeyframe = {
  ...shorthands.borderRadius('36px'),
  opacity: 0,
  transform: 'translate3D(-100%, 0, 0) scale(0.9)',
};

const useStyles = makeStyles({
  root: {
    willChange: 'opacity, transform, border-radius',
  },

  entering: {
    animationDuration: '500ms',
    animationTimingFunction: tokens.curveDecelerateMid,
    animationName: {
      '0%': hiddenKeyframe,
      '100%': visibleKeyframe,
    },
  },

  exiting: {
    animationDuration: '750ms',
    animationTimingFunction: tokens.curveAccelerateMin,
    animationName: {
      '0%': visibleKeyframe,
      '100%': hiddenKeyframe,
    },
  },
});

export const useSampleStyles_unstable = (state: SampleState): SampleState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    SampleClassNames.root,
    state.motionState === 'entering' && styles.entering,
    state.motionState === 'exiting' && styles.exiting,
    styles.root,
  );

  return state;
};
```

Overriding the transition/animation on the Application side:

```tsx
import * as React from 'react';
import { Drawer } from '@fluentui/react-drawer';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  customDuration: {
    transitionDuration: '500ms',
    animationDuration: '750ms',
  },
});

export const CustomDuration = () => {
  const styles = useStyles();

  return <Drawer className={styles.customDuration} />;
};
```

#### How it works?

The hook accepts a boolean value that represents the "presence" state. It internally tracks the animation/transition and return boolean values related to its motion state and a ref that needs to be assigned to the element we are tracking.

```ts
const {
  /**
   * Ref used to track the target element that requires animation. It should
   * be passed to the element responsible for performing the animation.
   */
  ref,

  /**
   * Determines whether the component should be displayed on the screen.
   *
   * This property will evaluate to `true` when the provided presence value is true.
   * Once the provided value changes to false, the hook will monitor the transition/animation
   * completion and subsequently set this property to false.
   */
  shouldRender,

  /**
   * Indicates whether the component is currently rendered and visible.
   *
   * This flag will be set to `true` one frame after the shouldRender value becomes true.
   * It will be set to `false` when the specified presence value changes to false.
   */
  visible,

  /**
   * Current state of the tracked element
   *
   * Can return one of the following states:
   * - `entering` - The element is entering the DOM.
   * - `exiting` - The element is exiting the DOM.
   * - `resting` - The element is currently not animating, but rendered on screen.
   * - `unmounted` - The element is not rendered in the DOM.
   */
  motionState,
} = useMotionPresence(open);
```

Options can be provided as a second argument of the hook.:

```js
  const presence = useMotionPresence(open, {
    /**
     * Whether to animate the element on first mount. Useful when the element
     * is visible on first render, but still can be to be toggled off
     *
     * @default false
     */
    animateOnFirstMount: false;
  })
```

#### Background research

- Vue.js [Transition component](https://vuejs.org/guide/built-ins/transition.html#javascript-hooks). The [implementation](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/components/Transition.ts) CSS transitions and animations and provides classes to the components based on the detected transitions.
- Radix UI has an internal package called [Presence](https://www.npmjs.com/package/@radix-ui/react-presence), which addresses the same issue. To handle this, they offer a [`usePresence` hook and a Presence component](https://github.com/radix-ui/primitives/blob/main/packages/react/presence/src/Presence.tsx). The implementation relies on animations only so they only need to determine whether the element should be present or not on the screen.

#### Pros

- 👍 Hook based solution.
- 👍 Griffel styles can be used normally to create motion.
- 👍 Easy styling of components based on their state.
- 👍 Offers the flexibility to declare both transitions and animations.
- 👍 Can be applied to multiple elements simultaneously.
- 👍 Users can easily override Animations/Transitions just by changing CSS.

#### Cons

- 👎 Lacks support for sequential animation playback, similar to React Transition Group.
