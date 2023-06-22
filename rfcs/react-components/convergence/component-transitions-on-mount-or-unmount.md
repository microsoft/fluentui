# RFC: Component CSS Animations/Transitions on mount/unmount

---

@marcosmoura

## Summary

This RFC outlines the implementation details for effectively tracking and applying CSS animations/transitions within Fluent UI components, with a particular focus on the mount/unmount state.

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
  const { ref: componentRef, shouldRender, visible, entering, exiting, animating } = useMotionPresence(open);

  return {
    components: {
      root: 'div',
    },

    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, componentRef),
    }),

    shouldRender,
    visible,
    entering,
    exiting,
    animating,
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

Styles:

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
    state.entering && styles.entering,
    state.exiting && styles.exiting,
    styles.root,
  );

  return state;
};
```

#### How it works?

The hook accepts a boolean value that represents the "presence" state. It internally tracks the animation/transition and return boolean values related to its motion state and a ref that needs to be assigned to the element we are tracking.

```ts
const {
  /*
   * Ref used to track the target element that requires animation. It should
   * be passed to the element responsible for performing the animation.
   */
  ref,

  /*
   * Determines whether the component should be displayed on the screen.
   *
   * This property will evaluate to `true` when the provided presence value is true.
   * Once the provided value changes to false, the hook will monitor the transition/animation
   * completion and subsequently set this property to false.
   */
  shouldRender,

  /*
   * Indicates whether the component is currently rendered and visible.
   *
   * This flag will be set to `true` one frame after the shouldRender value becomes true.
   * It will be set to `false` when the specified presence value changes to false.
   */
  visible,

  /*
   * Indicates whether the component is currently entering the screen.
   *
   * This will be `true` when the element is entering the screen. This happens
   * one frame after `visible` value becomes true.
   * It becomes `false` when the transition/animation ends.
   */
  entering,

  /*
   * Whether the component is leaving the screen
   *
   * This property is set to `true` one frame after the `visible` prop becomes true,
   * indicating that the element is in the process of entering the screen.
   * It becomes `false` when the transition/animation ends.
   * It is set to false once the transition or animation for the component has completed.
   */
  exiting,

  /*
   * Indicates whether the component is currently undergoing animation.
   * This property will be set to `true` when the component is either entering or exiting.
   */
  animating,
} = useMotionPresence(open);
```

Events can be provided as a second argument of the hook.:

```js
  const presence = useMotionPresence(open, {
    onEntered: () => {
      // Called when the element finished the "enter" animation/transition
    };
    onExited: () => {
      /// Called when the element finished the "leave" animation/transition
    };
  })
```

Other events can be implemented, like `onBeforeEnter` or `onBeforeLeave`.

#### Background research

- Vue.js [Transition component](https://vuejs.org/guide/built-ins/transition.html#javascript-hooks). The [implementation](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/components/Transition.ts) CSS transitions and animations and provides classes to the components based on the detected transitions.
- Radix UI has an internal package called [Presence](https://www.npmjs.com/package/@radix-ui/react-presence), which addresses the same issue. To handle this, they offer a [`usePresence` hook and a Presence component](https://github.com/radix-ui/primitives/blob/main/packages/react/presence/src/Presence.tsx). The implementation relies on animations only so they only need to determine whether the element should be present or not on the screen.

#### Pros

- 👍 Hook based solution.
- 👍 Griffel styles can be used normally to create motion.
- 👍 Easy styling of components based on their state.
- 👍 Offers the flexibility to declare both transitions and animations.
- 👍 Can be applied to multiple elements simultaneously.
- 👍 Animations/Transitions can be easily overridden on the application side.

#### Cons

- 👎 Lacks support for sequential animation playback, similar to React Transition Group.
