'use client';

import { createLiteObserver } from 'tabster/lite/observer';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

// ---- Lite observer singleton, one per Document ----

type LiteObserver = ReturnType<typeof createLiteObserver>;

const _liteObservers = new WeakMap<Document, { observer: LiteObserver; refCount: number }>();

function _acquireObserver(doc: Document): void {
  let entry = _liteObservers.get(doc);
  if (!entry) {
    entry = { observer: createLiteObserver({ root: doc.body }), refCount: 0 };
    _liteObservers.set(doc, entry);
  }
  entry.refCount++;
}

function _releaseObserver(doc: Document): void {
  const entry = _liteObservers.get(doc);
  if (entry) {
    entry.refCount--;
    if (entry.refCount <= 0) {
      entry.observer.dispose();
      _liteObservers.delete(doc);
    }
  }
}

/**
 * Returns the live LiteObserver for the given document, or null if not yet created.
 * Used by useActivateModal to imperatively activate a modalizer instance.
 *
 * @internal
 */
export function getLiteObserver(doc: Document): LiteObserver | null {
  return _liteObservers.get(doc)?.observer ?? null;
}

/**
 * Ensures a LiteObserver is running for the current Fluent document.
 * Call this in any hook that returns Tabster-related DOM attributes
 * to ensure the observer is active before attributes are consumed.
 *
 * @internal
 */
export function useTabster(): void {
  const { targetDocument } = useFluent();

  useIsomorphicLayoutEffect(() => {
    if (!targetDocument) {
      return;
    }
    _acquireObserver(targetDocument);
    return () => _releaseObserver(targetDocument);
  }, [targetDocument]);
}
