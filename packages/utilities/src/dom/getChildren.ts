import { isVirtualElement } from './isVirtualElement';
/**
 * Gets the elements which are child elements of the given element.
 * If `allowVirtualChildren` is `true`, this method enumerates virtual child elements
 * after the original children.
 * @param parent - The element to get the children of.
 * @param allowVirtualChildren - true if the method should enumerate virtual child elements.
 */
export function getChildren(parent: HTMLElement, allowVirtualChildren: boolean = true): HTMLElement[] {
  const children: HTMLElement[] = [];
  if (parent) {
    for (let i = 0; i < parent.children.length; i++) {
      children.push(parent.children.item(i) as HTMLElement);
    }
    if (allowVirtualChildren && isVirtualElement(parent)) {
      children.push(...parent._virtual.children);
    }
  }
  return children;
}
