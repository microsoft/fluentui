import { getScrollParent } from './getScrollParent';

export function listScrollParents(node: Element): HTMLElement[] {
  const scrollParents: HTMLElement[] = [];

  let cur: Element | null = node;
  while (cur) {
    const scrollParent = getScrollParent(cur);

    if (node.ownerDocument.body === scrollParent) {
      scrollParents.push(scrollParent);
      break;
    }

    if (scrollParent.nodeName === 'BODY' && scrollParent !== node.ownerDocument.body) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(
          '@fluentui/react-positioning: You are comparing two different documents! This is an unexpected error, please report this as a bug to the Fluent UI team ',
        );
      }
      break;
    }

    scrollParents.push(scrollParent);
    cur = scrollParent;
  }

  return scrollParents;
}
