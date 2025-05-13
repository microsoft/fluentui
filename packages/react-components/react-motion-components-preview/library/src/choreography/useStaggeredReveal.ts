import { useState, useRef, useEffect } from 'react';
import { getStaggerVisibility, GetStaggerVisibilityParams, StaggerVisibilityResult } from './getStaggerVisibility';

// A single, stable default easing function
const defaultEasingFn = (t: number) => t;

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
  easingFn = defaultEasingFn, // don't inline a default because it will be a new function on every render
  direction,
  reversed: reverse = false,
  onMotionFinish,
}: UseStaggeredRevealParams): { visibility: boolean[]; visibleCount: number } {
  // Use the provided easingFn if any, otherwise the stable default
  // const actualEasingFn = easingFn ?? defaultEasingFn;
  // easingFn = easingFn ?? defaultEasingFn;

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

      const result: StaggerVisibilityResult = getStaggerVisibility({
        count,
        elapsed,
        delay,
        itemDuration,
        easingFn,
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
  }, [count, delay, itemDuration, direction, reverse, easingFn, onMotionFinish]);

  const visibleCount = visibility.filter(Boolean).length;
  return { visibility, visibleCount };
}
