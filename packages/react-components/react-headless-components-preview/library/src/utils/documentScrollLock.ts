type ScrollLockState = {
  lockCount: number;
  previousBodyOverflow: string;
};

const scrollLockStateByDocument = new WeakMap<Document, ScrollLockState>();

/**
 * Prevents background scrolling while a modal overlay is open.
 *
 * Locks are reference-counted per document so nested overlays share one lock,
 * and the body's original inline overflow value is restored after the final
 * unlock.
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

  targetDocument.body.style.overflow = 'visible clip';
}

/**
 * Releases one document scroll lock and restores the original body overflow
 * value after the final nested lock is released.
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
  scrollLockStateByDocument.delete(targetDocument);
}
