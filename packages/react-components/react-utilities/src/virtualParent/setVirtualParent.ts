import type { VirtualElement } from './types';

/**
 * Sets the virtual parent of an element.
 *
 * @internal
 * @param child - Theme element to set the virtual parent
 * @param parent - The virtual parent, use `undefined` to remove a virtual parent relationship
 */
export function setVirtualParent(child: Node, parent?: Node): void {
  if (!child) {
    return;
  }

  const virtualChild = child as VirtualElement;

  if (!virtualChild._virtual) {
    virtualChild._virtual = {};
  }

  virtualChild._virtual.parent = parent;
}
