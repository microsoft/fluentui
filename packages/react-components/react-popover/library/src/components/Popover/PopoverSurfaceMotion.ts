import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { fadeAtom, slideAtom } from '@fluentui/react-motion-components-preview';

/**
 * CSS custom properties that encode the slide direction for the popover enter animation.
 * They are set at runtime by `usePositioningSlideDirection` based on the Floating UI
 * placement (e.g. "top", "bottom-start", etc.) and registered via the CSS Houdini
 * `registerProperty()` API so the browser can interpolate them as `<length>` values
 * during the Web Animations API keyframes.
 *
 * Values are signed vectors (e.g. `0px`, `1px`, `-1px`) that represent the axis
 * and direction the popover should slide *from* when entering.
 * The `mainAxis` multiplier scales these offsets to the desired travel distance.
 */
export const slideDirectionVarX = '--fui-positioning-slide-direction-x';
export const slideDirectionVarY = '--fui-positioning-slide-direction-y';

// Shared timing constants for the enter animation.
const duration = motionTokens.durationSlower;
const easing = motionTokens.curveDecelerateMid;

/**
 * Default `surfaceMotion` slot for `<Popover>`.
 *
 * Enter-only animation combining a fade and a direction-aware slide.
 * The slide reads CSS variables set by `usePositioningSlideDirection` and scales
 * them by `mainAxis` pixels. There is no exit animation; the surface unmounts immediately.
 *
 * @param mainAxis - Travel distance (px) for the enter slide. Defaults to `10`.
 */
export const PopoverSurfaceMotion = createPresenceComponent<{ mainAxis: number }>(({ mainAxis = 10 }) => ({
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
