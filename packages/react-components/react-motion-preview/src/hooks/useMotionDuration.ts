import { MotionOptions, MotionState, useMotionPresence } from './useMotionPresence';

export type UseMotionDurationOptions = Pick<MotionOptions, 'animateOnFirstMount' | 'duration'>;
export type MotionShorthandValue = boolean;
export type MotionShorthand<Element extends HTMLElement = HTMLElement> = MotionShorthandValue | MotionState<Element>;

/**
 * Hook to manage the presence of an element in the DOM based on its CSS transition/animation state.
 *
 * @param props - Motion props to manage the presence of an element in the DOM
 * @param options - Motion options to configure the hook
 */
export function useMotionDuration<Element extends HTMLElement>(
  shorthand: MotionShorthand<Element>,
  options?: UseMotionDurationOptions,
): MotionState<Element> {
  const isShorthand = typeof shorthand === 'object';
  const motion = useMotionPresence<Element>(isShorthand ? false : shorthand, options);

  return isShorthand ? shorthand : motion;
}
