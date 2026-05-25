'use client';

import type { OverflowGroupState } from '@fluentui/priority-overflow';
import { useOverflowSelector } from './useOverflowSelector';

/**
 * @param id - unique identifier for a group of overflow items
 * @returns visibility state of the group
 */
export function useIsOverflowGroupVisible(id: string): OverflowGroupState {
  return useOverflowSelector(snapshot => snapshot.groupVisibility[id]);
}
