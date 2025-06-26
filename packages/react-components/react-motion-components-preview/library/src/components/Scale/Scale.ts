import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { scaleAtom } from '../../atoms/scale-atom';

type ScaleVariantParams = {
  /** Time (ms) for the enter transition (scale-in). Defaults to the `durationGentle` value (250 ms). */
  duration?: number;

  /** Easing curve for the enter transition (scale-in). Defaults to the `curveDecelerateMax` value.  */
  easing?: string;

  /** Time (ms) for the exit transition (scale-out). Defaults to the `durationNormal` value (200 ms). */
  exitDuration?: number;

  /** Easing curve for the exit transition (scale-out). Defaults to the `curveAccelerateMax` value.  */
  exitEasing?: string;

  /** The scale value to animate from. Defaults to `0.9`. */
  fromScale?: number;

  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};

/** Define a presence motion for scale in/out */
const scalePresenceFn: PresenceMotionFn<ScaleVariantParams> = ({
  duration = motionTokens.durationGentle,
  easing = motionTokens.curveDecelerateMax,
  exitDuration = motionTokens.durationNormal,
  exitEasing = motionTokens.curveAccelerateMax,
  fromScale = 0.9,
  animateOpacity = true,
}) => {
  const enterAtoms = [scaleAtom({ direction: 'enter', duration, easing, fromValue: fromScale })];
  const exitAtoms = [
    scaleAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: exitEasing,
      fromValue: fromScale,
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
});

export const ScaleRelaxed = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationSlow,
});
