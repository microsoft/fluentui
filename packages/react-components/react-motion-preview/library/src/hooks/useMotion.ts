import * as React from 'react';
import { useAnimationFrame, useTimeout, useFirstMount } from '@fluentui/react-utilities';

import { useReducedMotion } from './useReducedMotion';
import { getMotionDuration } from '../utils/dom-style';
import type { HTMLElementWithStyledMap } from '../utils/dom-style';

export type MotionOptions = {
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

export type MotionType = 'entering' | 'entered' | 'idle' | 'exiting' | 'exited' | 'unmounted';

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

export type MotionShorthandValue = boolean;
export type MotionShorthand<Element extends HTMLElement = HTMLElement> = MotionShorthandValue | MotionState<Element>;

/**
 * @internal
 *
 * Checks if components was mounted after first render and a certain condition is met.
 *
 * @param condition - Condition to check
 */
const useFirstMountCondition = (condition: boolean): boolean => {
  const isFirst = React.useRef(true);

  if (isFirst.current && condition) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
};

/**
 * @internal
 *
 * Hook to manage the presence of an element in the DOM based on its CSS transition/animation state.
 *
 * @param present - Whether the element should be present in the DOM
 * @param events - Callbacks for when the element enters or exits the DOM
 */
function useMotionPresence<Element extends HTMLElement>(
  presence: boolean,
  options: MotionOptions = {},
): MotionState<Element> {
  'use no memo';

  const { animateOnFirstMount, duration } = { animateOnFirstMount: false, ...options };

  const [type, setType] = React.useState<MotionType>(
    presence && animateOnFirstMount ? 'entering' : presence ? 'idle' : 'unmounted',
  );
  const [active, setActive] = React.useState<boolean>(!animateOnFirstMount && presence);

  const [setAnimationTimeout, clearAnimationTimeout] = useTimeout();
  const [setTickTimeout, clearTickTimeout] = useTimeout();
  const [setAnimationFrame, cancelAnimationFrame] = useAnimationFrame();

  const [currentElement, setCurrentElement] = React.useState<HTMLElementWithStyledMap<Element> | null>(null);

  const isReducedMotion = useReducedMotion();
  const isFirstReactRender = useFirstMount();
  const isFirstDOMRender = useFirstMountCondition(!!currentElement);
  const isInitiallyPresent = React.useRef<boolean>(presence).current;
  const disableAnimation = isReducedMotion || (isFirstDOMRender && isInitiallyPresent && !animateOnFirstMount);

  const ref: React.RefCallback<HTMLElementWithStyledMap<Element>> = React.useCallback(node => {
    if (!node) {
      return;
    }

    setCurrentElement(node);
  }, []);

  const nextTick = React.useCallback(
    (cb: () => void) => {
      setTickTimeout(() => setAnimationFrame(cb), 0);

      return () => {
        clearTickTimeout();
        cancelAnimationFrame();
      };
    },
    [cancelAnimationFrame, clearTickTimeout, setAnimationFrame, setTickTimeout],
  );

  const onFinished = React.useCallback(() => {
    setType(presence ? 'entered' : 'exited');
    nextTick(() => setType(presence ? 'idle' : 'unmounted'));
  }, [nextTick, presence]);

  React.useEffect(() => {
    if (isFirstReactRender) {
      return;
    }

    // In case animation is disabled, we can skip the animation and go straight to the idle state.
    if (disableAnimation) {
      setType(presence ? 'idle' : 'unmounted');
      setActive(presence);
      return;
    }

    setType(presence ? 'entering' : 'exiting');

    // If the element is not rendered, nothing to do.
    if (!currentElement) {
      return;
    }

    // Wait for the next frame to ensure the element is rendered and the animation can start.
    nextTick(() => {
      setActive(presence);

      // Wait for the next frame to ensure the animation has started.
      nextTick(() => {
        const finalDuration = duration || getMotionDuration(currentElement);

        if (finalDuration === 0) {
          onFinished();
          return;
        }

        /**
         * Wait for the animation to finish before updating the state.
         * This is an alternative to using the `transitionend` event which can be unreliable as it fires multiple times
         * if the transition has multiple properties.
         */
        setAnimationTimeout(() => onFinished(), finalDuration);
      });
    });

    return () => clearAnimationTimeout();
    /*
     * Only tracks dependencies that are either not stable or are used in the callbacks
     * This is to avoid re-running the effect on every render, especially when the DOM element is not rendered
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement, disableAnimation, onFinished, presence]);

  return React.useMemo<MotionState<Element>>(
    () => ({
      ref,
      type,
      active,
      canRender: presence || type !== 'unmounted',
    }),
    // No need to add ref to the deps array as it is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, type, presence],
  );
}

/**
 * Returns a default motion state.
 */
export function getDefaultMotionState<Element extends HTMLElement>(): MotionState<Element> {
  return {
    ref: React.createRef<Element>(),
    type: 'unmounted',
    active: false,
    canRender: false,
  };
}

/**
 * Hook to manage the presence of an element in the DOM based on its CSS transition/animation state.
 *
 * @param props - Motion props to manage the presence of an element in the DOM
 * @param options - Motion options to configure the hook
 */
export function useMotion<Element extends HTMLElement>(
  shorthand: MotionShorthand<Element>,
  options?: MotionOptions,
): MotionState<Element> {
  const isShorthand = typeof shorthand === 'object';
  const motion = useMotionPresence<Element>(isShorthand ? false : shorthand, options);

  return isShorthand ? shorthand : motion;
}
