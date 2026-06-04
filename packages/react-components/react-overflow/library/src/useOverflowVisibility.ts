'use client';

import type { OverflowGroupState, OverflowSnapshot } from '@fluentui/priority-overflow';
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
  return useOverflowSnapshot(selectVisibility);
}

const selectVisibility = (
  snapshot: OverflowSnapshot,
): {
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
} => ({
  itemVisibility: snapshot.itemVisibility,
  groupVisibility: snapshot.groupVisibility,
});
