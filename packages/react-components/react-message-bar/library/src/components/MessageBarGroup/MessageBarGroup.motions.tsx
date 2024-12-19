import * as React from 'react';
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
 * A presence motion component that enters by sliding in from the top and fading in,
 * and exits by just fading out.
 */
const SlideInFadeOut = createPresenceComponent(() => {
  const duration = motionTokens.durationGentle;

  return {
    enter: [
      fadeAtom({ direction: 'enter', duration }),
      slideAtom({ direction: 'enter', axis: 'Y', fromValue: '-100%', duration }),
    ],

    exit: fadeAtom({ direction: 'exit', duration }),
  };
});

/**
 * A presence motion component with only an exit transition of fading out.
 */
const FadeOut = createPresenceComponent(() => {
  return {
    enter: [],

    exit: fadeAtom({ direction: 'exit', duration: motionTokens.durationGentle }),
  };
});

/**
 * A compound component that renders a `SlideInFadeOut` or `FadeOut` component,
 * depending on the `animate` prop being `'both'` or not.
 */
export const MessageBarMotion: React.FC<{
  animate: MessageBarGroupProps['animate'];
  children: React.ReactElement;
}> = ({ animate, children }) =>
  animate === 'both' ? (
    // enter with slide and fade; exit with fade
    <SlideInFadeOut>{children}</SlideInFadeOut>
  ) : (
    // no enter motion; exit with fade
    <FadeOut>{children}</FadeOut>
  );
