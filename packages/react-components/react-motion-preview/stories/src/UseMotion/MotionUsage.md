## Usage

`useMotion` accepts a `MotionShorthand` param and an optional `MotionOptions`. It returns a `MotionState` object. See below the definitions of these types.

```tsx
import * as React from 'react';

import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { useMotion } from '@fluentui/react-motion-preview';

const useStyles = makeStyles({
  root: {
    width: '200px',
    height: '200px',
    opacity: 0,
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out',
  },

  visible: {
    opacity: 1,
  },
});

export function MyComponent() {
  const styles = useStyles();

  const [isVisible, setIsVisible] = React.useState(false);
  const motion = useMotion(isVisible, { animateOnFirstMount: false });

  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
      {motion.canRender && (
        <div ref={motion.ref} className={mergeClasses(styles.root, motion.active && styles.visible)}>
          Hello World
        </div>
      )}
    </>
  );
}
```

### Type definitions

```tsx
type MotionType = 'entering' | 'entered' | 'idle' | 'exiting' | 'exited' | 'unmounted';

type MotionState<Element extends HTMLElement = HTMLElement> = {
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
   * Indicates whether the component can be rendered.
   * Useful to render the element before animating it or to remove it from the DOM after exit animation.
   */
  canRender: boolean;

  /**
   * Indicates whether the component is ready to receive a CSS transition className.
   * Useful to apply CSS transitions when the element is mounted and ready to be animated.
   */
  active: boolean;
};

type MotionShorthand<Element extends HTMLElement = HTMLElement> = boolean | MotionState<Element>;

type MotionOptions = {
  /**
   * Whether to animate the element on first mount.
   *
   * @default false
   */
  animateOnFirstMount?: boolean;

  /**
   * Duration of the animation in milliseconds.
   * If not specified, the duration will be inferred from the CSS transition/animation duration.
   *
   * @default 0
   */
  duration?: number;
};
```

## Example
