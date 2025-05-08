import * as React from 'react';

export function useStaggeredReveal({
  count,
  delay,
  onMotionFinish,
}: {
  count: number;
  delay: number;
  onMotionFinish?: () => void;
}): number {
  const [visibleCount, setVisibleCount] = React.useState(0);
  const startTimeRef = React.useRef<number | null>(null);
  const frameRef = React.useRef<number | null>(null);
  const finishedRef = React.useRef(false);

  React.useEffect(() => {
    let cancelled = false;
    finishedRef.current = false;

    const tick = (now: number) => {
      if (cancelled) return;
      if (startTimeRef.current === null) startTimeRef.current = now;

      const elapsed = now - startTimeRef.current;
      // TODO: make easing a parameter
      // const easing = (t: number) => t * t * t; // easeInCubic
      const easing = (t: number) => t * t * t * t; // easeInQuart

      // TODO: consider whether this is the best calculation for total duration
      const totalDuration = count * delay;
      const progress = elapsed / totalDuration;
      const easedElapsed = easing(progress);
      const expectedVisible = Math.floor(easedElapsed * count);
      // const expectedVisible = Math.floor(elapsed / delay);
      if (expectedVisible > visibleCount && expectedVisible < count) {
        setVisibleCount(expectedVisible);
      }

      if (expectedVisible < count) {
        frameRef.current = requestAnimationFrame(tick);
      } else if (!finishedRef.current) {
        setVisibleCount(count);
        finishedRef.current = true;
        // HACK: delay the call to onMotionFinish to allow the last component to render
        // TODO: wait for the last component to finish animating before calling onMotionFinish
        setTimeout(() => onMotionFinish?.(), 2000);
        // onMotionFinish?.(); // call onMotionFinish once
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [count, delay, visibleCount, onMotionFinish]);

  return visibleCount;
}
