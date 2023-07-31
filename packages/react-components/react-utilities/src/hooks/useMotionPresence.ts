import * as React from 'react';
import { useTimeout } from './useTimeout';

/**
 * CSS Typed Object Model
 * @see https://drafts.css-houdini.org/css-typed-om-1/
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSUnitValue
 */
interface CSSUnitValue {
  value: number;
  readonly unit: string;
}

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
interface HTMLElementWithStyledMap extends HTMLElement {
  computedStyleMap(): StylePropertyMapReadOnly;
}

interface CSSWithNumber {
  number(value: number): {
    value: number;
    readonly unit: string;
  };
}

/**
 * State for useMotionPresence hook.
 */
export type UseMotionPresenceState<TElement extends HTMLElement> = {
  /**
   * Ref to the element.
   */
  ref: React.RefCallback<TElement>;

  /**
   * Whether the element should be rendered in the DOM.
   * This should be used to conditionally render the element.
   */
  shouldRender: boolean;

  /**
   * Whether the element is currently visible in the DOM.
   */
  visible: boolean;

  /**
   * Current state of the element.
   *
   * - `entering` - The element is entering the DOM.
   * - `exiting` - The element is exiting the DOM.
   * - `resting` - The element is currently not animating. This is the final and initial state of the element.
   * - `unmounted` - The element is not rendered in the DOM.
   */
  motionState: 'entering' | 'exiting' | 'resting' | 'unmounted';
};

/**
 * Options for useMotionPresence hook.
 */
export type UseMotionPresenceOptions = {
  /**
   * Whether to animate the element on first mount.
   *
   * @default false
   */
  animateOnFirstMount?: boolean;
};

/**
 * Returns CSS styles of the given node.
 * @param node - DOM node.
 * @returns - CSS styles.
 */
const getElementComputedStyle = (node: HTMLElement): CSSStyleDeclaration => {
  const window = node.ownerDocument?.defaultView;

  return window!.getComputedStyle(node, null);
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
  return Boolean(typeof CSS !== 'undefined' && (CSS as unknown as CSSWithNumber).number && node.computedStyleMap);
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

  return Array.isArray(propValue) ? propValue.split(',') : ['0'];
};

/**
 * Gets the maximum duration from a list of CSS durations.
 *
 * @param durations - List of CSS durations
 * @param delays - List of CSS delays
 * @returns Maximum duration
 */
const getMaxCSSDuration = (durations: string[], delays: string[]): number => {
  const totalDurations: number[] = [];

  durations.forEach(duration => {
    totalDurations.push(toMs(duration.trim()));
  });

  delays.forEach((delay, index) => {
    const parsedDelay = toMs(delay.trim());

    if (totalDurations[index]) {
      totalDurations[index] = totalDurations[index] + parsedDelay;
    } else {
      totalDurations[index] = parsedDelay;
    }
  });

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
 * Hook to manage the presence of an element in the DOM based on its CSS transition/animation state.
 *
 * @param present - Whether the element should be present in the DOM
 * @param events - Callbacks for when the element enters or exits the DOM
 */
export const useMotionPresence = <TElement extends HTMLElement>(
  present: boolean,
  { animateOnFirstMount = false }: UseMotionPresenceOptions = {},
): UseMotionPresenceState<TElement> => {
  const [state, setState] = React.useState<Omit<UseMotionPresenceState<TElement>, 'ref'>>({
    shouldRender: present,
    motionState: present ? 'resting' : 'unmounted',
    visible: false,
  });

  const [currentElement, setCurrentElement] = React.useState<HTMLElementWithStyledMap | null>(null);
  const [setAnimationTimeout, clearAnimationTimeout] = useTimeout();

  const processAnimation = React.useCallback(
    (callback: () => void) => {
      if (!currentElement) {
        return;
      }

      clearAnimationTimeout();
      const animationFrame = requestAnimationFrame(() => {
        const duration = getMotionDuration(currentElement);

        /**
         * Use CSS transition duration + 1ms to ensure the animation has finished on both enter and exit states.
         * This is an alternative to using the `transitionend` event which can be unreliable as it fires multiple times
         * if the transition has multiple properties.
         */
        setAnimationTimeout(() => callback(), duration + 1);
      });

      return () => {
        clearAnimationTimeout();
        cancelAnimationFrame(animationFrame);
      };
    },
    [clearAnimationTimeout, currentElement, setAnimationTimeout],
  );

  const ref: React.RefCallback<TElement> = React.useCallback(node => {
    if (!node) {
      return;
    }

    // Cast to HTMLElementWithStyledMap to allow the use of the experimental CSSOM API.
    setCurrentElement(node as unknown as HTMLElementWithStyledMap);
  }, []);

  React.useEffect(() => {
    if (present) {
      setState({
        shouldRender: true,
        visible: false,
        motionState: 'resting',
      });
    }
  }, [present]);

  React.useEffect(() => {
    if (!animateOnFirstMount && present) {
      setState(prevState => ({
        ...prevState,
        visible: true,
      }));
    }
    /*
     * We only want to run this effect on first mount to make sure the element doesn't animate.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!currentElement) {
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      setState(prevState => ({
        ...prevState,
        visible: present,
        motionState: present ? 'entering' : 'exiting',
      }));
    });

    processAnimation(() => {
      setState(prevState => ({
        ...prevState,
        motionState: 'resting',
      }));
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [currentElement, present, processAnimation]);

  React.useEffect(() => {
    if (state.motionState === 'exiting') {
      processAnimation(() => {
        setState({
          shouldRender: false,
          visible: false,
          motionState: 'unmounted',
        });
      });
    }
  }, [processAnimation, state.motionState]);

  return {
    ref,
    ...state,
  };
};
