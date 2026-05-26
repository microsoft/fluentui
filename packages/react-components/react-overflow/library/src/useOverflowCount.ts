'use client';

import { useOverflowSnapshot } from './useOverflowSnapshot';

/**
 * @returns Number of items that are overflowing
 */
export const useOverflowCount = (): number => useOverflowSnapshot().overflowCount;
