'use client';

import type { OverflowEventPayload } from '@fluentui/priority-overflow';
import { useOverflowSnapshot } from './useOverflowSnapshot';

/**
 * @returns Number of items that are overflowing
 */
export const useOverflowCount = (): number => useOverflowSnapshot(selectInvisibleItemCount);

const selectInvisibleItemCount = (snapshot: OverflowEventPayload): number => snapshot.invisibleItems.length;
