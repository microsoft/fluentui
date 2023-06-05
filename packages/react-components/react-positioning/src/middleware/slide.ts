import type { Middleware } from '@floating-ui/dom';
import { parseFloatingUIPlacement } from '../utils';
import { PositioningOptions } from '../types';

export interface SlideMiddlewareOptions extends Pick<PositioningOptions, 'useTransform'> {
  // There is no use case for cross axis (i.e. diagonal) translation yet
  // crossAxis?: number;

  /**
   * The distance the floating element slides in from on the main axis
   */
  mainAxis?: number;
}

export const positionSlideVarX = '--positioning-slide-x';
export const positionSlideVarY = '--positioning-slide-y';

/**
 * Middleware that applies CSS variables for starting position for slide animations.
 * The slide axis follow the main axis
 */
export function slide(options: SlideMiddlewareOptions): Middleware {
  const { mainAxis: mainAxisDistance = 0, useTransform = true } = options;
  return {
    name: 'slide',
    fn: middlewareArguments => {
      const { placement, x, y, elements } = middlewareArguments;
      const basePlacement = parseFloatingUIPlacement(placement).side;
      const coordinates = useTransform ? { x, y } : { x: 0, y: 0 };

      let mainAxis: 'x' | 'y' = 'x';
      switch (basePlacement) {
        case 'bottom':
        case 'top':
          mainAxis = 'y';
      }

      let multiplier = 1;
      switch (basePlacement) {
        case 'bottom':
        case 'right':
          multiplier = -1;
      }

      coordinates[mainAxis] += mainAxisDistance * multiplier;

      elements.floating.style.setProperty(positionSlideVarX, `${coordinates.x}px`);
      elements.floating.style.setProperty(positionSlideVarY, `${coordinates.y}px`);

      return {};
    },
  };
}
