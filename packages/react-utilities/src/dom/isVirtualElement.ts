/**
 * Attached interface for elements which support virtual references.
 * Used internally by the virtual hierarchy methods.
 */
interface VirtualElement extends HTMLElement {
  _virtual: {
    parent?: VirtualElement;
    children: VirtualElement[];
  };
}
/**
 * Determines whether or not an element has the virtual hierarchy extension.
 *
 * @public
 */
export function isVirtualElement(element: HTMLElement | VirtualElement): element is VirtualElement {
  return element && !!(<VirtualElement>element)._virtual;
}
