import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { slideAtom } from '../../atoms/slide-atom';

type SlideVariantParams = {
  /** Time (ms) for the enter transition (slide-in). Defaults to the `durationGentle` value (250 ms). */
  duration?: number;

  /** Easing curve for the enter transition (slide-in). Defaults to the `curveDecelerateMax` value.  */
  easing?: string;

  /** Time (ms) for the exit transition (slide-out). Defaults to the `durationNormal` value (200 ms). */
  exitDuration?: number;

  /** Easing curve for the exit transition (slide-out). Defaults to the `curveAccelerateMax` value.  */
  exitEasing?: string;

  /** The X translate value with units to animate from. Defaults to `'0px'`. */
  fromX?: string;

  /** The Y translate value with units to animate from. Defaults to `'-20px'`. */
  fromY?: string;

  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};

/** Define a presence motion for slide in/out */
const slidePresenceFn: PresenceMotionFn<SlideVariantParams> = ({
  duration = motionTokens.durationGentle,
  easing = motionTokens.curveDecelerateMax,
  exitDuration = motionTokens.durationNormal,
  exitEasing = motionTokens.curveAccelerateMax,
  fromX = '0px',
  fromY = '-20px',
  animateOpacity = true,
}) => {
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
  duration: motionTokens.durationNormal,
});

export const SlideRelaxed = createPresenceComponentVariant(Slide, {
  duration: motionTokens.durationSlow,
});