import { motionTokens, createPresenceComponent } from '@fluentui/react-motion';
import { PresenceMotionFnCreator } from '../../types';
import { opacityAtom, scaleAtom } from '../Atoms';
import { ScaleRuntimeParams_unstable, ScaleVariantParams_unstable } from './Scale.types';

/** Define a presence motion for scale in/out */
export const createScalePresence: PresenceMotionFnCreator<ScaleVariantParams_unstable, ScaleRuntimeParams_unstable> =
  ({
    enterDuration = motionTokens.durationGentle,
    enterEasing = motionTokens.curveEasyEaseMax,
    exitDuration = motionTokens.durationNormal,
    exitEasing = motionTokens.curveAccelerateMax,
  } = {}) =>
  ({ animateOpacity = true }) => ({
    enter: [
      scaleAtom({
        duration: enterDuration,
        easing: enterEasing,
      }),
      ...(animateOpacity
        ? [
            opacityAtom({
              duration: enterDuration,
              easing: enterEasing,
            }),
          ]
        : []),
    ],
    exit: [
      scaleAtom({
        duration: exitDuration,
        easing: exitEasing,
        direction: 'reverse',
      }),
      ...(animateOpacity
        ? [
            opacityAtom({
              duration: exitDuration,
              easing: exitEasing,
              direction: 'reverse',
            }),
          ]
        : []),
    ],
  });

/** A React component that applies scale in/out transitions to its children. */
export const Scale = createPresenceComponent(createScalePresence());

export const ScaleSnappy = createPresenceComponent(
  createScalePresence({
    enterDuration: motionTokens.durationNormal,
    enterEasing: motionTokens.curveDecelerateMax,
    exitDuration: motionTokens.durationFast,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);

export const ScaleRelaxed = createPresenceComponent(
  createScalePresence({
    enterDuration: motionTokens.durationSlow,
    enterEasing: motionTokens.curveDecelerateMax,
    exitDuration: motionTokens.durationGentle,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);
