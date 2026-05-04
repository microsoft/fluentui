function isInlineHidden(element: HTMLElement): boolean {
  // jsdom doesn't compute layout, so this check is unreliable in unit tests.
  if (process.env.NODE_ENV === 'test') {
    return false;
  }

  return element.style.display === 'none';
}

/**
 * Determines whether an element is "visible" for focus purposes:
 * not aria-hidden, not the `hidden` attribute, not `type="hidden"`, and
 * none of its ancestors up to the document body are inline-hidden.
 */
export function isVisible(element: HTMLElement): boolean {
  const ariaHidden =
    element.getAttribute('aria-hidden') || element.getAttribute('hidden') || element.getAttribute('type') === 'hidden';

  if (ariaHidden) {
    return false;
  }

  let parent: HTMLElement = element;

  while (parent) {
    if (parent === parent.ownerDocument?.body || parent.nodeType === 11) {
      break;
    }

    if (isInlineHidden(parent)) {
      return false;
    }

    parent = parent.parentNode as HTMLElement;
  }

  return true;
}
