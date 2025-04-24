import * as React from 'react';
import { childrenOrFragmentToArray } from './Series';

export function useStaggeredReveal(count: number, delay: number, onMotionFinish?: () => void): number {
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

// A Stagger is a component that accepts JSX children and renders them in a staggered manner with a set delay
export const Stagger: React.FC<{
  children: React.ReactNode;
  delay?: number;
  autoloop?: boolean;
  reverse?: boolean;
  onMotionFinish?: () => void;
}> = ({ children, delay = 100, reverse = true, autoloop = false, onMotionFinish = () => null }) => {
  const [index, setIndex] = React.useState(-1);
  const components = childrenOrFragmentToArray(children);
  // const visibleCount = useStaggeredReveal(components.length, delay);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (index < components.length - 1) {
        setIndex(index + 1);
      } else if (autoloop) {
        setIndex(0);
      } else {
        // TODO: call onMotionFinish only when the last component is finished
        onMotionFinish();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [index, delay, components.length, autoloop, onMotionFinish]);

  // return all components up to the current index
  return (
    <>
      {components.map((component, i) => {
        if (i <= index) {
          return React.cloneElement(component, { key: i });
        }
        return null;
      })}
    </>
  );
};

/**
 * A PresenceStagger is a component that accepts JSX children and renders them in a staggered manner with a set delay.
 * The difference from Stagger is that PresenceStagger wraps Presence motion components,
 * and shows/hides them by toggling their `visible` properties.
 * Whereas Stagger works with regular JSX children, and it shows/hides them by adding/removing from the DOM.
 * An advantage of PresenceStagger is that the because the children remain in the DOM,
 * they can occupy space while they are hidden, preventing layout shifts.
 */
export const PresenceStagger: React.FC<{
  children: React.ReactNode;
  delay?: number;
  // TODO: refactor to a `visible` Boolean prop similar to Presence
  mode?: 'enter' | 'exit' | 'enterReverse' | 'exitReverse';
  exit?: boolean;
  reverse?: boolean;
  onMotionFinish?: () => void;
}> = ({ children, delay = 500, exit = false, reverse = false, mode = 'enter', onMotionFinish }) => {
  const components = childrenOrFragmentToArray(children);
  // TODO: useStaggeredIndex instead?
  const visibleCount = useStaggeredReveal(components.length, delay, onMotionFinish);

  const index = visibleCount - 1;

  // return all components up to the current index
  return (
    <>
      {components.map((component, i) => {
        let visible = false;
        if (mode === 'enter') {
          visible = i <= index;
        } else if (mode === 'exit') {
          visible = !(i <= index);
        } else if (mode === 'exitReverse') {
          visible = components.length - i > index + 1;
        } else if (mode === 'enterReverse') {
          visible = !(components.length - i > index + 1);
        }
        // if (exit) {
        //   visible = !visible;
        // }
        return React.cloneElement(component, { key: i, visible });
      })}
    </>
  );
};
