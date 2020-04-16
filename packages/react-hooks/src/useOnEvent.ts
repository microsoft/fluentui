import { on } from '@uifabric/utilities';
import { useEffect } from 'react';

/**
 * Hook to attach an event handler on mount and handle cleanup
 * @param element- Element (or ref to an element) to attach the event handler to
 * @param eventName- The event to attach a handler for
 * @param callback- The handler for the event
 * @param useCapture- Whether or not to attach the handler for the capture phase
 */
export function useOnEvent<TElement extends Element>(
  element: React.RefObject<TElement | undefined | null> | TElement | Window | undefined | null,
  eventName: string,
  callback: (ev: Event) => void,
  useCapture?: boolean,
) {
  useEffect(() => {
    if (element && 'current' in element) {
      element = element.current;
    }
    if (!element) {
      return;
    }

    const dispose = on(element, eventName, callback, useCapture);
    return dispose;
  }, [element, eventName, callback, useCapture]);
}
