export interface VirtualElement extends Node {
  _virtual: {
    parent?: Node;
  };
}
