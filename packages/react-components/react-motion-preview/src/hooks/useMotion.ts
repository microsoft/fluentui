import * as React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { HTMLElementWithStyledMap, getMotionDuration } from '../utils/dom-style';
import { useAnimationFrame, useTimeout, usePrevious } from '@fluentui/react-utilities';

export type MotionOptions = {
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

  const [type, setType] = React.useState<MotionType>(presence ? 'idle' : 'unmounted');
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
    if (presence) {
      unstable_batchedUpdates(() => {
        setType('entering');
        setActive(skipAnimationOnFirstRender.current ? true : false);
      });
    }
  }, [presence]);

  React.useEffect(() => {
    const skipAnimation = skipAnimationOnFirstRender.current;
    const onUnmount = () => {
      cancelActiveAnimationFrame();
      cancelDelayedAnimationFrame();
    };

    setActiveAnimationFrame(() => {
      unstable_batchedUpdates(() => {
        setActive(presence);
        setType(() => {
          if (skipAnimation) {
            return presence ? 'idle' : 'unmounted';
          }

          return presence ? 'entering' : 'exiting';
        });
      });
    });

    if (skipAnimation) {
      return onUnmount;
    }

    processAnimation(() => {
      setType(presence ? 'entered' : 'exited');
      setDelayedAnimationFrame(() => setType(presence ? 'idle' : 'unmounted'));
    });

    return onUnmount;
  }, [
    cancelActiveAnimationFrame,
    cancelDelayedAnimationFrame,
    presence,
    processAnimation,
    setActiveAnimationFrame,
    setDelayedAnimationFrame,
  ]);

  React.useEffect(() => {
    skipAnimationOnFirstRender.current = false;
  }, []);

  return React.useMemo<MotionState<Element>>(
    () => ({
      ref,
      type,
      active,
      canRender: type !== 'unmounted',
    }),
    [active, ref, type],
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
  /**
   * Heads up!
   * This hook returns a Motion but also accepts Motion as an argument.
   * In case the hook is called with a Motion as argument, we don't need to perform the expensive computation of the
   * motion state and can just return the motion value as is. This is intentional as it allows others to use the hook
   * on their side without having to worry about the performance impact of the hook.
   */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useIsMotion(shorthand) ? shorthand : useMotionPresence(shorthand, options);
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
