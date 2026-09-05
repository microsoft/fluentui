type ScrollLockState = {
  lockCount: number;
  previousBodyOverflow: string;
  previousScrollbarGutter: string;
};

const scrollLockStateByDocument = new WeakMap<Document, ScrollLockState>();

/**
 * Prevents background scrolling while a modal/alert dialog is open by applying
 * `overflow: hidden` to `<body>`, and reserves the space the page scrollbar was
 * occupying so nothing on the page moves sideways as it disappears.
 *
 * The gutter has to be reserved on `<html>`: `scrollbar-gutter` does not propagate
 * from `<body>` to the viewport the way `overflow` does, so spelling it on `<body>`
 * reserves nothing. It is written only when the scrollbar actually takes layout
 * width, because `stable` otherwise reserves a gutter the page never had.
 *
 * Nested modal dialogs share a single lock via a reference count.
 */
export function lockDocumentScroll(targetDocument: Document): void {
  const previous = scrollLockStateByDocument.get(targetDocument);
  if (previous) {
    previous.lockCount += 1;
    return;
  }

  const { body, documentElement } = targetDocument;
  // Read the scrollbar's layout width before the lock takes it away. Overlay
  // scrollbars and unscrollable pages both measure 0, and both want no gutter.
  const scrollbarWidth = (targetDocument.defaultView?.innerWidth ?? 0) - documentElement.clientWidth;

  scrollLockStateByDocument.set(targetDocument, {
    lockCount: 1,
    previousBodyOverflow: body.style.overflow,
    previousScrollbarGutter: documentElement.style.scrollbarGutter,
  });

  body.style.overflow = 'visible clip';
  if (scrollbarWidth > 0) {
    documentElement.style.scrollbarGutter = 'stable';
  }
}

/**
 * Restores the document's scroll behavior by reverting the `overflow` style on the
 * `<body>` element and the reserved scrollbar gutter on `<html>` to their previous
 * values. This function is typically called when a modal/alert dialog is closed.
 */
export function unlockDocumentScroll(targetDocument: Document): void {
  const state = scrollLockStateByDocument.get(targetDocument);
  if (!state) {
    return;
  }

  state.lockCount -= 1;
  if (state.lockCount > 0) {
    return;
  }

  targetDocument.body.style.overflow = state.previousBodyOverflow;
  targetDocument.documentElement.style.scrollbarGutter = state.previousScrollbarGutter;
  scrollLockStateByDocument.delete(targetDocument);
}
