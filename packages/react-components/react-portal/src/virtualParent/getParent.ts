import { getVirtualParent } from './getVirtualParent';

/**
 * Gets the element which is the parent of a given element.
 * This method prefers the virtual parent over real DOM parent when present.
 */
export function getParent(child: Node | null): Node | null {
  return ((child && getVirtualParent(child)) || child?.parentNode) ?? null;
}
