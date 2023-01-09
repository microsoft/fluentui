/**
 * @internal
 * Verifies if a given node is an HTMLElement,
 * this method works seamlessly with frames and elements from different documents
 *
 * This is required as simply using `instanceof`
 * might be problematic while operating with [multiple realms](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms)
 *
 */
export function isHTMLElement(element?: unknown): element is HTMLElement {
  const typedElement = element as Node | null | undefined;
  return Boolean(
    typedElement !== null &&
      typedElement?.ownerDocument?.defaultView &&
      typedElement instanceof typedElement.ownerDocument.defaultView.HTMLElement,
  );
}
