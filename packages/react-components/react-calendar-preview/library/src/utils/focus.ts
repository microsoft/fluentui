let targetToFocusOnNextRepaint: HTMLElement | { focus: () => void } | null | undefined = undefined;

/**
 * Sets focus to an element asynchronously. The focus will be set at the next browser repaint,
 * meaning it won't cause any extra recalculations. If more than one focusAsync is called during one frame,
 * only the latest called focusAsync element will actually be focused
 * @param element - The element to focus
 */
export function focusAsync(
  element: HTMLElement | { focus: () => void } | undefined | null,
  win: Window | undefined | null,
): void {
  if (element) {
    // An element was already queued to be focused, so replace that one with the new element
    if (targetToFocusOnNextRepaint) {
      targetToFocusOnNextRepaint = element;
      return;
    }

    targetToFocusOnNextRepaint = element;

    if (win) {
      // element.focus() is a no-op if the element is no longer in the DOM, meaning this is always safe
      win.requestAnimationFrame(() => {
        targetToFocusOnNextRepaint && targetToFocusOnNextRepaint.focus();

        // We are done focusing for this frame, so reset the queued focus element
        targetToFocusOnNextRepaint = undefined;
      });
    }
  }
}
