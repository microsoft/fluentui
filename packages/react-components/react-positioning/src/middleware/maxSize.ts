import { size } from '@floating-ui/dom';
import type { Middleware } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getBoundary } from '../utils/getBoundary';
export interface MaxSizeMiddlewareOptions extends Pick<PositioningOptions, 'overflowBoundary'> {
  container: HTMLElement | null;
}

/**
 * AutoSizes contains many options from historic implementation.
 * Now options 'always'/'height-always'/'width-always' are obsolete.
 * This function maps them to true/'height'/'width'
 */
const normalizeAutoSize = (
  autoSize?: PositioningOptions['autoSize'],
): { applyMaxWidth: boolean; applyMaxHeight: boolean } => {
  switch (autoSize) {
    case 'always':
    case true:
      return {
        applyMaxWidth: true,
        applyMaxHeight: true,
      };

    case 'width-always':
    case 'width':
      return {
        applyMaxWidth: true,
        applyMaxHeight: false,
      };

    case 'height-always':
    case 'height':
      return {
        applyMaxWidth: false,
        applyMaxHeight: true,
      };

    default:
      return {
        applyMaxWidth: false,
        applyMaxHeight: false,
      };
  }
};

/**
 * floating-ui `size` middleware uses floating element's height/width to calculate available height/width.
 * This middleware only runs once per lifecycle, resetting styles applied by maxSize from previous lifecycle.
 * Then floating element's original size is restored and `size` middleware can calculate available height/width correctly.
 */
export const resetMaxSize = (autoSize: PositioningOptions['autoSize']): Middleware => ({
  name: 'resetMaxSize',
  fn({ middlewareData: { maxSizeAlreadyReset }, elements }) {
    if (maxSizeAlreadyReset) {
      return {};
    }

    const { applyMaxWidth, applyMaxHeight } = normalizeAutoSize(autoSize);
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

export function maxSize(autoSize: PositioningOptions['autoSize'], options: MaxSizeMiddlewareOptions): Middleware {
  const { container, overflowBoundary } = options;
  return size({
    ...(overflowBoundary && { altBoundary: true, boundary: getBoundary(container, overflowBoundary) }),
    apply({ availableHeight, availableWidth, elements, rects }) {
      const { applyMaxWidth, applyMaxHeight } = normalizeAutoSize(autoSize);

      const widthOverflow = rects.floating.width > availableWidth;
      const heightOverflow = rects.floating.height > availableHeight;

      if (applyMaxWidth) {
        elements.floating.style.setProperty('box-sizing', 'border-box');
        elements.floating.style.setProperty('max-width', `${availableWidth}px`);
        if (widthOverflow) {
          elements.floating.style.setProperty('width', `${availableWidth}px`);
          if (!elements.floating.style.overflowX) {
            elements.floating.style.setProperty('overflow-x', 'auto');
          }
        }
      }

      if (applyMaxHeight) {
        elements.floating.style.setProperty('box-sizing', 'border-box');
        elements.floating.style.setProperty('max-height', `${availableHeight}px`);
        if (heightOverflow) {
          elements.floating.style.setProperty('height', `${availableHeight}px`);
          if (!elements.floating.style.overflowY) {
            elements.floating.style.setProperty('overflow-y', 'auto');
          }
        }
      }
    },
  });
}
