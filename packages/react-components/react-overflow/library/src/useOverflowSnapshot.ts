'use client';

import type { OverflowSnapshot } from '@fluentui/priority-overflow';
import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';

/**
 * Subscribes to the overflow snapshot and returns a derived slice of it.
 *
 * @param selector - derives the slice of the snapshot the consumer depends on
 */
export function useOverflowSnapshot<Selected>(selector: (snapshot: OverflowSnapshot) => Selected): Selected {
  const { getSnapshot, subscribe } = useOverflowContext();
  const select = useEventCallback(selector);

  const [selected, setSelected] = React.useState(() => selector(getSnapshot()));

  useIsomorphicLayoutEffect(() => {
    const checkForUpdates = () => setSelected(select(getSnapshot()));
    checkForUpdates();
    return subscribe(checkForUpdates);
  }, [subscribe, getSnapshot, select]);

  return selected;
}
