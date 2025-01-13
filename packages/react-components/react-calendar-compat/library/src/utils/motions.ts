import { Vertical } from './../../../../../../apps/vr-tests-react-components/src/stories/Tabs.stories';
import { createMotionComponent, PresenceDirection, motionTokens, AtomMotion } from '@fluentui/react-motion';

interface FadeAtomParams {
  direction: PresenceDirection;
  duration: number;
  easing?: string;
  fromValue?: number;
}

// For now, this is copied from MessageBarGroup.motions.tsx
// TODO: move to a centralized location and import from there
/**
 * Generates a motion atom object for a fade in or fade out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param fromValue - The starting opacity value. Defaults to 0.
 * @returns A motion atom object with opacity keyframes and the supplied duration and easing.
 */
const fadeAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  fromValue = 0,
}: FadeAtomParams): AtomMotion => {
  const keyframes = [{ opacity: fromValue }, { opacity: 1 }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
  };
};

// For now, this is copied from MessageBarGroup.motions.tsx
// TODO: move to a centralized location and import from there
/**
 * Generates a motion atom object for an X or Y translation, from a specified distance to zero.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param axis - The axis of the translation: 'X' or 'Y'.
 * @param fromValue - The starting position of the slide; it can be a percentage or pixels.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveDecelerateMid`.
 */
const slideAtom = ({
  direction,
  axis,
  fromValue,
  duration,
  easing = motionTokens.curveDecelerateMid,
}: {
  direction: PresenceDirection;
  axis: 'X' | 'Y';
  fromValue: string;
  duration: number;
  easing?: string;
}): AtomMotion => {
  const keyframes = [{ transform: `translate${axis}(${fromValue})` }, { transform: `translate${axis}(0)` }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
  };
};

export const createVerticalSlideFadeMotion = ({
  distance = '20px',
  reverse = false,
  duration = 367,
  easing = motionTokens.curveDecelerateMax,
} = {}) => {
  // TODO: animateOpacity runtime param?
  return createMotionComponent(() => {
    return [
      slideAtom({ direction: 'enter', axis: 'Y', fromValue: reverse ? `-${distance}` : distance, duration, easing }),
      fadeAtom({ direction: 'enter', duration, easing }),
    ];
  });
};

// An alternate approach where both directions of the the slide are in a single motion component,
// with up vs. down controlled by a runtime param `reverse`.
export const createVerticalSlideFadeMotion_combined = ({
  distance = '20px', // TODO: make this a runtime param?
  duration = 367,
  easing = motionTokens.curveDecelerateMax,
} = {}) => {
  return createMotionComponent(
    ({ reverse = false, animateOpacity = true }: { reverse?: boolean; animateOpacity?: boolean }) => {
      const atoms = [
        slideAtom({ direction: 'enter', axis: 'Y', fromValue: reverse ? `-${distance}` : distance, duration, easing }),
      ];
      if (animateOpacity) {
        atoms.push(fadeAtom({ direction: 'enter', duration, easing }));
      }
      return atoms;
    },
  );
};

export const SlideUp = createVerticalSlideFadeMotion();
export const SlideDown = createVerticalSlideFadeMotion({ reverse: true });
// TODO: test using this instead of SlideUp/SlideDown
export const VerticalSlide = createVerticalSlideFadeMotion_combined();
