import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

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
  delay,
  itemDuration = 200,
}: {
  itemCount: number;
  delay: number;
  itemDuration?: number;
}): number {
  if (itemCount <= 1) {
    return Math.max(0, itemDuration);
  }
  const staggerDuration = delay * (itemCount - 1);
  return Math.max(0, staggerDuration + itemDuration);
}

export interface StaggerItemsVisibilityAtTimeParams {
  itemCount: number;
  elapsed: number;
  delay?: number;
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
  delay = 100,
  itemDuration = 0,
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

  const totalDuration = getStaggerTotalDuration({ itemCount, delay, itemDuration });
  const rawProgress = totalDuration > 0 ? elapsed / totalDuration : 1;
  const progress = Math.min(Math.max(rawProgress, 0), 1);

  const completedSteps = Math.floor(progress * itemCount);

  const itemsVisibility = Array.from({ length: itemCount }, (_, idx) => {
    const fromStart = idx < completedSteps;
    const fromEnd = idx >= itemCount - completedSteps;

    let itemVisibility = reversed ? fromEnd : fromStart;
    if (direction === 'exit') {
      // For exit, invert the visibility logic
      itemVisibility = !itemVisibility;
    }
    return itemVisibility;
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
  itemCount: count,
  delay,
  itemDuration = 0,
  direction,
  reversed = false,
  onMotionFinish,
}: UseStaggerItemsVisibilityParams): { itemsVisibility: boolean[] } {
  const [itemsVisibility, setItemsVisibility] = useState<boolean[]>(() => Array(count).fill(direction === 'exit'));
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    startTimeRef.current = null;
    finishedRef.current = false;
    // Reset visibility array to initial state
    setItemsVisibility(Array(count).fill(direction === 'exit'));

    const tick = (now: number) => {
      if (cancelled) return;
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - (startTimeRef.current as number);

      const result = staggerItemsVisibilityAtTime({
        itemCount: count,
        elapsed,
        delay,
        itemDuration,
        direction,
        reversed,
      });

      setItemsVisibility(result.itemsVisibility);

      if (elapsed < result.totalDuration) {
        frameRef.current = requestAnimationFrame(tick);
      } else if (!finishedRef.current) {
        finishedRef.current = true;
        onMotionFinish?.();
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [count, delay, itemDuration, direction, reversed, onMotionFinish]);

  return { itemsVisibility };
}
