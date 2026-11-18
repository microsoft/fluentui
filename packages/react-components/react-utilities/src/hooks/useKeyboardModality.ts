'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback } from './useEventCallback';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type KeyboardModalityListener = (isKeyboard: boolean) => void;

type KeyboardModalityTracker = {
  /** `true` after a keyboard interaction, `false` after a pointer interaction, `undefined` before either */
  isKeyboard: boolean | undefined;
  listeners: Set<KeyboardModalityListener>;
  dispose: () => void;
};

// One tracker per document, shared by all subscribers, so the number of document listeners stays constant
const trackers = new WeakMap<Document, KeyboardModalityTracker>();

/**
 * Screen readers dispatch synthetic mouse events without buttons or coordinates when activating elements,
 * those should keep the keyboard modality.
 */
const isVirtualClick = (event: MouseEvent) =>
  event.buttons === 0 || (event.clientX === 0 && event.clientY === 0 && event.screenX === 0 && event.screenY === 0);

/**
 * Synchronizes an imperative modality change with existing subscribers without creating a tracker.
 * @internal
 */
export function setKeyboardModality(targetDocument: Document | undefined, isKeyboard: boolean): void {
  if (!targetDocument) {
    return;
  }

  let tracker = trackers.get(targetDocument);
  if (!tracker) {
    tracker = createTracker(targetDocument);
    trackers.set(targetDocument, tracker);
  }
  if (tracker.isKeyboard === isKeyboard) {
    return;
  }

  tracker.isKeyboard = isKeyboard;
  tracker.listeners.forEach(listener => listener(isKeyboard));
}

function createTracker(targetDocument: Document): KeyboardModalityTracker {
  const tracker: KeyboardModalityTracker = {
    isKeyboard: undefined,
    listeners: new Set(),
    dispose: () => {
      targetDocument.removeEventListener('keydown', onKeyDown, true);
      targetDocument.removeEventListener('mousedown', onMouseDown, true);
      targetDocument.removeEventListener('touchstart', onTouchStart, true);
    },
  };

  const onKeyDown = () => setKeyboardModality(targetDocument, true);
  const onMouseDown = (event: MouseEvent) => {
    if (!isVirtualClick(event)) {
      setKeyboardModality(targetDocument, false);
    }
  };
  const onTouchStart = () => setKeyboardModality(targetDocument, false);

  targetDocument.addEventListener('keydown', onKeyDown, true);
  targetDocument.addEventListener('mousedown', onMouseDown, true);
  targetDocument.addEventListener('touchstart', onTouchStart, true);

  return tracker;
}

/**
 * Tracks whether the user interacts with the keyboard or a pointer, without depending on keyborg/tabster.
 * All hook instances in a document share the same document listeners.
 *
 * @internal
 * @param onChange - called when the modality changes between keyboard and pointer
 * @returns A stable getter for the current modality: `true` for keyboard, `false` for pointer and `undefined`
 * when no interaction was observed yet (for example, a keyboard interaction mounted the component).
 * Use `isFocusVisible()` as a fallback in that case.
 */
export function useKeyboardModality(onChange?: (isKeyboard: boolean) => void): () => boolean | undefined {
  const { targetDocument } = useFluent();
  const targetDocumentRef = React.useRef(targetDocument);
  const listener = useEventCallback((isKeyboard: boolean) => onChange?.(isKeyboard));

  useIsomorphicLayoutEffect(() => {
    targetDocumentRef.current = targetDocument;
  }, [targetDocument]);

  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }

    let tracker = trackers.get(targetDocument);
    if (!tracker) {
      tracker = createTracker(targetDocument);
      trackers.set(targetDocument, tracker);
    }

    tracker.listeners.add(listener);

    return () => {
      tracker.listeners.delete(listener);

      if (tracker.listeners.size === 0) {
        tracker.dispose();
        trackers.delete(targetDocument);
      }
    };
  }, [targetDocument, listener]);

  // An existing tracker can already know the modality when focus happens before this hook's passive effect.
  return React.useCallback(() => {
    const currentDocument = targetDocumentRef.current;
    return currentDocument ? trackers.get(currentDocument)?.isKeyboard : undefined;
  }, []);
}
