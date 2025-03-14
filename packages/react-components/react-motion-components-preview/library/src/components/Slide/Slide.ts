import { motionTokens, createPresenceComponent, AtomMotion } from '@fluentui/react-motion';
import { PresenceMotionFnCreator } from '../../types';
import { SlideRuntimeParams, SlideVariantParams } from './Slide.types';
import { fadeAtom } from '../../atoms/fade-atom';
import { slideAtom } from '../../atoms/slide-atom';

/** Define a presence motion for slide in/out */
export const createSlidePresence: PresenceMotionFnCreator<SlideVariantParams, SlideRuntimeParams> =
  ({
    duration = motionTokens.durationNormal,
    easing = motionTokens.curveDecelerateMid,
    exitDuration = duration, // defaults to the enter duration for symmetry
    exitEasing = motionTokens.curveAccelerateMid,
  } = {}) =>
  ({ animateOpacity = true, orientation = 'vertical', distance = '20px' }) => {
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

/** A React component that applies slide in/out transitions to its children. */
export const Slide = createPresenceComponent(createSlidePresence());

export const SlideSnappy = createPresenceComponent(
  createSlidePresence({
    duration: motionTokens.durationNormal,
    easing: motionTokens.curveDecelerateMax,
    exitDuration: motionTokens.durationNormal,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);

export const SlideRelaxed = createPresenceComponent(
  createSlidePresence({
    duration: motionTokens.durationGentle,
    easing: motionTokens.curveDecelerateMid,
    exitDuration: motionTokens.durationGentle,
    exitEasing: motionTokens.curveAccelerateMid,
  }),
);
