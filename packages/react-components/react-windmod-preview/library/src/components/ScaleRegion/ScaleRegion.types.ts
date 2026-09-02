import type * as React from 'react';

export type ScaleRegionProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Unitless multiplier on the ambient base scale for everything inside the region:
   * `1.5` renders the subtree half again as large, `0.75` condenses it. The factor rides
   * `--base-scale`, so it multiplies with the root font-size the way the whole UI already
   * does, and every scale-riding token — spacing, control geometry, stroke widths, the type
   * ramp, icon glyphs, shadow geometry — follows coherently. Border radii are design
   * constants and deliberately do not scale (they do not follow the global knob either).
   *
   * The value is ABSOLUTE, not relative: a nested ScaleRegion replaces the ambient factor
   * with its own (a nested region without `scale` resets its subtree to 1). Fractional
   * steps work; hairline borders at fractional device sizes are snapped by the browser as
   * usual.
   *
   * @default 1
   */
  scale?: number;
};
