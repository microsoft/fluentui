import { IVirtualElement } from './IVirtualElement';
/**
 * Determines whether or not an element has the virtual hierarchy extension.
 *
 * @public
 */
export function isVirtualElement(element: HTMLElement | IVirtualElement): element is IVirtualElement {
  return element && !!(<IVirtualElement>element)._virtual;
}
