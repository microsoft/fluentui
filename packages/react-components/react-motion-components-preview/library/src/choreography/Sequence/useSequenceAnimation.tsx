'use client';

import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import type { SequenceProps } from './sequence-types';
import type { SequenceChildMapping } from './utils';

export interface UseSequenceAnimationParams extends Pick<SequenceProps, 'iterations' | 'onMotionFinish'> {
  /** Mapping of child keys to elements and indices */
  childMapping: SequenceChildMapping;
}

export interface UseSequenceAnimationResult {
  /** The current index of the component being animated */
  currentIndex: number;
  /** The current iteration number (0-based) */
  currentIteration: number;
  /** Callback to be passed to the current child's onMotionFinish */
  handleChildFinish: () => void;
}

export function useSequenceAnimation({
  childMapping,
  iterations = 1,
  onMotionFinish,
}: UseSequenceAnimationParams): UseSequenceAnimationResult {
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
    setCurrentIndex(oldIndex => {
      const nextIndex = oldIndex + 1;

      if (nextIndex >= totalChildren) {
        // All children in current iteration finished
        const nextIteration = currentIteration + 1;

        if (nextIteration < iterations) {
          // Start next iteration
          setCurrentIteration(nextIteration);
          return 0; // Loop back to first child
        } else {
          // All iterations complete
          handleMotionFinish();
          return oldIndex; // Stay on last child
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
