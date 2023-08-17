import * as React from 'react';

import {
  canUseDOM,
  RefObjectFunction,
  useAnimationFrame,
  useMergedRefs,
  usePrevious,
  useTimeout,
} from '@fluentui/react-utilities';

/**
 * CSS Typed Object Model
 * @see https://drafts.css-houdini.org/css-typed-om-1/
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSUnitValue
 */
interface CSSUnitValue {
  value: number;
  readonly unit: string;
}

/**
 * Style property map read only.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/StylePropertyMapReadOnly
 */
interface StylePropertyMapReadOnly {
  [Symbol.iterator](): IterableIterator<[string, CSSUnitValue[]]>;

  get(property: string): CSSUnitValue | undefined;
  getAll(property: string): CSSUnitValue[];
  has(property: string): boolean;
  readonly size: number;
}

/**
 * HTMLElement with styled map.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/computedStyleMap
 */
type HTMLElementWithStyledMap<T extends HTMLElement = HTMLElement> = T & {
  computedStyleMap(): StylePropertyMapReadOnly;
};

/**
 * CSS with number parsing.
 * @see https://drafts.css-houdini.org/css-typed-om-1/#css
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS/number
 */
type CSSWithNumber = typeof CSS & {
  number(value: number): {
    value: number;
    readonly unit: string;
  };
};

/**
 * @internal
 *
 * Motion props.
 */
export type MotionProps<T = HTMLElement> = {
  /**
   * Whether the element should be present in the DOM.
   *
   * @default false
   */
  presence: boolean;

  /**
   * Ref to the element.
   *
   * @example
   * const motion = useMotion<HTMLDivElement>({ presence: isOpen });
   *
   * <div ref={motion.ref} />
   */
  ref?: RefObjectFunction<T> | React.RefCallback<T> | React.Ref<T>;

  /**
   * Whether the element is currently active in the DOM.
   * Useful to apply CSS transitions only when the element is active.
   *
   * @example
   * const motion = useMotion<HTMLDivElement>({ presence: isOpen });
   *
   * <div ref={motion.ref} className={motion.active ? 'element element-active' : 'element'} />
   */
  active?: boolean;

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
   * const motion = useMotion<HTMLDivElement>({ presence: isOpen });
   *
   * <div ref={motion.ref} className={`element element-${motion.state}`} />
   */
  state?: 'unmounted' | 'entering' | 'entered' | 'idle' | 'exiting' | 'exited';
};

export type MotionOptions = {
  /**
   * Whether to animate the element on first mount.
   *
   * @default false
   */
  animateOnFirstMount?: boolean;
};

/**
 * @internal
 *
 * Returns CSS styles of the given node.
 * @param node - DOM node.
 * @returns - CSS styles.
 */
const getElementComputedStyle = (node: HTMLElement): CSSStyleDeclaration => {
  const win = node.ownerDocument?.defaultView ? node.ownerDocument.defaultView : window;

  if (!win || !canUseDOM()) {
    return {
      getPropertyValue: (_: string) => '',
    } as CSSStyleDeclaration;
  }

  return win.getComputedStyle(node, null);
};

/**
 * Converts a CSS duration string to milliseconds.
 *
 * @param duration - CSS duration string
 * @returns Duration in milliseconds
 */
function toMs(duration: string): number {
  const trimmed = duration.trim();

  if (trimmed.includes('auto')) {
    return 0;
  }

  if (trimmed.includes('ms')) {
    return parseFloat(trimmed);
  }

  return Number(trimmed.slice(0, -1).replace(',', '.')) * 1000;
}

/**
 * Checks if the browser supports CSSOM.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/computedStyleMap
 *
 * @param node - DOM node
 * @returns Whether the browser supports CSSOM
 */
const hasCSSOMSupport = (node: HTMLElementWithStyledMap) => {
  /**
   * As we are using the experimental CSSOM API, we need to check if the browser supports it.
   * The typecast here is to allow the use of the `number` function that is not yet part of the CSSOM typings.
   * @see https://www.npmjs.com/package/@types/w3c-css-typed-object-model-level-1
   */
  return Boolean(typeof CSS !== 'undefined' && (CSS as CSSWithNumber).number && node.computedStyleMap);
};

/**
 *
 * Gets the computed style of a given element.
 * If the browser supports CSSOM, it will return a ComputedStyleMap object.
 * Otherwise, it will return a CSSStyleDeclaration object.
 */
const getCSSStyle = (node: HTMLElementWithStyledMap): CSSStyleDeclaration | StylePropertyMapReadOnly => {
  if (hasCSSOMSupport(node)) {
    return node.computedStyleMap();
  }

  return getElementComputedStyle(node);
};

/**
 * Gets the computed map property for a given element using the CSSOM API.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/computedStyleMap
 *
 * @param computedStyle - Computed style of the element
 * @param prop - CSS property
 * @returns Computed map property
 */
const getComputedMapProp = (computedStyle: StylePropertyMapReadOnly, prop: string): string[] => {
  const props = computedStyle.getAll(prop);

  if (props.length > 0) {
    return props.map(({ value, unit }) => `${value}${unit}`);
  }

  return ['0'];
};

/**
 * Gets the computed style property for a given element using the getComputedStyle API.
 *
 * @param computedStyle - Computed style of the element
 * @param prop - CSS property
 * @returns Computed style property
 */
const getComputedStyleProp = (computedStyle: CSSStyleDeclaration, prop: string): string[] => {
  const propValue = computedStyle.getPropertyValue(prop);

  return propValue ? propValue.split(',') : ['0'];
};

/**
 * Gets the maximum duration from a list of CSS durations.
 *
 * @param durations - List of CSS durations
 * @param delays - List of CSS delays
 * @returns Maximum duration
 */
const getMaxCSSDuration = (durations: string[], delays: string[]): number => {
  const totalProps = Math.max(durations.length, delays.length);
  const totalDurations = [];

  if (totalProps === 0) {
    return 0;
  }

  for (let i = 0; i < totalProps; i++) {
    const duration = toMs(durations[i] || '0');
    const delay = toMs(delays[i] || '0');

    totalDurations.push(duration + delay);
  }

  return Math.max(...totalDurations);
};

/**
 * Gets the motion information for a given element.
 *
 * @param computedStyle - Computed style of the element
 * @returns motion information
 */
const getMotionDuration = (node: HTMLElementWithStyledMap) => {
  const hasModernCSSSupport = hasCSSOMSupport(node);
  const computedStyle = getCSSStyle(node);

  const getProp = (prop: string): string[] => {
    return hasModernCSSSupport
      ? getComputedMapProp(computedStyle as StylePropertyMapReadOnly, prop)
      : getComputedStyleProp(computedStyle as CSSStyleDeclaration, prop);
  };

  const transitionDuration = getMaxCSSDuration(getProp('transition-duration'), getProp('transition-delay'));
  const animationDuration = getMaxCSSDuration(getProp('animation-duration'), getProp('animation-delay'));

  return Math.max(transitionDuration, animationDuration);
};

/**
 * @internal
 *
 * Hook to manage the presence of an element in the DOM based on its CSS transition/animation state.
 *
 * @param present - Whether the element should be present in the DOM
 * @param events - Callbacks for when the element enters or exits the DOM
 */
const useMotionPresence = <T extends HTMLElement>(
  present: boolean,
  options: MotionOptions = {},
): Required<Omit<MotionProps<T>, 'presence'>> => {
  const { animateOnFirstMount } = { animateOnFirstMount: false, ...options };

  const [state, setState] = React.useState<Required<Pick<MotionProps, 'active' | 'state'>>>({
    state: present ? 'idle' : 'unmounted',
    active: false,
  });

  const [currentElement, setCurrentElement] = React.useState<HTMLElementWithStyledMap<T> | null>(null);
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

  const ref: React.RefCallback<HTMLElementWithStyledMap<T>> = React.useCallback(node => {
    if (!node) {
      return;
    }

    setCurrentElement(node);
  }, []);

  React.useEffect(() => {
    if (present) {
      setState(prevState => ({
        ...prevState,
        state: 'entering',
        active: skipAnimationOnFirstRender.current ? true : false,
      }));
    }
  }, [present]);

  React.useEffect(() => {
    const skipAnimation = skipAnimationOnFirstRender.current;
    const onUnmount = () => {
      cancelActiveAnimationFrame();
      cancelDelayedAnimationFrame();
    };

    setActiveAnimationFrame(() => {
      setState(prevState => {
        let newState = prevState.state;

        if (skipAnimation) {
          newState = present ? 'idle' : 'unmounted';
        } else {
          newState = present ? 'entering' : 'exiting';
        }

        return {
          state: newState,
          active: present,
        };
      });
    });

    if (skipAnimation) {
      return onUnmount;
    }

    processAnimation(() => {
      setState(prevState => ({
        ...prevState,
        state: present ? 'entered' : 'exited',
      }));

      setDelayedAnimationFrame(() => {
        setState(prevState => ({
          ...prevState,
          state: present ? 'idle' : 'unmounted',
        }));
      });
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

  return {
    ref,
    ...state,
  };
};

/**
 * @internal
 *
 * Hook to manage the presence of an element in the DOM based on its CSS transition/animation state.
 *
 * @param props - Motion props to manage the presence of an element in the DOM
 * @param options - Motion options to configure the hook
 */
export const useMotion = <T extends HTMLElement>(
  props: MotionProps<T>,
  options?: MotionOptions,
): Required<MotionProps<T>> => {
  const { ref, presence, active, state } = props;
  const previousProps = usePrevious(props);
  const mergedRef = useMergedRefs<T>(ref);

  /**
   * Heads up!
   * We don't want these warnings in production even though it is against native behavior
   */
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (previousProps && Object.keys(props).length !== Object.keys(previousProps).length) {
        // eslint-disable-next-line no-console
        console.error(
          [
            'useMotion: The hook needs to be called with the same amount of props on every render.',
            'This is to ensure the internal state of the hook is stable and can be used to accurately detect the motion state.',
            'Please make sure to not change the props on subsequent renders or to use the hook conditionally.',
            '\nCurrent props:',
            JSON.stringify(props, null, 2),
            '\nPrevious props:',
            JSON.stringify(previousProps, null, 2),
          ].join(' '),
        );
      }
    }, [props, previousProps]);
  }

  if (typeof ref !== 'undefined' && typeof state !== 'undefined') {
    const isMounted = state !== 'unmounted';

    return {
      ref: mergedRef,
      state,
      presence: presence ?? isMounted,
      active: active ?? (isMounted && state !== 'exited'),
    };
  }

  if (process.env.NODE_ENV !== 'production') {
    if (typeof presence === 'undefined') {
      throw new Error('useMotion: The hook needs either a `ref` and `state` or `presence` prop to work.');
    }
  }

  const isPresent = !!presence;
  /**
   * Heads up!
   * This hook returns a MotionProps but also accepts MotionProps as an argument.
   * In case the hook is called with a MotionProps argument, we don't need to perform the expensive computation of the
   * motion state and can just return the props as is. This is intentional as it allows others to use the hook on their
   * side without having to worry about the performance impact of the hook.
   */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref: motionRef, ...motionPresence } = useMotionPresence(isPresent, options);

  return {
    presence: isPresent,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ref: useMergedRefs<T>(ref, motionRef as RefObjectFunction<T>),
    active: motionPresence.active,
    state: motionPresence.state,
  };
};
