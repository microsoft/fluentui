'use client';

import type { OverflowEventPayload, OverflowGroupState } from '@fluentui/priority-overflow';
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

/**
 * Derives the item and group visibility maps from an overflow snapshot.
 * @internal
 */
export const selectVisibility = (
  snapshot: OverflowEventPayload,
): {
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
} => {
  const itemVisibility: Record<string, boolean> = {};
  snapshot.visibleItems.forEach(item => {
    itemVisibility[item.id] = true;
  });
  snapshot.invisibleItems.forEach(item => {
    itemVisibility[item.id] = false;
  });
  return {
    itemVisibility,
    groupVisibility: snapshot.groupVisibility,
  };
};
