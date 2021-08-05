import { VirtualElement } from './types';

/**
 * Sets the virtual parent of an element.
 *
 * @param child - Theme element to set the virtual parent
 * @param parent - The virtual parent, use `undefined` to remove a virtual parent relationship
 */
export function setVirtualParent(child: HTMLElement, parent?: HTMLElement): void {
  if (!child) {
    return;
  }

  const virtualChild = <VirtualElement>child;

  if (!virtualChild._virtual) {
    virtualChild._virtual = {};
  }

  virtualChild._virtual.parent = parent || undefined;
}
