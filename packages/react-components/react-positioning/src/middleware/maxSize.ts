import { size } from '@floating-ui/dom';
import type { Middleware } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getBoundary } from '../utils/getBoundary';
export interface MaxSizeMiddlewareOptions extends Pick<PositioningOptions, 'overflowBoundary'> {
  container: HTMLElement | null;
}

type SimplifiedAutoSize = boolean | 'height' | 'width';
/**
 * AutoSizes contains many options from historic implementation.
 * Now options 'always'/'height-always'/'width-always' are obsolete.
 * This function maps them to true/'height'/'width'
 */
const getSimplifiedAutoSize = (autoSize?: PositioningOptions['autoSize']): SimplifiedAutoSize | undefined =>
  autoSize === 'always'
    ? true
    : autoSize === 'height-always'
    ? 'height'
    : autoSize === 'width-always'
    ? 'width'
    : autoSize;

export function maxSize(autoSize: PositioningOptions['autoSize'], options: MaxSizeMiddlewareOptions): Middleware {
  const { container, overflowBoundary } = options;
  return size({
    ...(overflowBoundary && { altBoundary: true, boundary: getBoundary(container, overflowBoundary) }),
    apply: async ({ availableHeight, availableWidth, elements, rects, platform }) => {
      // reset maxsize from previous life cycle
      if (elements.floating.hasAttribute('data-popper-maxsize')) {
        const { width, height } = rects.floating;
        elements.floating.removeAttribute('data-popper-maxsize');
        const nextDimensions = await platform.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          elements.floating.removeAttribute('data-popper-scroll-x');
          elements.floating.removeAttribute('data-popper-scroll-y');
          return;
        }
      }

      const simplifiedAutoSize = getSimplifiedAutoSize(autoSize);
      if (simplifiedAutoSize) {
        elements.floating.setAttribute('data-popper-maxsize', '');
        elements.floating.style.setProperty('--maxsize-box-sizing', 'border-box');
      }

      const applyMaxWidth = simplifiedAutoSize === true || simplifiedAutoSize === 'width';
      const widthOverflow = rects.floating.width > availableWidth;

      const applyMaxHeight = simplifiedAutoSize === true || simplifiedAutoSize === 'height';
      const heightOverflow = rects.floating.height > availableHeight;

      if (applyMaxWidth) {
        elements.floating.style.setProperty('--available-max-width', `${availableWidth}px`);
        if (widthOverflow) {
          elements.floating.setAttribute('data-popper-scroll-x', '');
        }
      }

      if (applyMaxHeight) {
        elements.floating.style.setProperty('--available-max-height', `${availableHeight}px`);
        if (heightOverflow) {
          elements.floating.setAttribute('data-popper-scroll-y', '');
        }
      }
    },
  });
}
