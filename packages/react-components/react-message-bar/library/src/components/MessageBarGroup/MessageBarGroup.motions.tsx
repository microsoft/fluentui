import { motionTokens, createPresenceComponent, PresenceDirection, AtomMotion } from '@fluentui/react-motion';
import { MessageBarGroupProps } from './MessageBarGroup.types';

// TODO: import these atoms from react-motion-components-preview once they're available there

type BaseAtomParams = {
  /** The functional direction of the motion: 'enter' or 'exit'. */
  direction: PresenceDirection;

  /** The duration of the motion in milliseconds. */
  duration: number;

  /** The easing curve for the motion. */
  easing?: EffectTiming['easing'];

  /** Time (ms) to delay the animation. */
  delay?: EffectTiming['delay'];
};

interface FadeAtomParams extends BaseAtomParams {
  /** Defines how values are applied before and after execution. Defaults to 'both'. */
  fill?: FillMode;

  /** The starting opacity value. Defaults to 0. */
  fromOpacity?: number;
}

/**
 * Generates a motion atom object for a fade-in or fade-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param delay - The delay before the motion starts. Defaults to 0.
 * @param fromOpacity - The starting opacity value. Defaults to 0.
 * @returns A motion atom object with opacity keyframes and the supplied duration and easing.
 */
export const fadeAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fromOpacity = 0,
}: FadeAtomParams): AtomMotion => {
  const keyframes = [{ opacity: fromOpacity }, { opacity: 1 }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
    delay,
    // Applying opacity backwards and forwards in time is important
    // to avoid a bug where a delayed animation is not hidden when it should be.
    fill: 'both',
  };
};

interface SlideAtomParams extends BaseAtomParams {
  fromX?: string;
  fromY?: string;
}

/**
 * Generates a motion atom object for a slide-in or slide-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param fromX - The starting X translate value with units (e.g., '0px', '100%'). Defaults to '0px'.
 * @param fromY - The starting Y translate value with units (e.g., '-20px', '100%'). Defaults to '0px'.
 * @returns A motion atom object with translate keyframes and the supplied duration and easing.
 */
export const slideAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fromX = '0px',
  fromY = '20px',
}: SlideAtomParams): AtomMotion => {
  const keyframes = [{ translate: `${fromX} ${fromY}` }, { translate: '0px 0px' }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
    delay,
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
            [fadeAtom({ direction: 'enter', duration }), slideAtom({ direction: 'enter', fromY: '-100%', duration })]
          : [], // no enter motion

      // Always exit with a fade
      exit: fadeAtom({ direction: 'exit', duration }),
    };
  },
);
