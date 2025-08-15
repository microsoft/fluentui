import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { scaleAtom } from '../../atoms/scale-atom';
import { ScaleParams } from './scale-types';

/**
 * Define a presence motion for scale in/out
 *
 * @param duration - Time (ms) for the enter transition (scale-in). Defaults to the `durationGentle` value (250 ms).
 * @param easing - Easing curve for the enter transition (scale-in). Defaults to the `curveDecelerateMax` value.
 * @param exitDuration - Time (ms) for the exit transition (scale-out). Defaults to the `durationNormal` value (200 ms).
 * @param exitEasing - Easing curve for the exit transition (scale-out). Defaults to the `curveAccelerateMax` value.
 * @param fromScale - The scale value to animate from. Defaults to `0.9`.
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`.
 */
const scalePresenceFn: PresenceMotionFn<ScaleParams> = ({
  duration = motionTokens.durationGentle,
  easing = motionTokens.curveDecelerateMax,
  exitDuration = motionTokens.durationNormal,
  exitEasing = motionTokens.curveAccelerateMax,
  fromScale = 0.9,
  animateOpacity = true,
}) => {
  const enterAtoms = [scaleAtom({ direction: 'enter', duration, easing, fromScale })];
  const exitAtoms = [
    scaleAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: exitEasing,
      fromScale,
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

/** A React component that applies scale in/out transitions to its children. */
export const Scale = createPresenceComponent(scalePresenceFn);

export const ScaleSnappy = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationNormal,
  exitDuration: motionTokens.durationFast,
});

export const ScaleRelaxed = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationSlow,
  exitDuration: motionTokens.durationGentle,
});
