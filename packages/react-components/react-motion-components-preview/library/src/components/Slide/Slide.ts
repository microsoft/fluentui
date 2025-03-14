import {
  motionTokens,
  createPresenceComponent,
  AtomMotion,
  PresenceMotionFn,
  MotionParam,
} from '@fluentui/react-motion';
import { SlideRuntimeParams } from './Slide.types';
import { fadeAtom } from '../../atoms/fade-atom';
import { slideAtom } from '../../atoms/slide-atom';

const slidePresenceFn: PresenceMotionFn<SlideRuntimeParams> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveDecelerateMid,
  exitDuration = duration, // defaults to the enter duration for symmetry
  exitEasing = motionTokens.curveAccelerateMid,
  orientation = 'vertical',
  distance = '20px',
  animateOpacity = true,
}) => {
  // ----- ENTER -----
  const enterAtoms: AtomMotion[] = [
    slideAtom({
      direction: 'enter',
      orientation,
      distance,
      duration,
      easing,
    }),
  ];
  if (animateOpacity) {
    enterAtoms.push(
      fadeAtom({
        direction: 'enter',
        duration,
        easing,
      }),
    );
  } else {
    // TODO: need to test visibility behavior further
    // Since there is no fade-in, use visibility to show the element
    // enterAtoms.push(visibilityAtom({ direction: 'enter', duration }));
  }

  // ----- EXIT -----
  const exitAtoms: AtomMotion[] = [
    slideAtom({
      direction: 'exit',
      orientation,
      distance,
      duration: exitDuration,
      easing: exitEasing,
    }),
  ];
  if (animateOpacity) {
    exitAtoms.push(
      fadeAtom({
        direction: 'exit',
        duration: exitDuration,
        easing: exitEasing,
      }),
    );
  } else {
    // TODO: need to test visibility behavior further
    // Since there is no fade-out, use visibility to hide the element
    // enterAtoms.push(visibilityAtom({ direction: 'exit', duration: exitDuration }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

// TODO: move to createPresenceComponentVariant file
/**
 * Create a variant function that wraps a presence function to customize it.
 * The new presence function has the supplied variant params as defaults,
 * but these can still be overridden by runtime params when the new function is called.
 */
function createPresenceFnVariant<PresenceParams extends Record<string, MotionParam> = {}>(
  presenceFn: PresenceMotionFn<PresenceParams>,
  variantParams: SlideRuntimeParams,
): typeof presenceFn {
  return runtimeParams => presenceFn({ ...variantParams, ...runtimeParams });
}

/** A React component that applies slide in/out transitions to its children. */
export const Slide = createPresenceComponent(slidePresenceFn);

// TODO: use new createPresenceComponentVariant implementation when available
export const SlideSnappy = createPresenceComponent(
  createPresenceFnVariant(slidePresenceFn, {
    duration: motionTokens.durationNormal,
    easing: motionTokens.curveDecelerateMax,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);

export const SlideRelaxed = createPresenceComponent(
  createPresenceFnVariant(slidePresenceFn, {
    duration: motionTokens.durationGentle,
    easing: motionTokens.curveDecelerateMid,
    exitEasing: motionTokens.curveAccelerateMid,
  }),
);
