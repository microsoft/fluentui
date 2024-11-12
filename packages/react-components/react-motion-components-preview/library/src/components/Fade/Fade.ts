import { motionTokens, createPresenceComponent } from '@fluentui/react-motion';
import type { PresenceMotionCreator } from '../../types';
import type { FadeVariantParams } from './Fade.types';
import { opacityAtom } from '../Atoms';

/** Define a presence motion for fade in/out  */
export const createFadePresence: PresenceMotionCreator<FadeVariantParams> = ({
  enterDuration = motionTokens.durationNormal,
  enterEasing = motionTokens.curveEasyEase,
  exitDuration = enterDuration,
  exitEasing = enterEasing,
} = {}) => ({
  enter: opacityAtom({ duration: enterDuration, easing: enterEasing }),
  exit: opacityAtom({ duration: exitDuration, easing: exitEasing, direction: 'reverse' }),
});

/** A React component that applies fade in/out transitions to its children. */
export const Fade = createPresenceComponent(createFadePresence());

export const FadeSnappy = createPresenceComponent(createFadePresence({ enterDuration: motionTokens.durationFast }));

export const FadeRelaxed = createPresenceComponent(createFadePresence({ enterDuration: motionTokens.durationGentle }));
