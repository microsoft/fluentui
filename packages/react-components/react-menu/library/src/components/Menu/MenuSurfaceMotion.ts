import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { fadeAtom, slideAtom } from '@fluentui/react-motion-components-preview';
import {
  POSITIONING_SLIDE_DIRECTION_VAR_X as slideDirectionVarX,
  POSITIONING_SLIDE_DIRECTION_VAR_Y as slideDirectionVarY,
} from '@fluentui/react-positioning';

// Shared timing constants for the enter animation.
const duration = motionTokens.durationSlower;
const easing = motionTokens.curveDecelerateMid;

/**
 * Default `surfaceMotion` slot for `<Menu>`.
 *
 * Enter-only animation combining a fade and a direction-aware slide.
 * The slide reads CSS variables set by `usePositioningSlideDirection` and scales
 * them by `mainAxis` pixels. There is no exit animation; the surface unmounts immediately.
 *
 * @param mainAxis - Travel distance (px) for the enter slide. Defaults to `10`.
 */
export const MenuSurfaceMotion = createPresenceComponent<{ mainAxis: number }>(({ mainAxis = 10 }) => ({
  enter: [
    fadeAtom({ duration, easing, direction: 'enter' }),
    {
      // slideAtom produces translate keyframes from `outX`/`outY` → `0px`.
      // The `outX`/`outY` values read the positioning-provided CSS variables and scale
      // them by `mainAxis` so the surface slides in from the correct direction.
      ...slideAtom({
        duration,
        easing,
        direction: 'enter',
        outX: `calc(var(${slideDirectionVarX}, 0px) * ${mainAxis})`,
        outY: `calc(var(${slideDirectionVarY}, 0px) * ${mainAxis})`,
      }),
      // 'accumulate' compositing adds this effect's transform on top of the element's
      // existing transform, preserving any transform applied by the positioning engine.
      composite: 'accumulate',
    },
  ],
  // No exit animation — the surface unmounts immediately on close.
  exit: [],
}));
