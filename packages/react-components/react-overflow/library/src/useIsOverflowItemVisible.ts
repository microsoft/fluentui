'use client';

import { useOverflowSelector } from './useOverflowSelector';

/**
 * @param id - unique identifier for the item used by the overflow manager
 * @returns visibility state of an overflow item
 */
export function useIsOverflowItemVisible(id: string): boolean {
  return !!useOverflowSelector(snapshot => snapshot.itemVisibility[id]);
}
