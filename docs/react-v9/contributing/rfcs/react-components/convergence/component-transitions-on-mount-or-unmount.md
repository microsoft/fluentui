# RFC: Component CSS Animations/Transitions on mount/unmount

---

@marcosmoura

## Summary

This RFC outlines the implementation details for effectively tracking CSS animations/transitions within Fluent UI components, with a particular focus on the mount/unmount state.

## Background

Currently, there is a limitation in incorporating motion effects to components during their mounting or unmounting. This restricts the ability to apply CSS transitions/animations for components featuring an open/close behavior, such as Drawer, Dialog, and various others.

## Problem statement

In order to display that a content is showing or hiding from screen, CSS transitions or animations should be applied. React lacks built-in support for applying CSS animations or transitions specifically during the mount and unmount phases of a component's lifecycle and we need to develop a solution that can determine the on-screen status of a component. Even though there are existing packages available that could solve this issue, they either would increase bundle size (e.g., [Framer Motion](https://www.framer.com/motion/) and [React Spring](https://www.react-spring.dev/)) or lacking flexibility and better integration with how we create styles ([React Transition Group](https://reactcommunity.org/react-transition-group/)).

## Detailed Design or Proposal

### A `useMotion` hook based solution

To determine the motion state of a component, a hook could be created as part of the @fluentui/react-utilities package. A preliminary implementation of this hook can be found here: [useMotion](https://github.com/marcosmoura/fluentui/blob/feat/use-motion-presence-hook/packages/react-components/react-motion-preview/src/hooks/useMotion.ts).

#### What is it?

A tracker hook, that monitors the state of animations and transitions for a particular element. This hook does not directly create animations but instead synchronizes with CSS properties to determine the rendering status, visibility, entering, leaving, and ongoing animation of a component. If any CSS changes or properties are overridden, this hook will automatically adjust and stay synchronized.

#### API

The hook accepts a `MotionShorthand` param and a `MotionOptions`:

```tsx
// Types
export type MotionType = 'unmounted' | 'entering' | 'entered' | 'idle' | 'exiting' | 'exited';

export type MotionState<Element extends HTMLElement = HTMLElement> = {
  /**
   * Ref to the element.
   */
  ref: React.Ref<Element>;

  /**
   * Current state of the element.
   *
   * - `unmounted` - The element is not yet rendered or can be safely removed from the DOM.
   * - `entering` - The element is performing enter animation.
   * - `entered` - The element has finished enter animation.
   * - `idle` - The element is currently not animating, but rendered on screen.
   * - `exiting` - The element is performing exit animation.
   * - `exited` - The element has finished exit animation.
   */
  type: MotionType;

  /**
   * Indicates whether the component is currently rendered and visible.
   * Useful to apply CSS transitions only when the element is active.
   */
  active: boolean;

  /**
   * Indicates whether the component can be rendered.
   * This can be used to avoid rendering the component when it is not visible anymore.
   */
  canRender: boolean;
};

export type MotionShorthandValue = boolean;

export type MotionShorthand<Element extends HTMLElement = HTMLElement> = MotionShorthandValue | MotionState<Element>;

type MotionOptions = {
  /**
   * Whether to animate the element on first mount. Useful when the animation/transition
   * should be played if the element is already rendered on screen.
   *
   * @default false
   */
  animateOnFirstMount: false;
};

// Usage
const [open, setOpen] = React.useState(false);
const options = {
  animateOnFirstMount: false,
};
const { ref, type, active, canRender } = useMotion(open, options);
```

The hook always returns a `MotionState`. The received `MotionShorthand` parameter can be either a `boolean` or a `MotionState`. This flexibility is extremely useful for cases when an override on another component is needed, and with that a double calculation is avoided. See the **Usage** section on this document.

#### Usage

##### State:

```ts
import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import { useMotion } from '@fluentui/react-motion-preview';

import type { SampleProps, SampleState } from './Sample.types';

export const useSample_unstable = ({ open = false }: SampleProps, ref: React.Ref<HTMLElement>): SampleState => {
  const motion = useMotion(open);

  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getNativeElementProps('div', {
        ref: useMergedRefs(ref, motion.ref),
        ...props,
      }),
      { elementType: 'div' },
    ),

    motion,
  };
};
```

##### Renderization:

```tsx
import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { SampleState, SampleSlots } from './Sample.types';

/**
 * Render the final JSX of Sample
 */
export const renderSample_unstable = (state: SampleState) => {
  if (state.motion.canRender) {
    return null;
  }

  assertSlots<SampleSlots>(state);

  return <state.root />;
};
```

##### Styles:

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
    state.motion.active && styles.visible,
    state.motion.type === 'entering' && styles.entering,
    state.motion.type === 'exiting' && styles.exiting,
    styles.root,
  );

  return state;
};
```

##### Styles, in case of CSS animations:

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
    state.motion.type === 'entering' && styles.entering,
    state.motion.type === 'exiting' && styles.exiting,
    styles.root,
  );

  return state;
};
```

#### Overriding the transition/animation

To override motion on another component, only a CSS change is needed:

```tsx
import * as React from 'react';
import { Drawer } from '@fluentui/react-drawer';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  customDuration: {
    transitionDuration: '500ms',
  },
});

export const CustomDuration = () => {
  const styles = useStyles();

  return <Drawer className={styles.customDuration} />;
};
```

In order to enable overrides, Fluent components can also accept a prop that can be used to receive `useMotion` values coming from another component. This is extremely useful for cases when a completely custom animation/transition is needed. In this case, we enable full control to override animations/transitions while improving performance by not computing the values twice. In the following example, the `open` prop for the Drawer can receive either a `boolean` or a `MotionState`:

##### Application side:

```tsx
import * as React from 'react';
import { makeStyles, mergeClasses, Drawer, Button } from '@fluentui/react-components';
import { useMotion } from '@fluentui/react-motion-preview';

const useStyles = makeStyles({
  drawer: {
    opacity: 0,
    transitionDuration: '3s',
    transitionProperty: 'opacity',
  },

  drawerVisible: {
    opacity: 1,
  },
});

export const CustomAnimation = () => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const motion = useMotion<HTMLDivElement>(open);

  const onClick = () => setOpen(!open);

  return (
    <div className={styles.root}>
      <Button appearance="primary" onClick={onClick}>
        Toggle
      </Button>
      <Drawer open={motion} className={mergeClasses(styles.drawer, motion.active && styles.drawerVisible)} />;
    </div>
  );
};
```

##### Fluent Component:

```tsx
export const useDrawer_unstable = ({ open }: InlineDrawerProps, ref: React.Ref<HTMLDivElement>): InlineDrawerState => {
  // Call useMotion with given motion values
  const motion = useMotion(open);

  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getNativeElementProps('div', {
        ref: useMergedRefs(ref, motion.ref),
        ...props,
      }),
      { elementType: 'div' },
    ),

    motion,
  };
};
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

- 👎 Lacks support for sequential animation playback, similar to React Transition Group. This can be implemented using a separate solution, while using the `useMotion` hook.
