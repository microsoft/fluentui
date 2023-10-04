import * as React from 'react';
import { useAnimationFrame, useTimeout, usePrevious, useFirstMount } from '@fluentui/react-utilities';

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

  /**
   * Indicates whether the component has internal motion.
   * Useful to avoid applying internal motion when the component is being overridden by a parent.
   */
  hasInternalMotion: boolean;
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
  const { animateOnFirstMount } = { animateOnFirstMount: false, ...options };

  const [type, setType] = React.useState<MotionType>(
    presence && animateOnFirstMount ? 'entering' : presence ? 'idle' : 'unmounted',
  );
  const [active, setActive] = React.useState<boolean>(!animateOnFirstMount && presence);

  const [setAnimationTimeout, clearAnimationTimeout] = useTimeout();
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

  const onFinished = React.useCallback(() => {
    setType(presence ? 'entered' : 'exited');
    setAnimationFrame(() => setType(presence ? 'idle' : 'unmounted'));
  }, [presence, setAnimationFrame]);

  React.useEffect(() => {
    if (isFirstReactRender) {
      return;
    }

    /*
     * In case animation is disabled, we can skip the animation and go straight to the idle state.
     */
    if (disableAnimation) {
      setType(presence ? 'idle' : 'unmounted');
      setActive(presence);
      return;
    }

    setType(presence ? 'entering' : 'exiting');

    /*
     * If the element is not rendered, nothing to do.
     */
    if (!currentElement) {
      return;
    }

    /*
     * Wait for the next frame to ensure the element is rendered and the animation can start.
     */
    setAnimationFrame(() => {
      setActive(presence);

      /*
       * Wait for the next frame to ensure the animation has started.
       */
      setAnimationFrame(() => {
        const duration = getMotionDuration(currentElement);

        if (duration === 0) {
          onFinished();
          return;
        }

        /**
         * Wait for the animation to finish before updating the state.
         * This is an alternative to using the `transitionend` event which can be unreliable as it fires multiple times
         * if the transition has multiple properties.
         */
        setAnimationTimeout(() => onFinished(), duration);
      });
    });

    return () => {
      cancelAnimationFrame();
      clearAnimationTimeout();
    };
    /*
     * Only tracks dependencies that are either not stable or are used in the callbacks
     * This is to avoid re-running the effect on every render, especially when the element is not rendered
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement, disableAnimation, onFinished, presence]);

  return React.useMemo<MotionState<Element>>(
    () => ({
      ref,
      type,
      active,
      canRender: type !== 'unmounted',
      hasInternalMotion: true,
    }),
    // No need to add ref to the deps array as it is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, type],
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
    hasInternalMotion: true,
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
  /**
   * Heads up!
   * This hook returns a Motion but also accepts Motion as an argument.
   * In case the hook is called with a Motion as argument, we don't need to perform the expensive computation of the
   * motion state and can just return the motion value as is. This is intentional as it allows others to use the hook
   * on their side without having to worry about the performance impact of the hook.
   */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useIsMotion(shorthand) ? { ...shorthand, hasInternalMotion: false } : useMotionPresence(shorthand, options);
}

const stringifyShorthand = <Element extends HTMLElement>(value: MotionShorthand<Element>) => {
  return JSON.stringify(value, null, 2);
};

/**
 * @internal
 *
 * This method emits a warning if the hook is called with
 * a different typeof of shorthand on subsequent renders,
 * since this can lead breaking the rules of hooks.
 *
 * It also return a boolean indicating whether the shorthand is a motion object.
 */
export function useIsMotion<Element extends HTMLElement>(
  shorthand: MotionShorthand<Element>,
): shorthand is MotionState<Element> {
  const previousShorthand = usePrevious(shorthand);

  /**
   * Heads up!
   * We don't want these warnings in production even though it is against native behavior
   */
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (previousShorthand !== null && typeof previousShorthand !== typeof shorthand) {
        // eslint-disable-next-line no-console
        console.error(
          [
            'useMotion: The hook needs to be called with the same typeof of shorthand on every render.',
            'This is to ensure the internal state of the hook is stable and can be used to accurately detect the motion state.',
            'Please make sure to not change the shorthand on subsequent renders or to use the hook conditionally.',
            '\nCurrent shorthand:',
            stringifyShorthand(shorthand),
            '\nPrevious shorthand:',
            stringifyShorthand(previousShorthand),
          ].join(' '),
        );
      }
    }, [shorthand, previousShorthand]);
  }
  return typeof shorthand === 'object';
}
