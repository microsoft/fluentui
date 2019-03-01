export function on<T>(element: T, eventName: string, callback: (ev: EventArgs) => void, options?: boolean | EventOptions): () => void {
  element.addEventListener(eventName, callback, options);

  return () => element.removeEventListener(eventName, callback, options);
}
