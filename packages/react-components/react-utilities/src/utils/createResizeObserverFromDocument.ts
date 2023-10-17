/**
 * A utility method that creates a ResizeObserver from a target document
 * @param targetDocument - document to use to create the ResizeObserver
 * @param callback  - https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver#callback
 * @returns a ResizeObserver instance or null if the global does not exist on the document
 */
export function createResizeObserverFromDocument(
  targetDocument: Document | null | undefined,
  callback: ResizeObserverCallback,
) {
  if (!targetDocument?.defaultView?.ResizeObserver) {
    return null;
  }

  return new targetDocument.defaultView.ResizeObserver(callback);
}
