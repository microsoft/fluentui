import { createPresenceComponent } from '../../../factories/createPresenceComponent';
import { motionTokens } from '../../motionTokens';
import { PresenceMotion } from '../../../types';
import { createVariantComponent } from '../../../factories/createVariantComponent';

const { durationNormal, durationFast, durationGentle, curveEasyEase } = motionTokens;

const duration = durationNormal;
const easing = curveEasyEase;

/** Define a presence motion for fade in/out  */
const fadeMotion: PresenceMotion = {
  enter: { duration, easing, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
  exit: { duration, easing, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
};

/** A React component that applies fade in/out transitions to its children. */
export const Fade = createPresenceComponent(fadeMotion);

export const FadeSnappy = createVariantComponent(Fade, { all: { duration: durationFast } });

export const FadeExaggerated = createVariantComponent(Fade, { all: { duration: durationGentle } });
