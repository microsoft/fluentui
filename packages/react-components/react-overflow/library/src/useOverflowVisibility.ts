'use client';

import type { OverflowGroupState } from '@fluentui/priority-overflow';
import * as React from 'react';
import { _overflowPayloadToState } from './components/Overflow';
import { useOverflowSnapshot } from './useOverflowSnapshot';

/**
 * A hook that returns the visibility status of all items and groups.
 *
 * ⚠️ Heads up!
 *
 * This hook will cause the component it is in to re-render for every single time an item overflows or becomes
 * visible - use with caution
 * @returns visibility status of all items and groups
 */
export function useOverflowVisibility(): {
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
} {
  const snapshot = useOverflowSnapshot();
  return React.useMemo(() => _overflowPayloadToState(snapshot), [snapshot]);
}
