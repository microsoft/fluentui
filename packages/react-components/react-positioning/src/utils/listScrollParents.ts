import { getScrollParent } from './getScrollParent';

export function listScrollParents(node: HTMLElement): HTMLElement[] {
  const scrollParents: HTMLElement[] = [];

  let cur: HTMLElement | null = node;
  while (cur) {
    const scrollParent = getScrollParent(cur);

    if (node.ownerDocument.body === scrollParent) {
      scrollParents.push(scrollParent);
      break;
    }

    scrollParents.push(scrollParent);
    cur = scrollParent;
  }

  return scrollParents;
}
