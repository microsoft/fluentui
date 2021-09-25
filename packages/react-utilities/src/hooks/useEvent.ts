import * as React from 'react';

/**
 * Hook used to add and remove an event from an element.
 *
 * @param element - The element to listen to
 * @param eventName - The event to watch
 * @param callback - The callback to call when the eventName is triggered
 * @param useCapture - Whether the events should be dispatched to the callback first before other EventTargets
 */
export const useEvent = <T>(
  element: Element | Window | Document | undefined,
  type: string,
  callback: (ev: T) => void,
  useCapture?: boolean,
) => {
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;

  React.useEffect(() => {
    if (element) {
      element.addEventListener(type, (callback as unknown) as (ev: Event) => void, useCapture);
      return () => element.removeEventListener(type, (callback as unknown) as (ev: Event) => void, useCapture);
    }
  }, [element, type, callback, useCapture]);
};
