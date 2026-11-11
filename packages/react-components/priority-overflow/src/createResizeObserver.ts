/**
 * Helper function that creates a resize observer in the element's own window global
 * @param elementToObserve - Uses the element's window global to create the resize observer
 * @param callback
 * @returns function to cleanup the resize observer
 */
export function observeResize(elementToObserve: HTMLElement, callback: ResizeObserverCallback): () => void {
  const view = elementToObserve.ownerDocument.defaultView;
  const GlobalResizeObserver = view && view.ResizeObserver;

  if (!GlobalResizeObserver) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('@fluentui/priority-overflow', 'ResizeObserver does not exist on container window');
    }
    return () => null;
  }

  const resizeObserver = new GlobalResizeObserver(callback);
  resizeObserver.observe(elementToObserve);

  return () => {
    resizeObserver.disconnect();
  };
}
