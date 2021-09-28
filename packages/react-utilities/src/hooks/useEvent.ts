import * as React from 'react';

/**
 * Hook used to add and remove an event from an element.
 *
 * @param element - The element to listen to.
 * @param eventName - The event to watch.
 * @param callback - The callback to call when the eventName is triggered.
 * @param useCapture - Whether the events should be dispatched to the callback first before other EventTargets.
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
      const currentCallback = (((ev: T) => callbackRef.current(ev)) as unknown) as EventListenerOrEventListenerObject;
      element.addEventListener(type, currentCallback, useCapture);
      return () => element.removeEventListener(type, currentCallback, useCapture);
    }
  }, [element, type, useCapture]);
};
