import type { VirtualElement } from './types';

/**
 * Determines whether or not an element has the virtual hierarchy extension.
 * @internal
 */
export function isVirtualElement(element: Node | VirtualElement): element is VirtualElement {
  return element && !!(element as VirtualElement)._virtual;
}
