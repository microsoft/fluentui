import { isVirtualElement } from './isVirtualElement';
/**
 * Gets the virtual parent given the child element, if it exists.
 *
 * @public
 */
export function getVirtualParent(child: HTMLElement): HTMLElement | undefined {
  let parent: HTMLElement | undefined;
  if (child && isVirtualElement(child)) {
    parent = child._virtual.parent;
  }
  return parent;
}
