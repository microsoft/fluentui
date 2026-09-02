/**
 * Returns the parent node or the host of the node argument.
 * @param node - DOM node.
 * @returns - parent DOM node.
 */

'use client';

export const getParentNode = (node: Element): Element | null => {
  if (node.nodeName === 'HTML') {
    return node;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return node.parentNode || (node as any).host || null;
};

const isDocument = (node: Document | Element): node is Document => node.nodeType === 9;

/**
 * Returns CSS styles of the given node.
 * @param node - DOM node.
 * @returns - CSS styles.
 */
export const getStyleComputedProperty = (node: Element): Partial<CSSStyleDeclaration> => {
  if (node.nodeType !== 1) {
    return {};
  }

  const targetWindow = node.ownerDocument?.defaultView;

  if (targetWindow) {
    return targetWindow.getComputedStyle(node, null);
  }

  return {};
};

/**
 * Returns the first scrollable parent of the given element.
 * @param node - DOM node.
 * @returns - the first scrollable parent.
 */
export const getScrollParent = (node: Document | Element | null): HTMLElement => {
  if (!node) {
    // eslint-disable-next-line @nx/workspace-no-restricted-globals
    return document.body;
  }

  if (isDocument(node)) {
    return node.body;
  }

  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  const parentNode = getParentNode(node);
  if (!parentNode) {
    // eslint-disable-next-line @nx/workspace-no-restricted-globals
    return node.ownerDocument?.body ?? document.body;
  }

  switch (parentNode.nodeName) {
    case 'HTML':
    case 'BODY':
      // eslint-disable-next-line @nx/workspace-no-restricted-globals
      return parentNode.ownerDocument?.body ?? document.body;
    case '#document':
      return (parentNode as unknown as Document).body;
  }

  // If any of the overflow props is defined for the node then we return it as the parent
  const { overflow, overflowX, overflowY } = getStyleComputedProperty(parentNode);
  if (/(auto|scroll|overlay)/.test(`${overflow}${overflowY}${overflowX}`)) {
    return parentNode as HTMLElement;
  }

  return getScrollParent(parentNode);
};

export const hasScrollParent = (node: Document | Element | null): boolean => {
  const scrollParentElement: HTMLElement = getScrollParent(node);

  return scrollParentElement ? scrollParentElement !== scrollParentElement.ownerDocument?.body : false;
};
