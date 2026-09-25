import type { PresenceMotionFn } from '@fluentui/react-motion';
import { motionTokens, createPresenceComponent } from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { blurAtom } from '../../atoms/blur-atom';
import type { BlurParams } from './blur-types';

/**
 * Define a presence motion for blur in/out
 *
 * @param duration - Time (ms) for the enter transition (blur-in). Defaults to the `durationSlow` value (300 ms).
 * @param easing - Easing curve for the enter transition (blur-in). Defaults to the `curveDecelerateMin` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (blur-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (blur-out). Defaults to the `curveAccelerateMin` value.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param fromRadius - Blur radius before entry. Defaults to `'10px'`.
 * @param restRadius - Blur radius while visible. Defaults to `'0px'`.
 * @param toRadius - Blur radius after exit. Defaults to `fromRadius`.
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
  restRadius = '0px',
  toRadius = fromRadius,
  animateOpacity = true,
}) => {
  const enterAtoms = [blurAtom({ duration, easing, delay, fromRadius, toRadius: restRadius })];
  const exitAtoms = [
    blurAtom({
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
      fromRadius: restRadius,
      toRadius,
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
