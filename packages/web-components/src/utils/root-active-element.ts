// returns the active element in the shadow context of the element in question.
export function getRootActiveElement(element: Element): Element | null {
  const rootNode = element.getRootNode();

  if (rootNode instanceof ShadowRoot) {
    return rootNode.activeElement;
  }

  return document.activeElement;
}
