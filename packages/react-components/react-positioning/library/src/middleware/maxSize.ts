import { size } from '@floating-ui/dom';
import type { Middleware } from '@floating-ui/dom';
import type { NormalizedAutoSize, PositioningOptions } from '../types';
import { getBoundary } from '../utils/getBoundary';
import { toFloatingUIPadding } from '../utils';
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
    if (applyMaxWidth) {
      elements.floating.style.removeProperty('box-sizing');
      elements.floating.style.removeProperty('max-width');
      elements.floating.style.removeProperty('width');
    }
    if (applyMaxHeight) {
      elements.floating.style.removeProperty('box-sizing');
      elements.floating.style.removeProperty('max-height');
      elements.floating.style.removeProperty('height');
    }

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
      const applyMaxSizeStyles = (apply: boolean, dimension: 'width' | 'height', availableSize: number) => {
        if (!apply) {
          return;
        }

        elements.floating.style.setProperty('box-sizing', 'border-box');
        elements.floating.style.setProperty(`max-${dimension}`, `${availableSize}px`);

        if (rects.floating[dimension] > availableSize) {
          elements.floating.style.setProperty(dimension, `${availableSize}px`);

          const axis = dimension === 'width' ? 'x' : 'y';
          if (!elements.floating.style.getPropertyValue(`overflow-${axis}`)) {
            elements.floating.style.setProperty(`overflow-${axis}`, 'auto');
          }
        }
      };

      const { applyMaxWidth, applyMaxHeight } = autoSize;
      applyMaxSizeStyles(applyMaxWidth, 'width', availableWidth);
      applyMaxSizeStyles(applyMaxHeight, 'height', availableHeight);
    },
  });
}
