type FocusTarget = HTMLElement | { focus: () => void };
type FocusWindow = Pick<Window, 'requestAnimationFrame'>;

const targetsToFocusOnNextRepaint = new WeakMap<FocusWindow, FocusTarget>();

/**
 * Sets focus to an element asynchronously. The focus will be set at the next browser repaint,
 * meaning it won't cause any extra recalculations. If more than one focusAsync is called during one frame,
 * only the latest called focusAsync element will actually be focused
 * @param element - The element to focus
 */
export function focusAsync(element: FocusTarget | undefined | null, win: FocusWindow | undefined | null): void {
  if (element && win) {
    // An element was already queued to be focused, so replace that one with the new element
    if (targetsToFocusOnNextRepaint.has(win)) {
      targetsToFocusOnNextRepaint.set(win, element);
      return;
    }

    targetsToFocusOnNextRepaint.set(win, element);

    // element.focus() is a no-op if the element is no longer in the DOM, meaning this is always safe
    win.requestAnimationFrame(() => {
      const target = targetsToFocusOnNextRepaint.get(win);
      targetsToFocusOnNextRepaint.delete(win);
      target?.focus();
    });
  }
}
