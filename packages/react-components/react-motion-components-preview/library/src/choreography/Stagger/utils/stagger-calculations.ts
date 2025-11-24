import type { StaggerProps } from '../stagger-types';
import { DEFAULT_ITEM_DELAY, DEFAULT_ITEM_DURATION } from './constants';

/**
 * Calculate the total stagger duration — from the moment the stagger begins
 * until the final item's animation completes.
 *
 * Uses the formula:
 *   max(0, itemDelay * (itemCount - 1) + itemDuration)
 *
 * @param params.itemCount    Total number of items to stagger
 * @param params.itemDelay    Milliseconds between the start of each item (default: DEFAULT_ITEM_DELAY)
 * @param params.itemDuration Milliseconds each item's animation lasts (default: DEFAULT_ITEM_DURATION)
 * @returns                   Total duration in milliseconds (never negative)
 */
export function getStaggerTotalDuration({
  itemCount,
  itemDelay = DEFAULT_ITEM_DELAY,
  itemDuration = DEFAULT_ITEM_DURATION,
}: {
  itemCount: number;
} & Pick<StaggerProps, 'itemDelay' | 'itemDuration'>): number {
  if (itemCount <= 0) {
    return 0;
  }
  if (itemCount <= 1) {
    return Math.max(0, itemDuration);
  }
  const staggerDuration = itemDelay * (itemCount - 1);
  return Math.max(0, staggerDuration + itemDuration);
}

export interface StaggerItemsVisibilityAtTimeParams
  extends Pick<StaggerProps, 'itemDelay' | 'itemDuration' | 'reversed'> {
  itemCount: number;
  elapsed: number;
  direction?: 'enter' | 'exit';
}

/**
 * Returns visibility flags plus timing metrics for a stagger sequence.
 */
export function staggerItemsVisibilityAtTime({
  itemCount,
  elapsed,
  itemDelay = DEFAULT_ITEM_DELAY,
  itemDuration = DEFAULT_ITEM_DURATION,
  direction = 'enter',
  reversed = false,
}: StaggerItemsVisibilityAtTimeParams): {
  itemsVisibility: boolean[];
  totalDuration: number;
} {
  // If no items, return the empty state
  if (itemCount <= 0) {
    return { itemsVisibility: [], totalDuration: 0 };
  }

  const totalDuration = getStaggerTotalDuration({ itemCount, itemDelay, itemDuration });

  // Calculate progression through the stagger sequence
  let completedSteps: number;
  if (itemDelay <= 0) {
    // When itemDelay is 0 or negative, all steps complete immediately
    completedSteps = itemCount;
  } else {
    // Both enter and exit should start their first item immediately, but handle t=0 differently
    if (elapsed === 0) {
      // At exactly t=0, for enter we want first item visible, for exit we want all items visible
      completedSteps = direction === 'enter' ? 1 : 0;
    } else {
      // After t=0, both directions should progress at the same rate
      const stepsFromElapsedTime = Math.floor(elapsed / itemDelay) + 1;
      completedSteps = Math.min(itemCount, stepsFromElapsedTime);
    }
  }

  const itemsVisibility = Array.from({ length: itemCount }, (_, idx) => {
    // Calculate based on progression through the sequence (enter pattern)
    const fromStart = idx < completedSteps;
    const fromEnd = idx >= itemCount - completedSteps;

    let itemVisible = reversed ? fromEnd : fromStart;

    // For exit, invert the enter pattern
    if (direction === 'exit') {
      itemVisible = !itemVisible;
    }

    return itemVisible;
  });

  return { itemsVisibility, totalDuration };
}
