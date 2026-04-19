'use client';

import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { FocusedElementCallback } from 'tabster/lite/focused';
import { createFocusedElementTracker } from 'tabster/lite/focused';

export type { FocusedElementCallback, FocusedElementDetail } from 'tabster/lite/focused';

/**
 * Subscribes to focused element changes for the current Fluent document.
 * Calls the callback whenever focus moves, with the new element and detail containing
 * the previously focused element and whether focus was set programmatically.
 */
export function useFocusedElementChange(callback: FocusedElementCallback): void {
  const { targetDocument } = useFluent();
  // useEventCallback returns a stable wrapper that always calls the latest callback,
  // so we intentionally omit it from the effect deps.
  const listener = useEventCallback(callback);

  useIsomorphicLayoutEffect(() => {
    if (!targetDocument) return;
    const tracker = createFocusedElementTracker(targetDocument);
    tracker.subscribe(listener);
    return () => {
      tracker.unsubscribe(listener);
      tracker.dispose();
    };
  }, [targetDocument]); // eslint-disable-line react-hooks/exhaustive-deps
}
