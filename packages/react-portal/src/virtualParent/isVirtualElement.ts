import { VirtualElement } from './Types';
/**
 * Determines whether or not an element has the virtual hierarchy extension.
 *
 * @public
 */
export function isVirtualElement(element: HTMLElement | VirtualElement): element is VirtualElement {
  return element && !!(<VirtualElement>element)._virtual;
}
