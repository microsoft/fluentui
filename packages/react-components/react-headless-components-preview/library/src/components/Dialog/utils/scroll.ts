type ScrollLockState = {
  lockCount: number;
  previousBodyOverflow: string;
};

const scrollLockStateByDocument = new WeakMap<Document, ScrollLockState>();

/**
 * Prevents background scrolling while a modal/alert dialog is open by applying
 * `overflow: hidden` to `<body>`. The `<html>` element is intentionally left
 * untouched so host-application styles on the document element are preserved.
 *
 * Nested modal dialogs share a single lock via a reference count.
 */
export function lockDocumentScroll(targetDocument: Document): void {
  const previous = scrollLockStateByDocument.get(targetDocument);
  if (previous) {
    previous.lockCount += 1;
    return;
  }

  scrollLockStateByDocument.set(targetDocument, {
    lockCount: 1,
    previousBodyOverflow: targetDocument.body.style.overflow,
  });

  targetDocument.body.style.overflow = 'hidden';
}

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
  scrollLockStateByDocument.delete(targetDocument);
}
