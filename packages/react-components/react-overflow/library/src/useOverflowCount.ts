'use client';

import { useOverflowSelector } from './useOverflowSelector';

/**
 * @returns Number of items that are overflowing
 */
export const useOverflowCount = (): number => useOverflowSelector(snapshot => snapshot.overflowCount);
