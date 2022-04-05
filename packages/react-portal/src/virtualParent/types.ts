export interface VirtualElement extends HTMLElement {
  _virtual: {
    parent?: HTMLElement;
  };
}
