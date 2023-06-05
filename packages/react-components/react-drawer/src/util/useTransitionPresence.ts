import * as React from 'react';

const noop = () => ({});

export type UseTransitionPresenceState<TElement = HTMLElement> = {
  ref: React.RefCallback<TElement>;
  shouldRender: boolean;
  visible: boolean;
  entering: boolean;
  exiting: boolean;
  animating: boolean;
};

export type UseTransitionPresenceEvents = {
  onEntered?: () => void;
  onExited?: () => void;
};

function toMs(s: string): number {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

const getMaxCssDuration = (durations: string[]) => {
  return Math.max(
    ...durations.map(d => {
      const trimmed = d.trim();

      if (d.includes('ms')) {
        return parseFloat(trimmed);
      }

      return toMs(trimmed);
    }),
  );
};

const getTransitionInfo = (computedStyle: CSSStyleDeclaration) => {
  const getProp = (prop: string) => (computedStyle.getPropertyValue(prop) || '').split(',');

  const durations = getProp('transition-duration');
  const delays = getProp('transition-delay');

  const totalDuration = getMaxCssDuration(durations) + getMaxCssDuration(delays);

  return {
    count: durations.length,
    duration: totalDuration,
    hasTransition: totalDuration > 0,
  };
};

/**
 * Hook to manage the presence of an element in the DOM based on its CSS transition state.
 *
 * @param present - Whether the element should be present in the DOM
 * @param events - Callbacks for when the element enters or exits the DOM - Only called when
 * the element has a transition
 */
export const useTransitionPresence = <TElement extends HTMLElement>(
  present: boolean,
  events?: UseTransitionPresenceEvents,
): UseTransitionPresenceState<TElement> => {
  const { onEntered = noop, onExited = noop } = events || {};

  const [shouldRender, setShouldRender] = React.useState(present);
  const [visible, setVisible] = React.useState(false);
  const [entering, setEntering] = React.useState(false);
  const [exiting, setExiting] = React.useState(false);
  const animating = entering || exiting;

  const [currentElement, setCurrentElement] = React.useState<TElement | null>(null);

  const ref: React.RefCallback<TElement> = React.useCallback(node => {
    if (!node) {
      return;
    }

    setCurrentElement(node);
  }, []);

  const notCurrentElement = React.useCallback((target: TElement) => target !== currentElement, [currentElement]);

  const onEntering = React.useCallback(() => {
    setEntering(true);
    setVisible(true);
  }, []);

  const onExiting = React.useCallback(() => {
    setExiting(true);
  }, []);

  const onFinishedAnimating = React.useCallback(() => {
    setEntering(false);
    setExiting(false);
  }, []);

  const onEnterAnimationEnd = React.useCallback(() => {
    onFinishedAnimating();
    onEntered();
  }, [onEntered, onFinishedAnimating]);

  const onExitAnimationEnd = React.useCallback(() => {
    onFinishedAnimating();
    setVisible(false);
    setShouldRender(false);
    onExited();
  }, [onExited, onFinishedAnimating]);

  const onCanceled = React.useCallback(
    ({ target }) => {
      if (notCurrentElement(target)) {
        return;
      }

      onFinishedAnimating();
      setVisible(present);
      setShouldRender(present);
    },
    [notCurrentElement, onFinishedAnimating, present],
  );

  React.useEffect(() => {
    if (present) {
      setShouldRender(true);
    }
  }, [present]);

  React.useEffect(() => {
    currentElement?.addEventListener('transitioncancel', onCanceled);

    return () => currentElement?.removeEventListener('transitioncancel', onCanceled);
  }, [currentElement, onCanceled]);

  React.useEffect(() => {
    if (!currentElement) {
      return;
    }

    let timeout: number | undefined;

    const styles = window?.getComputedStyle(currentElement);
    const { duration, hasTransition } = getTransitionInfo(styles);

    const animationFrame = requestAnimationFrame(() => {
      setVisible(present);

      if (!hasTransition) {
        setShouldRender(present);
      } else {
        if (present) {
          onEntering();
        } else {
          onExiting();
        }

        /**
         * Use CSS transition duration + 1ms to ensure the animation has finished on both enter and exit states.
         * This is an alternative to using the `transitionend` event which can be unreliable as it fires multiple times
         * if the transition has multiple properties.
         */
        timeout = setTimeout(() => {
          if (present) {
            onEnterAnimationEnd();
          } else {
            onExitAnimationEnd();
          }
        }, duration + 1);
      }
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [currentElement, onExitAnimationEnd, onEnterAnimationEnd, present, onEntering, onExiting]);

  return {
    ref,
    shouldRender,
    visible,
    entering,
    exiting,
    animating,
  };
};
