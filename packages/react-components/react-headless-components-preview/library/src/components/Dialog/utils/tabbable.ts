/**
 * Focuses the first tabbable, visible, non-link element inside `container`.
 * Returns `true` if focus moved, `false` if no suitable element was found.
 */
export function focusFirstTabbable(container: HTMLElement): boolean {
  const targetDocument = container.ownerDocument;
  const targetWindow = targetDocument?.defaultView;
  const prev = targetDocument.activeElement;
  const walker = targetDocument.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node: Element) {
      const el = node as HTMLElement;
      // Skip links — auto-focusing a link on mount causes navigation side-effects.
      if (el.tagName === 'A') {
        return NodeFilter.FILTER_SKIP;
      }
      if (el.tagName === 'INPUT' && (el as HTMLInputElement).type === 'hidden') {
        return NodeFilter.FILTER_SKIP;
      }
      if ((el as HTMLInputElement).disabled || el.hidden) {
        return NodeFilter.FILTER_SKIP;
      }
      return el.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });

  while (walker.nextNode()) {
    const el = walker.currentNode as HTMLElement;
    // Skip elements that are visually hidden.
    if (
      targetWindow?.getComputedStyle(el).visibility === 'hidden' ||
      targetWindow?.getComputedStyle(el).display === 'none'
    ) {
      continue;
    }
    el.focus({ preventScroll: true });
    if (targetDocument?.activeElement !== prev) {
      return true;
    }
  }

  return false;
}
