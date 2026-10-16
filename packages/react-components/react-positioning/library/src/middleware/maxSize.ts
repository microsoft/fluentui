import { size } from '../floating';
import type { Middleware } from '../floating';
import type { NormalizedAutoSize, PositioningOptions } from '../types';
import { getBoundary } from '../utils/getBoundary';
import { toFloatingUIPadding } from '../utils';
const DIMENSIONS = ['width', 'height'] as const;

export interface MaxSizeMiddlewareOptions
  extends Pick<PositioningOptions, 'overflowBoundary' | 'overflowBoundaryPadding'> {
  container: HTMLElement | null;
  isRtl: boolean;
}

/**
 * floating-ui `size` middleware uses floating element's height/width to calculate available height/width.
 * This middleware only runs once per lifecycle, resetting styles applied by maxSize from previous lifecycle.
 * Then floating element's original size is restored and `size` middleware can calculate available height/width correctly.
 */
export const resetMaxSize = (autoSize: NormalizedAutoSize): Middleware => ({
  name: 'resetMaxSize',
  fn({ middlewareData, elements }) {
    if (middlewareData.resetMaxSize?.maxSizeAlreadyReset) {
      return {};
    }

    const { applyMaxWidth, applyMaxHeight } = autoSize;
    const { style } = elements.floating;
    if (applyMaxWidth || applyMaxHeight) {
      style.removeProperty('box-sizing');
    }
    DIMENSIONS.forEach(dimension => {
      if (dimension === 'width' ? applyMaxWidth : applyMaxHeight) {
        style.removeProperty(`max-${dimension}`);
        style.removeProperty(dimension);
      }
    });

    return {
      data: { maxSizeAlreadyReset: true },
      reset: { rects: true },
    };
  },
});

export function maxSize(autoSize: NormalizedAutoSize, options: MaxSizeMiddlewareOptions): Middleware {
  const { container, overflowBoundary, overflowBoundaryPadding, isRtl } = options;
  return size({
    ...(overflowBoundaryPadding && { padding: toFloatingUIPadding(overflowBoundaryPadding, isRtl) }),
    ...(overflowBoundary && { altBoundary: true, boundary: getBoundary(container, overflowBoundary) }),
    apply({ availableHeight, availableWidth, elements, rects }) {
      const { style } = elements.floating;

      DIMENSIONS.forEach(dimension => {
        if (!(dimension === 'width' ? autoSize.applyMaxWidth : autoSize.applyMaxHeight)) {
          return;
        }

        const availableSize = dimension === 'width' ? availableWidth : availableHeight;
        style.setProperty('box-sizing', 'border-box');
        style.setProperty(`max-${dimension}`, `${availableSize}px`);

        if (rects.floating[dimension] > availableSize) {
          style.setProperty(dimension, `${availableSize}px`);

          const overflow = dimension === 'width' ? 'overflow-x' : 'overflow-y';
          if (!style.getPropertyValue(overflow)) {
            style.setProperty(overflow, 'auto');
          }
        }
      });
    },
  });
}
