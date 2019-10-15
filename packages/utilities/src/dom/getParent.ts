import { getVirtualParent } from './getVirtualParent';
/**
 * Gets the element which is the parent of a given element.
 * If `allowVirtuaParents` is `true`, this method prefers the virtual parent over
 * real DOM parent when present.
 *
 * @public
 */
export function getParent(child: HTMLElement, allowVirtualParents: boolean = true): HTMLElement | null {
  return child && ((allowVirtualParents && getVirtualParent(child)) || (child.parentNode && (child.parentNode as HTMLElement)));
}
