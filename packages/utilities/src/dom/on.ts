import * as React from 'react';

export function on(
  element: Element | Window,
  eventName: string,
  callback: (ev: Event | React.SyntheticEvent<any, Event>) => void,
  options?: boolean,
): () => void {
  element.addEventListener(eventName, callback, options);

  return () => element.removeEventListener(eventName, callback, options);
}
