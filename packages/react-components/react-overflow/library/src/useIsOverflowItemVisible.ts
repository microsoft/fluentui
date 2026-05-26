'use client';

import { useSyncOverflowSnapshot } from './useOverflowSnapshot';

/**
 * @param id - unique identifier for the item used by the overflow manager
 * @returns visibility state of an overflow item
 */
export function useIsOverflowItemVisible(id: string): boolean {
  return !!useSyncOverflowSnapshot().itemVisibility[id];
}
