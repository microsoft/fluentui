'use client';

import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import type { SeriesProps } from './series-types';
import type { SeriesChildMapping } from './utils';

export interface UseSeriesAnimationParams extends Pick<SeriesProps, 'iterations' | 'onMotionFinish'> {
  /** Mapping of child keys to elements and indices */
  childMapping: SeriesChildMapping;
}

export interface UseSeriesAnimationResult {
  /** The current index of the component being animated */
  currentIndex: number;
  /** The current iteration number (0-based) */
  currentIteration: number;
  /** Callback to be passed to the current child's onMotionFinish */
  handleChildFinish: () => void;
}

/**
 * Hook that manages the sequential animation of a series of components.
 *
 * Behavior:
 * - Starts with the first component (index 0)
 * - When a component finishes, advances to the next component
 * - When all components finish, either:
 *   - Repeats the sequence if iterations > 1 or iterations === 'infinite'
 *   - Calls the parent onMotionFinish callback if sequence is complete
 *
 * @param childMapping - Mapping of child keys to elements and indices
 * @param iterations - Number of times to repeat (1 for once, 'infinite' for loop)
 * @param onMotionFinish - Callback when the entire series completes
 * @returns Current animation state and child finish handler
 */
export function useSeriesAnimation({
  childMapping,
  iterations = 1,
  onMotionFinish,
}: UseSeriesAnimationParams): UseSeriesAnimationResult {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentIteration, setCurrentIteration] = React.useState(0);

  // Stabilize the callback reference
  const handleMotionFinish = useEventCallback(
    onMotionFinish ??
      (() => {
        return;
      }),
  );

  const childKeys = React.useMemo(
    () =>
      Object.keys(childMapping).sort((a, b) => {
        return childMapping[a].index - childMapping[b].index;
      }),
    [childMapping],
  );

  const totalChildren = childKeys.length;

  // Reset state when children change
  React.useEffect(() => {
    setCurrentIndex(0);
    setCurrentIteration(0);
  }, [childKeys.length]);

  const handleChildFinish = React.useCallback(() => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + 1;

      if (nextIndex >= totalChildren) {
        // All children in current iteration finished
        const nextIteration = currentIteration + 1;

        if (iterations === 'infinite' || nextIteration < iterations) {
          // Start next iteration
          setCurrentIteration(nextIteration);
          return 0; // Reset to first child
        } else {
          // All iterations complete
          handleMotionFinish();
          return prevIndex; // Stay on last child
        }
      }

      return nextIndex; // Move to next child
    });
  }, [totalChildren, currentIteration, iterations, handleMotionFinish]);

  return {
    currentIndex,
    currentIteration,
    handleChildFinish,
  };
}
