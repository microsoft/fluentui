import { isVirtualElement } from './isVirtualElement';

/**
 * Gets the virtual parent given the child element, if it exists.
 */
function getVirtualParent(child: Node): Node | null {
  return isVirtualElement(child) ? child._virtual.parent || null : null;
}

/**
 * Gets the element which is the parent of a given element.
 * This method prefers the virtual parent over real DOM parent when present.
 */
export function getParent(child: Node | null, skipVirtual: boolean = false): Node | null {
  if (!child) {
    return null;
  }

  if (!skipVirtual) {
    const virtualParent = getVirtualParent(child);

    if (virtualParent) {
      return virtualParent;
    }
  }

  return child?.parentNode || null;
}
