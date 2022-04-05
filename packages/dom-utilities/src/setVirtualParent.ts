import { IVirtualElement } from './IVirtualElement';
/**
 * Sets the virtual parent of an element.
 * Pass `undefined` as the `parent` to clear the virtual parent.
 *
 * @public
 */
export function setVirtualParent(child: HTMLElement, parent: HTMLElement | null): void {
  const virtualChild = <IVirtualElement>child;
  const virtualParent = <IVirtualElement | null>parent;

  if (!virtualChild._virtual) {
    virtualChild._virtual = {
      children: [],
    };
  }

  const oldParent = virtualChild._virtual.parent;

  if (oldParent && oldParent !== parent) {
    // Remove the child from its old parent.
    const index = oldParent._virtual.children.indexOf(virtualChild);

    if (index > -1) {
      oldParent._virtual.children.splice(index, 1);
    }
  }

  virtualChild._virtual.parent = virtualParent || undefined;

  if (virtualParent) {
    if (!virtualParent._virtual) {
      virtualParent._virtual = {
        children: [],
      };
    }

    virtualParent._virtual.children.push(virtualChild);
  }
}
