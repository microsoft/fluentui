import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { fadeAtom, slideAtom } from '@fluentui/react-motion-components-preview';

export const slideDirectionVarX = '--fui-positioning-slide-direction-x';
export const slideDirectionVarY = '--fui-positioning-slide-direction-y';

const duration = motionTokens.durationSlower;
const easing = motionTokens.curveDecelerateMid;

export const PopoverSurfaceMotion = createPresenceComponent<{ mainAxis: number }>(({ mainAxis = 10 }) => ({
  enter: [
    fadeAtom({ duration, easing, direction: 'enter' }),
    {
      ...slideAtom({
        duration,
        easing,
        direction: 'enter',
        outX: `calc(var(${slideDirectionVarX}, 0px) * ${mainAxis})`,
        outY: `calc(var(${slideDirectionVarY}, 0px) * ${mainAxis})`,
      }),
      composite: 'accumulate',
    },
  ],
  exit: [],
}));
