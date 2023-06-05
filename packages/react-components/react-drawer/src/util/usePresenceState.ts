import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

const noop = () => ({});

export type UsePresenceStateEvents = {
  onEnter?: () => void;
  onExit?: () => void;
};

function getMaxTransitionDuration(transitionDuration: string) {
  if (!transitionDuration) {
    return 0;
  }

  const durations = transitionDuration.split(',').map(duration => {
    const trimmed = duration.trim();
    const parsed = parseFloat(trimmed);

    if (duration.includes('ms')) {
      return parsed;
    }

    return parsed * 1000;
  });

  return Math.max(...durations);
}

/**
 * Hook to manage the presence of an element in the DOM.
 *
 * @param open - Whether the element should be present in the DOM
 * @param events - Callbacks for when the element enters or exits the DOM
 */
export const usePresenceState = (open: boolean, events?: UsePresenceStateEvents) => {
  const { onEnter = noop, onExit = noop } = events || {};

  const [shouldRender, setShouldRender] = React.useState(open);
  const [mounted, setMounted] = React.useState(false);
  const [entering, setEntering] = React.useState(false);
  const [exiting, setExiting] = React.useState(false);
  const animating = entering || exiting;

  const [currentElement, setCurrentElement] = React.useState<HTMLElement | null>(null);

  const ref = React.useCallback(node => {
    if (!node) {
      return;
    }

    setCurrentElement(node);
  }, []);

  const notCurrentElement = React.useCallback((target: HTMLElement) => target !== currentElement, [currentElement]);

  const onStart = React.useCallback(
    ({ target }) => {
      if (notCurrentElement(target)) {
        return;
      }

      if (open) {
        setEntering(true);
      } else {
        setExiting(true);
      }
    },
    [notCurrentElement, open],
  );

  const onEnd = React.useCallback(
    ({ target }) => {
      if (notCurrentElement(target)) {
        return;
      }

      if (open) {
        setEntering(false);
        onEnter();
      } else {
        setExiting(false);
        setShouldRender(false);
        onExit();
      }
    },
    [notCurrentElement, onEnter, onExit, open],
  );

  const onCanceled = React.useCallback(
    ({ target }) => {
      if (notCurrentElement(target)) {
        return;
      }

      setEntering(false);
      setExiting(false);
      setShouldRender(open);
      setMounted(open);
    },
    [notCurrentElement, open],
  );

  useIsomorphicLayoutEffect(() => {
    if (!currentElement) {
      return;
    }

    currentElement.addEventListener('transitionstart', onStart);
    currentElement.addEventListener('transitionend', onEnd);
    currentElement.addEventListener('transitioncancel', onCanceled);

    return () => {
      if (!currentElement) {
        return;
      }

      currentElement.removeEventListener('transitionstart', onStart);
      currentElement.removeEventListener('transitionend', onEnd);
      currentElement.removeEventListener('transitioncancel', onCanceled);
    };
  }, [currentElement, onCanceled, onEnd, onStart]);

  React.useEffect(() => {
    if (open) {
      setShouldRender(true);
    } else {
      if (currentElement) {
        const { transitionDuration } = window?.getComputedStyle(currentElement);
        const hasTransition = getMaxTransitionDuration(transitionDuration) > 0;

        if (!hasTransition) {
          setShouldRender(false);
        }
      } else {
        setShouldRender(false);
      }
    }

    requestAnimationFrame(() => setMounted(open));
  }, [currentElement, open]);

  return {
    ref,
    shouldRender,
    mounted,
    entering,
    exiting,
    animating,
  };
};
