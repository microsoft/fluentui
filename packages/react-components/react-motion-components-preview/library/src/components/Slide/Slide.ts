import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { slideAtom } from '../../atoms/slide-atom';
import { SlideParams } from './slide-types';

/**
 * Define a presence motion for slide in/out
 *
 * @param duration - Time (ms) for the enter transition (slide-in). Defaults to the `durationNormal` value (200 ms).
 * @param easing - Easing curve for the enter transition (slide-in). Defaults to the `curveDecelerateMid` value.
 * @param exitDuration - Time (ms) for the exit transition (slide-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (slide-out). Defaults to the `curveAccelerateMid` value.
 * @param fromX - The X translate value with units to animate from. Defaults to `'0px'`.
 * @param fromY - The Y translate value with units to animate from. Defaults to `'20px'`.
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`.
 */
const slidePresenceFn: PresenceMotionFn<SlideParams> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveDecelerateMid,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMid,
  fromX = '0px',
  fromY = '20px',
  animateOpacity = true,
}: SlideParams) => {
  const enterAtoms = [slideAtom({ direction: 'enter', duration, easing, fromX, fromY })];
  const exitAtoms = [
    slideAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: exitEasing,
      fromX,
      fromY,
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

/** A React component that applies slide in/out transitions to its children. */
export const Slide = createPresenceComponent(slidePresenceFn);

export const SlideSnappy = createPresenceComponentVariant(Slide, {
  easing: motionTokens.curveDecelerateMax,
  exitEasing: motionTokens.curveAccelerateMax,
});

export const SlideRelaxed = createPresenceComponentVariant(Slide, {
  duration: motionTokens.durationGentle,
});
