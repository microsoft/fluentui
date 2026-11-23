import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { fadeIn, slideIn } from '@fluentui/react-motion-components-preview';
import {
  POSITIONING_SLIDE_DIRECTION_VAR_X as slideDirectionVarX,
  POSITIONING_SLIDE_DIRECTION_VAR_Y as slideDirectionVarY,
} from '@fluentui/react-positioning';

// Shared timing constants for the enter animation.
const duration = motionTokens.durationSlower;
const easing = motionTokens.curveDecelerateMid;

/**
 * Default `surfaceMotion` slot for `<Popover>`.
 *
 * Enter-only animation combining a fade and a direction-aware slide.
 * The slide reads CSS variables set by `usePositioningSlideDirection` and scales
 * them by `distance` pixels. There is no exit animation; the surface unmounts immediately.
 *
 * @param distance - Travel distance (px) for the enter slide. Defaults to `10`.
 */
export const PopoverSurfaceMotion = createPresenceComponent(({ distance = 10 }: { distance?: number }) => ({
  enter: [
    fadeIn({ duration, easing }),
    {
      // slideIn produces translate keyframes from `from` → `0px 0px`.
      // The `from` values read the positioning-provided CSS variables and scale
      // them by `distance` so the surface slides in from the correct direction.
      ...slideIn({
        duration,
        easing,
        from: {
          x: `calc(var(${slideDirectionVarX}, 0px) * ${distance})`,
          y: `calc(var(${slideDirectionVarY}, 0px) * ${distance})`,
        },
      }),
      // 'accumulate' compositing adds this effect's transform on top of the element's
      // existing transform, preserving any transform applied by the positioning engine.
      composite: 'accumulate',
    },
  ],
  // No exit animation — the surface unmounts immediately on close.
  exit: [],
}));
