import { findAncestor } from '../engine/platform';

/** Lists the scroll parents of the node, the closest first, up to and including the body of its document */
export const listScrollParents = (node: HTMLElement): HTMLElement[] => {
  const body = node.ownerDocument.body;
  const scrollParents: HTMLElement[] = [];

  findAncestor(node, (parent, { overflow, overflowX, overflowY }) => {
    if (parent !== body && /auto|scroll|overlay/.test(overflow + overflowY + overflowX)) {
      scrollParents.push(parent as HTMLElement);
    }
  });

  return [...scrollParents, body];
};
