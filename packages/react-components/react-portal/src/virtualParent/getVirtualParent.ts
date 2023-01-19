import { isVirtualElement } from './isVirtualElement';
/**
 * Gets the virtual parent given the child element, if it exists.
 */
export function getVirtualParent(child: Node): Node | undefined {
  return isVirtualElement(child) ? child._virtual.parent : undefined;
}
