import { motionTokens, createPresenceComponent, PresenceMotionFn } from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { blurAtom } from '../../atoms/blur-atom';
import { BlurParams } from './blur-types';

/**
 * Define a presence motion for blur in/out
 *
 * @param fromRadius - The radius of pixels to blend into the blur. A length string, defaulting to '10px'.
 * @param duration - Time (ms) for the enter transition (blur-in). Defaults to the `durationSlow` value (300 ms).
 * @param easing - Easing curve for the enter transition (blur-in). Defaults to the `curveDecelerateMin` value.
 * @param exitDuration - Time (ms) for the exit transition (blur-out). Defaults to the enter duration.
 * @param exitEasing - Easing curve for the exit transition (blur-out). Defaults to the `curveAccelerateMin` value.
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`.
 */
const blurPresenceFn: PresenceMotionFn<BlurParams> = ({
  fromRadius = '10px',
  duration = motionTokens.durationSlow,
  easing = motionTokens.curveDecelerateMin,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMin,
  animateOpacity = true,
}) => {
  const enterAtoms = [blurAtom({ direction: 'enter', duration, easing, fromRadius })];
  const exitAtoms = [
    blurAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: exitEasing,
      fromRadius,
    }),
  ];

  // Only add fade atoms if animateOpacity is true.
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration, easing }));
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

/** A React component that applies blur in/out transitions to its children. */
export const Blur = createPresenceComponent(blurPresenceFn);
