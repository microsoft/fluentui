import type { VirtualElement } from './types';

/**
 * Removes the virtual parent relationship.
 *
 * @param child - Theme element to set the virtual parent *
 */

export function cleanVirtualParent(child: Node): void {
  if (!child) {
    return;
  }

  const virtualChild = child as VirtualElement;

  virtualChild._virtual.parent = undefined;
}
