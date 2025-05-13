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
  count,
  delay,
  itemDuration = 0,
}: {
  count: number;
  delay: number;
  itemDuration?: number;
}): number {
  if (count <= 1) {
    return Math.max(0, itemDuration);
  }
  const staggerDuration = delay * (count - 1);
  return Math.max(0, staggerDuration + itemDuration);
}

export interface GetStaggerVisibilityParams {
  count: number;
  elapsed: number;
  delay?: number;
  itemDuration?: number;
  // easingFn?: (progress: number) => number;
  direction?: 'enter' | 'exit';
  reversed?: boolean;
}

export interface StaggerVisibilityResult {
  visibility: boolean[];
  totalDuration: number;
  completedSteps: number;
}

// const defaultEasingFn = (t: number) => t;

/**
 * Returns visibility flags plus timing metrics for a stagger sequence.
 */
export function getStaggerVisibility({
  count,
  elapsed,
  delay = 100,
  itemDuration = 0,
  // easingFn = defaultEasingFn,
  direction = 'enter',
  reversed: reverse = false,
}: GetStaggerVisibilityParams): StaggerVisibilityResult {
  if (count <= 0) {
    return { visibility: [], totalDuration: 0, completedSteps: 0 };
  }

  const totalDuration = getStaggerTotalDuration({ count, delay, itemDuration });
  const rawProgress = totalDuration > 0 ? elapsed / totalDuration : 1;
  const progress = Math.min(Math.max(rawProgress, 0), 1);

  // const eased = easingFn(progress);
  const completedSteps = Math.floor(progress * count);

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

export interface UseStaggeredRevealParams extends Omit<GetStaggerVisibilityParams, 'elapsed'> {
  onMotionFinish?: () => void;
}

/**
 * Hook that returns `visibility` array and `visibleCount`, and fires
 * onMotionFinish exactly when the full stagger completes.
 */
export function useStaggeredReveal({
  count,
  delay,
  itemDuration = 0,
  // easingFn = defaultEasingFn,
  direction,
  reversed: reverse = false,
  onMotionFinish,
}: UseStaggeredRevealParams): { visibility: boolean[]; visibleCount: number } {
  const [visibility, setVisibility] = useState<boolean[]>(() => Array(count).fill(direction === 'exit'));
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    startTimeRef.current = null;
    finishedRef.current = false;
    setVisibility(Array(count).fill(direction === 'exit'));

    const tick = (now: number) => {
      if (cancelled) return;
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - (startTimeRef.current as number);

      const result = getStaggerVisibility({
        count,
        elapsed,
        delay,
        itemDuration,
        // easingFn,
        direction,
        reversed: reverse,
      });

      setVisibility(result.visibility);

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
  }, [count, delay, itemDuration, direction, reverse, /* easingFn, */ onMotionFinish]);

  const visibleCount = visibility.filter(Boolean).length;
  return { visibility, visibleCount };
}
