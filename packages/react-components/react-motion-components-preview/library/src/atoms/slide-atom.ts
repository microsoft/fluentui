import { PresenceDirection, AtomMotion } from '@fluentui/react-motion/src/types';
import { SlideOrientation } from '../components/Slide/Slide.types';

/**
 * Generates a motion atom object for a horizontal or vertical translation, from a specified distance to zero.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param orientation - The axis of the translation: 'X' or 'Y'.
 * @param distance - The distance of the slide relative to the natural position. It can be pixels or other length unit.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion.
 */
export const slideAtom = ({
  direction,
  orientation,
  distance,
  duration,
  easing,
}: {
  direction: PresenceDirection;
  orientation: SlideOrientation;
  distance: string;
  duration: number;
  easing: string;
}): AtomMotion => {
  const axis: 'X' | 'Y' = orientation === 'horizontal' ? 'X' : 'Y';
  const keyframes = [{ transform: `translate${axis}(${distance})` }, { transform: `translate${axis}(0)` }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
  };
};
