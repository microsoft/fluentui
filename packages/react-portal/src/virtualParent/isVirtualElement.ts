import type { VirtualElement } from './types';

/**
 * Determines whether or not an element has the virtual hierarchy extension.
 */
export function isVirtualElement(element: HTMLElement | VirtualElement): element is VirtualElement {
  return element && !!(<VirtualElement>element)._virtual;
}
