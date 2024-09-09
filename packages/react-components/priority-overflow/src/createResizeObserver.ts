/**
 * Helper function that creates a resize observer in the element's own window global
 * @param elementToObserve - Uses the element's window global to create the resize observer
 * @param callback
 * @returns function to cleanup the resize observer
 */
export function observeResize(elementToObserve: HTMLElement, callback: ResizeObserverCallback) {
  const GlobalResizeObserver = elementToObserve.ownerDocument.defaultView?.ResizeObserver;

  if (!GlobalResizeObserver) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('@fluentui/priority-overflow', 'ResizeObserver does not exist on container window');
    }
    return () => null;
  }

  let resizeObserver: InstanceType<typeof GlobalResizeObserver> | undefined = new GlobalResizeObserver(callback);
  resizeObserver.observe(elementToObserve);

  return () => {
    resizeObserver?.disconnect();
    resizeObserver = undefined;
  };
}
