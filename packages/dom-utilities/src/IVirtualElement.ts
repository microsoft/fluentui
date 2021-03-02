/**
 * Attached interface for elements which support virtual references.
 * Used internally by the virtual hierarchy methods.
 */
export interface IVirtualElement extends HTMLElement {
  _virtual: {
    parent?: IVirtualElement;
    children: IVirtualElement[];
  };
}
