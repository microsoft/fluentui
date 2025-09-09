import { motionTokens, createPresenceComponent, PresenceDirection, AtomMotion } from '@fluentui/react-motion';
import { MessageBarGroupProps } from './MessageBarGroup.types';

// TODO: import these atoms from react-motion-components-preview once they're available there

interface FadeAtomParams {
  direction: PresenceDirection;
  duration: number;
  easing?: string;
  fromValue?: number;
}

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

/**
 * A presence component for a MessageBar to enter and exit from a MessageBarGroup.
 * It has an optional enter transition of a slide-in and fade-in,
 * when the `animate` prop is set to `'both'`.
 * It always has an exit transition of a fade-out.
 */
export const MessageBarMotion = createPresenceComponent<{ animate?: MessageBarGroupProps['animate'] }>(
  ({ animate }) => {
    const duration = motionTokens.durationGentle;

    return {
      enter:
        animate === 'both'
          ? // enter with slide and fade
            [
              fadeAtom({ direction: 'enter', duration }),
              slideAtom({ direction: 'enter', axis: 'Y', fromValue: '-100%', duration }),
            ]
          : [], // no enter motion

      // Always exit with a fade
      exit: fadeAtom({ direction: 'exit', duration }),
    };
  },
);
