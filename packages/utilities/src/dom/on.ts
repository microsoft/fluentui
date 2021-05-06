export function on(
  element: Element | Window | Document,
  eventName: string,
  callback: (ev: Event) => void,
  options?: boolean,
): () => void {
  element.addEventListener(eventName, callback, options);

  return () => element.removeEventListener(eventName, callback, options);
}
