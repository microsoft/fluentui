import { isVirtualElement } from './isVirtualElement';

type GetParentOptions = {
  /**
   * Indicates if getParent() should ignore a virtual parent.
   * @internal
   */
  skipVirtual?: boolean;
};

/**
 * Gets the virtual parent given the child element, if it exists.
 * @internal
 */
function getVirtualParent(child: Node): Node | null {
  return isVirtualElement(child) ? child._virtual.parent || null : null;
}

/**
 * Gets the element which is the parent of a given element.
 * This method prefers the virtual parent over real DOM parent when present.
 * @internal
 */
export function getParent(child: Node | null, options: GetParentOptions = {}): Node | null {
  if (!child) {
    return null;
  }

  if (!options.skipVirtual) {
    const virtualParent = getVirtualParent(child);

    if (virtualParent) {
      return virtualParent;
    }
  }

  const parent = child.parentNode;

  if (parent && parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return (parent as ShadowRoot).host;
  }

  return parent;
}
