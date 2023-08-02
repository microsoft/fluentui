import * as React from 'react';
import { useTimeout } from '@fluentui/react-utilities';

const noop = () => null;

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
   * Whether the element is visible in the DOM.
   * This is true when the element is already rendered and transitioning from being hidden to visible.
   */
  visible: boolean;

  /**
   * Whether the element is entering the DOM.
   * This is true when the element is transitioning from not being rendered to being rendered.
   */
  entering: boolean;

  /**
   * Whether the element is exiting the DOM.
   * This is true when the element is transitioning from being rendered to not being rendered.
   */
  exiting: boolean;

  /**
   * Whether the element is animating.
   * This is true when the element is entering or exiting the DOM.
   */
  animating: boolean;
};

/**
 * Events for useMotionPresence hook.
 */
export type UseMotionPresenceEvents = {
  /**
   * Callback for after the element enters the DOM.
   */
  onEntered?: () => void;

  /**
   * Callback for after the element exits the DOM.
   */
  onExited?: () => void;
};

/**
 * Returns CSS styles of the given node.
 * @param node - DOM node.
 * @returns - CSS styles.
 */
const getElementComputedStyle = (node: HTMLElement): Partial<CSSStyleDeclaration> => {
  if (node.nodeType !== 1) {
    return {
      getPropertyValue: () => '',
    };
  }

  const window = node.ownerDocument?.defaultView;

  return window!.getComputedStyle(node, null);
};

/**
 * @internal
 * Converts a CSS duration string to milliseconds.
 *
 * @param s - CSS duration string
 * @returns Duration in milliseconds
 */
function toMs(s: string): number {
  if (s.includes('auto')) {
    return 0;
  }

  if (s.includes('ms')) {
    return parseFloat(s);
  }

  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

/**
 * @internal
 * Gets the maximum duration from a list of CSS durations.
 *
 * @param durations - List of CSS durations
 * @returns Maximum duration
 */
const getMaxCSSDuration = (durations: string[]) => {
  return Math.max(...durations.map(d => toMs(d.trim())));
};

/**
 * @internal
 * Gets the motion information for a given element.
 *
 * @param computedStyle - Computed style of the element
 * @returns motion information
 */
const getMotionInfo = (computedStyle: CSSStyleDeclaration) => {
  const getProp = (prop: string) => (computedStyle?.getPropertyValue(prop) || '').split(',');

  const transitionDuration = getProp('transition-duration');
  const transitionDelay = getProp('transition-delay');
  const animationDuration = getProp('animation-duration');
  const animationDelay = getProp('animation-delay');
  const totalTransitionDuration = getMaxCSSDuration(transitionDuration) + getMaxCSSDuration(transitionDelay);
  const totalAnimationDuration = getMaxCSSDuration(animationDuration) + getMaxCSSDuration(animationDelay);

  const hasAnimation = totalAnimationDuration > 0;
  const hasTransition = totalTransitionDuration > 0;

  return {
    duration: Math.max(totalTransitionDuration, totalAnimationDuration),
    hasAnimation,
    hasTransition,
  };
};

/**
 * Hook to manage the presence of an element in the DOM based on its CSS transition/animation state.
 *
 * @param present - Whether the element should be present in the DOM
 * @param events - Callbacks for when the element enters or exits the DOM
 */
export const useMotionPresence = <TElement extends HTMLElement>(
  present: boolean,
  events?: UseMotionPresenceEvents,
): UseMotionPresenceState<TElement> => {
  const { onEntered = noop, onExited = noop } = events || {};

  const [shouldRender, setShouldRender] = React.useState(present);
  const [visible, setVisible] = React.useState(false);
  const [entering, setEntering] = React.useState(false);
  const [exiting, setExiting] = React.useState(false);
  const animating = entering || exiting;

  const [currentElement, setCurrentElement] = React.useState<TElement | null>(null);

  const [setAnimationTimeout, clearAnimationTimeout] = useTimeout();

  const computedStylesRef = React.useRef<CSSStyleDeclaration>({} as CSSStyleDeclaration);
  const ref: React.RefCallback<TElement> = React.useCallback(node => {
    if (!node) {
      return;
    }

    computedStylesRef.current = getElementComputedStyle(node) as CSSStyleDeclaration;
    setCurrentElement(node);
  }, []);

  const notCurrentElement = React.useCallback((target: TElement) => target !== currentElement, [currentElement]);

  const onFinishedMotion = React.useCallback(() => {
    setEntering(false);
    setExiting(false);
  }, []);

  const onStartEntering = React.useCallback(() => {
    setEntering(true);
    setVisible(true);
  }, []);

  const onFinishedEntering = React.useCallback(() => {
    onFinishedMotion();
    onEntered();
  }, [onEntered, onFinishedMotion]);

  const onStartExiting = React.useCallback(() => {
    setExiting(true);
  }, []);

  const onFinishedExiting = React.useCallback(() => {
    onFinishedMotion();
    setVisible(false);
    setShouldRender(false);
    onExited();
  }, [onExited, onFinishedMotion]);

  const onMotionCanceled = React.useCallback(
    ({ target }) => {
      if (notCurrentElement(target)) {
        return;
      }

      onFinishedMotion();
      setVisible(present);
      setShouldRender(present);
    },
    [notCurrentElement, onFinishedMotion, present],
  );

  React.useEffect(() => {
    if (present) {
      setShouldRender(true);
    }
  }, [present]);

  React.useEffect(() => {
    currentElement?.addEventListener('transitioncancel', onMotionCanceled);
    currentElement?.addEventListener('animationcancel', onMotionCanceled);

    return () => {
      currentElement?.removeEventListener('transitioncancel', onMotionCanceled);
      currentElement?.removeEventListener('animationcancel', onMotionCanceled);
    };
  }, [currentElement, onMotionCanceled]);

  React.useEffect(() => {
    if (!currentElement) {
      return;
    }

    const { duration, hasTransition, hasAnimation } = getMotionInfo(computedStylesRef.current);

    const animationFrame = requestAnimationFrame(() => {
      setVisible(present);

      if (!hasTransition && !hasAnimation) {
        setShouldRender(present);
      } else {
        if (present) {
          onStartEntering();
        } else {
          onStartExiting();
        }

        /**
         * Use CSS transition duration + 1ms to ensure the animation has finished on both enter and exit states.
         * This is an alternative to using the `transitionend` event which can be unreliable as it fires multiple times
         * if the transition has multiple properties.
         */
        setAnimationTimeout(() => {
          if (present) {
            onFinishedEntering();
          } else {
            onFinishedExiting();
          }
        }, duration + 1);
      }
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      clearAnimationTimeout();
    };
  }, [
    currentElement,
    onFinishedExiting,
    onFinishedEntering,
    present,
    onStartEntering,
    onStartExiting,
    setAnimationTimeout,
    clearAnimationTimeout,
  ]);

  return {
    ref,
    shouldRender,
    visible,
    entering,
    exiting,
    animating,
  };
};
