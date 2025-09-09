import { motionTokens, createPresenceComponent, PresenceMotionFn } from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { blurAtom } from '../../atoms/blur-atom';
import { BlurParams } from './blur-types';

/**
 * Define a presence motion for blur in/out
 *
 * @param duration - Time (ms) for the enter transition (blur-in). Defaults to the `durationSlow` value (300 ms).
 * @param easing - Easing curve for the enter transition (blur-in). Defaults to the `curveDecelerateMin` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (blur-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (blur-out). Defaults to the `curveAccelerateMin` value.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param fromRadius - The blur radius with units to animate from. Defaults to `'10px'`.
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`.
 */
const blurPresenceFn: PresenceMotionFn<BlurParams> = ({
  duration = motionTokens.durationSlow,
  easing = motionTokens.curveDecelerateMin,
  delay = 0,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMin,
  exitDelay = delay,
  fromRadius = '10px',
  animateOpacity = true,
}) => {
  const enterAtoms = [blurAtom({ direction: 'enter', duration, easing, delay, fromRadius })];
  const exitAtoms = [
    blurAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
      fromRadius,
    }),
  ];

  // Only add fade atoms if animateOpacity is true.
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration, easing, delay }));
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing, delay: exitDelay }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

/** A React component that applies blur in/out transitions to its children. */
export const Blur = createPresenceComponent(blurPresenceFn);
