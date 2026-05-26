'use client';

import { useSyncOverflowSnapshot } from './useOverflowSnapshot';

/**
 * @returns Number of items that are overflowing
 */
export const useOverflowCount = (): number => useSyncOverflowSnapshot().overflowCount;
