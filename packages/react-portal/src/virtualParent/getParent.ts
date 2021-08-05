import { getVirtualParent } from './getVirtualParent';

/**
 * Gets the element which is the parent of a given element.
 * This method prefers the virtual parent over real DOM parent when present.
 */
export function getParent(child: HTMLElement | null): HTMLElement | null {
  return (child && getVirtualParent(child)) || (child?.parentNode as HTMLElement | null);
}
