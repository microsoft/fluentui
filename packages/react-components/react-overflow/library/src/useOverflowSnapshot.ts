'use client';

import type { OverflowSnapshot } from '@fluentui/priority-overflow';
import * as React from 'react';
import { useOverflowContext } from './overflowContext';

export const useSyncOverflowSnapshot = (): OverflowSnapshot => {
  const { getSnapshot, subscribe } = useOverflowContext();
  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};
