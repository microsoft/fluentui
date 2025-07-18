/**
 * Sets the virtual parent of an element.
 *
 * @internal
 * @param child - Theme element to set the virtual parent
 * @param parent - The virtual parent, use `undefined` to remove a virtual parent relationship
 */
export function setVirtualParent(child: Node, parent?: Node): void {
  if (!child) {
    return;
  }

  Object.assign(child, {
    _virtual: {
      parent,
    },
  });
}
