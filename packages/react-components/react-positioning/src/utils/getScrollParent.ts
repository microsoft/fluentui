/**
 * Returns the parent node or the host of the node argument.
 * @param node - DOM node.
 * @returns - parent DOM node.
 */
export const getParentNode = (node: HTMLElement): HTMLElement => {
  if (node.nodeName === 'HTML') {
    return node;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return node.parentNode || (node as any).host;
};

/**
 * Returns CSS styles of the given node.
 * @param node - DOM node.
 * @returns - CSS styles.
 */
const getStyleComputedProperty = (node: HTMLElement): Partial<CSSStyleDeclaration> => {
  if (node.nodeType !== 1) {
    return {};
  }

  const window = node.ownerDocument?.defaultView;
  return window!.getComputedStyle(node, null);
};

/**
 * Returns the first scrollable parent of the given element.
 * @param node - DOM node.
 * @returns - the first scrollable parent.
 */
export const getScrollParent = (node: Document | HTMLElement | null): HTMLElement => {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  const parentNode = node && getParentNode(node as HTMLElement);
  // eslint-disable-next-line
  if (!parentNode) return document.body;

  switch (parentNode.nodeName) {
    case 'HTML':
    case 'BODY':
      return parentNode.ownerDocument!.body;
    case '#document':
      return (parentNode as unknown as Document).body;
  }

  // If any of the overflow props is defined for the node then we return it as the parent
  const { overflow, overflowX, overflowY } = getStyleComputedProperty(parentNode);
  if (/(auto|scroll|overlay)/.test(overflow! + overflowY! + overflowX)) {
    return parentNode;
  }

  return getScrollParent(parentNode);
};

export const hasScrollParent = (node: Document | HTMLElement | null): boolean => {
  const scrollParentElement: HTMLElement = getScrollParent(node);
  return scrollParentElement ? scrollParentElement !== scrollParentElement.ownerDocument?.body : false;
};
