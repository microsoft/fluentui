/**
 * Adds and removes a given event listener on an element.
 *
 * @param element the element to listen to.
 * @param eventName the event to watch.
 * @param callback the callback to call when the eventName is triggered.
 * @param useCapture whether the events should be dispatched to the callback first before other EventTargets.
 *
 * This should be replaced with a `useEvent` hook.
 */
export const on = <T>(
  element: Element | Window | Document,
  eventName: string,
  callback: (ev: T) => void,
  useCapture?: boolean,
) => {
  element.addEventListener(eventName, (callback as unknown) as (ev: Event) => void, useCapture);
  return () => element.removeEventListener(eventName, (callback as unknown) as (ev: Event) => void, useCapture);
};
