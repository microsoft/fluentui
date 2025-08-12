import * as React from 'react';
import { useAnimationFrame } from '@fluentui/react-utilities';

export const DEFAULT_ITEM_DELAY = 100;
export const DEFAULT_ITEM_DURATION = 200;

/**
 * Flattens ReactNode (including Fragments) to an array of valid ReactElements,
 * filtering out strings, numbers, null, etc.
 */
export const toElementArray = (children: React.ReactNode): React.ReactElement[] =>
  React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];

/**
 * Returns true if the given child is a React Fragment.
 */
export const isFragment = (child: React.ReactNode): child is React.ReactElement =>
  React.isValidElement(child) && child.type === React.Fragment;

/**
 * Convert React children that might be a Fragment or other JSX into a clean array of React elements.
 */
export const childrenOrFragmentToArray = (children: React.ReactNode): React.ReactElement[] => {
  if (isFragment(children)) {
    return toElementArray(children.props.children);
  }
  return toElementArray(children);
};

/**
 * Calculate the total stagger duration—from the moment stagger begins
 * until the final item’s animation completes.
 *
 * Uses the formula:
 *   max(0, delay * (count - 1) + itemDuration)
 *
 * @param params.count        Total number of items to stagger
 * @param params.delay        Milliseconds between the start of each item
 * @param params.itemDuration Milliseconds each item’s animation lasts (default 0)
 * @returns                   Total duration in milliseconds (never negative)
 */
export function getStaggerTotalDuration({
  itemCount,
  itemDelay,
  itemDuration = DEFAULT_ITEM_DURATION,
}: {
  itemCount: number;
  itemDelay: number;
  itemDuration?: number;
}): number {
  if (itemCount <= 0) {
    return 0;
  }
  if (itemCount <= 1) {
    return Math.max(0, itemDuration);
  }
  const staggerDuration = itemDelay * (itemCount - 1);
  return Math.max(0, staggerDuration + itemDuration);
}

export interface StaggerItemsVisibilityAtTimeParams {
  itemCount: number;
  elapsed: number;
  itemDelay?: number;
  itemDuration?: number;
  direction?: 'enter' | 'exit';
  reversed?: boolean;
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
    // For enter: Math.floor(elapsed / itemDelay) gives 0 at t=0, but we want 1 item visible
    // For exit: Math.floor(elapsed / itemDelay) gives 0 at t=0, which we'll negate to show all items
    const offset = direction === 'enter' ? 1 : 0;
    const stepsFromElapsedTime = Math.floor(elapsed / itemDelay) + offset;
    // Clamp to itemCount to prevent showing more items than we have
    completedSteps = Math.min(itemCount, stepsFromElapsedTime);
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

export interface UseStaggerItemsVisibilityParams extends Omit<StaggerItemsVisibilityAtTimeParams, 'elapsed'> {
  onMotionFinish?: () => void;
}

/**
 * Hook that tracks the visibility of a staggered sequence of items as time progresses.
 * It takes the total number of items, a delay between each item, and an optional item duration,
 * and optionally a direction ('enter' or 'exit') and whether to reverse the order.
 * It fires the onMotionFinish callback when the full stagger completes.
 *
 * @returns An `itemsVisibility` array of booleans that indicates which items are currently visible.
 */
export function useStaggerItemsVisibility({
  itemCount,
  itemDelay,
  itemDuration = DEFAULT_ITEM_DURATION,
  direction,
  reversed = false,
  onMotionFinish,
}: UseStaggerItemsVisibilityParams): { itemsVisibility: boolean[] } {
  const [requestAnimationFrame, cancelAnimationFrame] = useAnimationFrame();
  const [itemsVisibility, setItemsVisibility] = React.useState<boolean[]>(() => {
    // Initial state should be the final state of the animation, not the starting state
    // For 'enter' direction: final state is visible (true)
    // For 'exit' direction: final state is hidden (false)
    return Array(itemCount).fill(direction === 'enter');
  });
  const startTimeRef = React.useRef<number | null>(null);
  const frameRef = React.useRef<number | null>(null);
  const finishedRef = React.useRef(false);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    let cancelled = false;
    startTimeRef.current = null;
    finishedRef.current = false;

    // On first render, items should already be in their final state (set in useState)
    // On subsequent renders, we need to animate from the start state to the final state
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Items are already in the correct final state, no animation needed
      onMotionFinish?.();
      return () => {
        cancelled = true;
        if (frameRef.current) {
          cancelAnimationFrame();
        }
      };
    }

    // For animations, we start from the opposite of the final state:
    // - Enter animation: start hidden (false), animate to visible (true)
    // - Exit animation: start visible (true), animate to hidden (false)
    const startState = direction === 'exit';
    setItemsVisibility(Array(itemCount).fill(startState));

    const tick = (now: number) => {
      if (cancelled) {
        return;
      }
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }
      const elapsed = now - (startTimeRef.current as number);

      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed,
        itemDelay,
        itemDuration,
        direction,
        reversed,
      });

      setItemsVisibility(result.itemsVisibility);

      if (elapsed < result.totalDuration) {
        frameRef.current = requestAnimationFrame(tick as () => void);
      } else if (!finishedRef.current) {
        finishedRef.current = true;
        onMotionFinish?.();
      }
    };

    frameRef.current = requestAnimationFrame(tick as () => void);
    return () => {
      cancelled = true;
      if (frameRef.current) {
        cancelAnimationFrame();
      }
    };
  }, [
    itemCount,
    itemDelay,
    itemDuration,
    direction,
    reversed,
    onMotionFinish,
    requestAnimationFrame,
    cancelAnimationFrame,
  ]);

  return { itemsVisibility };
}
