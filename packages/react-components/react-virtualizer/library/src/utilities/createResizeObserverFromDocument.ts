/**
 * FIXME - TS 3.8/3.9 don't have ResizeObserver types by default, move this to a shared utility once we bump the minbar
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
