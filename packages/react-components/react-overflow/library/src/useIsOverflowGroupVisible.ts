'use client';

import type { OverflowGroupState } from '@fluentui/priority-overflow';
import { useSyncOverflowSnapshot } from './useOverflowSnapshot';

/**
 * @param id - unique identifier for a group of overflow items
 * @returns visibility state of the group
 */
export function useIsOverflowGroupVisible(id: string): OverflowGroupState {
  return useSyncOverflowSnapshot().groupVisibility[id];
}
