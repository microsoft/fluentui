import { getStaggerTotalDuration } from './getStaggerTotalDuration';

export interface GetStaggerVisibilityParams {
  count: number;
  elapsed: number;
  delay?: number;
  itemDuration?: number;
  easingFn?: (progress: number) => number;
  direction?: 'enter' | 'exit';
  reversed?: boolean;
}

export interface StaggerVisibilityResult {
  visibility: boolean[];
  totalDuration: number;
  completedSteps: number;
}

const defaultEasingFn = (t: number) => t;

/**
 * Returns visibility flags plus timing metrics for a stagger sequence.
 */
export function getStaggerVisibility({
  count,
  elapsed,
  delay,
  itemDuration = 0,
  easingFn = defaultEasingFn,
  direction = 'enter',
  reversed: reverse = false,
}: GetStaggerVisibilityParams): StaggerVisibilityResult {
  if (count <= 0) {
    return { visibility: [], totalDuration: 0, completedSteps: 0 };
  }

  const totalDuration = getStaggerTotalDuration({ count, delay, itemDuration });
  const rawProgress = totalDuration > 0 ? elapsed / totalDuration : 1;
  const progress = Math.min(Math.max(rawProgress, 0), 1);

  const eased = easingFn(progress);
  const completedSteps = Math.floor(eased * count);
  // TODO: extract array visibility logic to a separate function and unit test
  const visibility = Array.from({ length: count }, (_, idx) => {
    const fromStart = idx < completedSteps;
    const fromEnd = idx >= count - completedSteps;

    if (direction === 'enter') {
      // In forward direction, completed steps enter in ascending order
      // In reverse direction, completed steps enter in descending order
      return reverse ? fromEnd : fromStart;
    }
    // direction === 'exit'
    // The exiting of items is in the opposite order of entering, for symmetry
    // In forward direction, completed steps exit in descending order
    // In reverse direction, completed steps exit in ascending order
    return reverse ? !fromStart : !fromEnd;
  });

  return { visibility, totalDuration, completedSteps };
}
