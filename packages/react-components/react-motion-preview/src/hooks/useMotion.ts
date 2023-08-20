import * as React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { HTMLElementWithStyledMap, getMotionDuration } from '../utils/style';
import { useAnimationFrame, useTimeout } from '@fluentui/react-utilities';
import { useIsMotion } from './useIsMotion';

export type UseMotionOptions = {
  /**
   * Whether to animate the element on first mount.
   *
   * @default false
   */
  animateOnFirstMount?: boolean;
};

export type MotionType = 'unmounted' | 'entering' | 'entered' | 'idle' | 'exiting' | 'exited';

export type MotionState<Element extends HTMLElement = HTMLElement> = {
  /**
   * Ref to the element.
   *
   * @example
   * ```tsx
   * const motion = useMotion<HTMLDivElement>(isOpen);
   *
   * <div ref={motion.ref} />
   * ```
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
   *
   * @example
   * ```tsx
   * const motion = useMotion<HTMLDivElement>(isOpen);
   *
   * <div ref={motion.ref} className={`element element-${motion.state}`} />
   * ```
   */
  type: MotionType;

  isActive(): boolean;
  isVisible(): boolean;
};

export type MotionShorthandValue = boolean;

export type MotionShorthand<Element extends HTMLElement = HTMLElement> = MotionShorthandValue | MotionState<Element>;

/**
 * @internal
 *
 * Hook to manage the presence of an element in the DOM based on its CSS transition/animation state.
 *
 * @param present - Whether the element should be present in the DOM
 * @param events - Callbacks for when the element enters or exits the DOM
 */
export function useMotionPresence<Element extends HTMLElement>(
  present: boolean,
  options: UseMotionOptions = {},
): MotionState<Element> {
  const { animateOnFirstMount } = { animateOnFirstMount: false, ...options };

  const [type, setType] = React.useState<MotionType>(present ? 'idle' : 'unmounted');
  const [active, setActive] = React.useState<boolean>(false);

  const [currentElement, setCurrentElement] = React.useState<HTMLElementWithStyledMap<Element> | null>(null);
  const [setAnimationTimeout, clearAnimationTimeout] = useTimeout();
  const [setActiveAnimationFrame, cancelActiveAnimationFrame] = useAnimationFrame();
  const [setProcessingAnimationFrame, cancelProcessingAnimationFrame] = useAnimationFrame();
  const [setDelayedAnimationFrame, cancelDelayedAnimationFrame] = useAnimationFrame();
  const skipAnimationOnFirstRender = React.useRef(!animateOnFirstMount);

  const processAnimation = React.useCallback(
    (callback: () => void) => {
      const targetElement = currentElement;

      if (!targetElement) {
        return;
      }

      clearAnimationTimeout();
      cancelProcessingAnimationFrame();
      setProcessingAnimationFrame(() => {
        const duration = getMotionDuration(targetElement);

        if (duration === 0) {
          callback();
          return;
        }

        /**
         * Use CSS transition duration + 1ms to ensure the animation has finished on both enter and exit states.
         * This is an alternative to using the `transitionend` event which can be unreliable as it fires multiple times
         * if the transition has multiple properties.
         */
        setAnimationTimeout(() => callback(), duration + 1);
      });

      return () => {
        clearAnimationTimeout();
        cancelProcessingAnimationFrame();
      };
    },
    [
      cancelProcessingAnimationFrame,
      clearAnimationTimeout,
      currentElement,
      setAnimationTimeout,
      setProcessingAnimationFrame,
    ],
  );

  const ref: React.RefCallback<HTMLElementWithStyledMap<Element>> = React.useCallback(node => {
    if (!node) {
      return;
    }

    setCurrentElement(node);
  }, []);

  React.useEffect(() => {
    if (present) {
      unstable_batchedUpdates(() => {
        setType('entering');
        setActive(skipAnimationOnFirstRender.current ? true : false);
      });
    }
  }, [present]);

  React.useEffect(() => {
    const skipAnimation = skipAnimationOnFirstRender.current;
    const onUnmount = () => {
      cancelActiveAnimationFrame();
      cancelDelayedAnimationFrame();
    };

    setActiveAnimationFrame(() => {
      unstable_batchedUpdates(() => {
        setActive(present);
        setType(() => {
          if (skipAnimation) {
            return present ? 'idle' : 'unmounted';
          }

          return present ? 'entering' : 'exiting';
        });
      });
    });

    if (skipAnimation) {
      return onUnmount;
    }

    processAnimation(() => {
      setType(present ? 'entered' : 'exited');
      setDelayedAnimationFrame(() => setType(present ? 'idle' : 'unmounted'));
    });

    return onUnmount;
  }, [
    cancelActiveAnimationFrame,
    cancelDelayedAnimationFrame,
    present,
    processAnimation,
    setActiveAnimationFrame,
    setDelayedAnimationFrame,
  ]);

  React.useEffect(() => {
    skipAnimationOnFirstRender.current = false;
  }, []);

  return React.useMemo(() => {
    const isVisible = () => type !== 'unmounted';
    const isActive = () => active;

    return {
      ref,
      type,
      isVisible,
      isActive,
    };
  }, [active, ref, type]);
}

/**
 * @internal
 *
 * Hook to manage the presence of an element in the DOM based on its CSS transition/animation state.
 *
 * @param props - Motion props to manage the presence of an element in the DOM
 * @param options - Motion options to configure the hook
 */
export function useMotion<Element extends HTMLElement>(
  shorthand: MotionShorthand<Element>,
  options?: UseMotionOptions,
): MotionState<Element> {
  /**
   * Heads up!
   * This hook returns a Motion but also accepts Motion as an argument.
   * In case the hook is called with a Motion as argument, we don't need to perform the expensive computation of the
   * motion state and can just return the motion as is. This is intentional as it allows others to use the hook on their
   * side without having to worry about the performance impact of the hook.
   */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useIsMotion(shorthand) ? shorthand : useMotionPresence(shorthand, options);
}
