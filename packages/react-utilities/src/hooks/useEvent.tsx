import * as React from 'react';

type UseEvent = {
  /**
   * The element to listen to.
   */
  element: Element | Window | Document;

  /**
   * The event type to watch.
   */
  type: string;

  /**
   * The callback to call when the eventName is triggered.
   */
  callback: (ev: T) => void;

  /**
   * Whether the events should be dispatched to the callback first before other EventTargets.
   */
  useCapture: boolean;

  /**
   * whether event should be disabled and removed
   */
  disabled: boolean;
};

/**
 * Hook used to add and remove a event from an element.
 *
 * @param element the element to listen to.
 * @param type the event to watch.
 * @param callback the callback to call when the eventName is triggered.
 * @param useCapture whether the events should be dispatched to the callback first before other EventTargets.
 * @param disabled whether event should be disabled and removed
 */
const useEvent = ({ element, type, callback, useCapture, disabled }: UseEvent) => {
  React.useEffect(() => {
    if (element) {
      !disabled && element.addEventListener(type, callback, useCapture);
      return () => element.removeEventListener(type, callback, useCapture);
    }
  }, [element, type, callback, disabled, useCapture]);
};
