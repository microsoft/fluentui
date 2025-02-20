import { AtomMotion, PresenceDirection } from '@fluentui/react-motion';

/**
 * Generates a motion atom object for visibility, toggling between 'visible' and 'hidden'.
 * This is useful for making elements disappear when there is no fade-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @returns A motion atom object with visibility keyframes and the supplied duration.
 */
export const visibilityAtom = ({
  direction,
  duration,
}: {
  direction: PresenceDirection;
  duration: number;
}): AtomMotion => {
  const visibility = direction === 'enter' ? 'visible' : 'hidden';
  // For the exit animation, offset is 1 so the keyframe to set visibility to 'hidden' is at the end of the animation.
  const offset = direction === 'enter' ? 0 : 1;
  return {
    keyframes: [{ visibility, offset }],
    duration,
  };
};
