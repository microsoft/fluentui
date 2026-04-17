type ScrollLockState = {
  lockCount: number;
  previousBodyOverflow: string;
  previousDocumentOverflow: string;
};

const scrollLockStateByDocument = new WeakMap<Document, ScrollLockState>();

export function lockDocumentScroll(targetDocument: Document): void {
  const previous = scrollLockStateByDocument.get(targetDocument);
  if (previous) {
    previous.lockCount += 1;
    return;
  }

  const nextState: ScrollLockState = {
    lockCount: 1,
    previousBodyOverflow: targetDocument.body.style.overflow,
    previousDocumentOverflow: targetDocument.documentElement.style.overflow,
  };

  targetDocument.body.style.overflow = 'hidden';
  targetDocument.documentElement.style.overflow = 'hidden';
  scrollLockStateByDocument.set(targetDocument, nextState);
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
  targetDocument.documentElement.style.overflow = state.previousDocumentOverflow;
  scrollLockStateByDocument.delete(targetDocument);
}
