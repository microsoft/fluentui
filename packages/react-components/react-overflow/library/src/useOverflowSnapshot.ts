'use client';

import type { OverflowEventPayload } from '@fluentui/priority-overflow';
import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';

/**
 * Subscribes to the overflow snapshot and returns a derived slice of it.
 *
 * Only re-renders the consuming component when the selected slice changes (per `isEqual`), so hooks
 * like `useIsOverflowItemVisible` don't re-render on every unrelated overflow change. Intentionally
 * implemented with state + effects (the `useSelector` pattern) rather than `useSyncExternalStore`,
 * which would force a synchronous re-render/flush on every snapshot change.
 *
 * @param selector - derives the slice of the snapshot the consumer depends on
 * @param isEqual - compares the previous and next slice; defaults to `Object.is`
 */
export function useOverflowSnapshot<Selected>(
  selector: (snapshot: OverflowEventPayload) => Selected,
  isEqual: (a: Selected, b: Selected) => boolean = Object.is,
): Selected {
  const { getSnapshot, subscribe } = useOverflowContext();

  // Stable wrappers around the latest selector/isEqual, so the subscription effect runs once and
  // does not need to re-subscribe when an inline selector changes identity between renders.
  const select = useEventCallback(selector);
  const compareSelected = useEventCallback(isEqual);

  const [selected, setSelected] = React.useState(() => selector(getSnapshot()));

  useIsomorphicLayoutEffect(() => {
    const checkForUpdates = () => {
      setSelected(previous => {
        const next = select(getSnapshot());
        return compareSelected(previous, next) ? previous : next;
      });
    };

    // The snapshot may have changed between render and subscription.
    checkForUpdates();
    return subscribe(checkForUpdates);
  }, [subscribe, getSnapshot, select, compareSelected]);

  return selected;
}
