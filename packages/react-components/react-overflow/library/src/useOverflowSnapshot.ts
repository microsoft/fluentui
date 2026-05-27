'use client';

import type { OverflowEventPayload } from '@fluentui/priority-overflow';
import * as React from 'react';
import { useOverflowContext } from './overflowContext';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

export const useOverflowSnapshot = (): OverflowEventPayload => {
  const { getSnapshot, subscribe } = useOverflowContext();
  const [snapshot, setSnapshot] = React.useState(() => getSnapshot());
  useIsomorphicLayoutEffect(() => {
    return subscribe(() => {
      setSnapshot(getSnapshot());
    });
  }, [subscribe, getSnapshot]);
  return snapshot;
};
