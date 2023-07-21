import { size } from '@floating-ui/dom';
import type { Middleware } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getBoundary } from '../utils/getBoundary';
export interface MaxSizeMiddlewareOptions extends Pick<PositioningOptions, 'overflowBoundary'> {
  container: HTMLElement | null;
}

export function maxSize(autoSize: PositioningOptions['autoSize'], options: MaxSizeMiddlewareOptions): Middleware {
  const { container, overflowBoundary } = options;
  return size({
    ...(overflowBoundary && { altBoundary: true, boundary: getBoundary(container, overflowBoundary) }),
    apply({ availableHeight, availableWidth, elements, rects }) {
      // TODO comments
      const internalAutoSize: boolean | undefined | 'height' | 'width' =
        autoSize === 'always'
          ? true
          : autoSize === 'height-always'
          ? 'height'
          : autoSize === 'width-always'
          ? 'width'
          : autoSize;

      if (internalAutoSize) {
        elements.floating.setAttribute('data-popper-maxsize', '');
        elements.floating.style.setProperty('--maxsize-box-sizing', 'border-box');
      }

      const applyMaxWidth = internalAutoSize === true || internalAutoSize === 'width';
      const widthOverflow = rects.floating.width > availableWidth;

      const applyMaxHeight = internalAutoSize === true || internalAutoSize === 'height';
      const heightOverflow = rects.floating.height > availableHeight;

      if (applyMaxWidth) {
        elements.floating.style.setProperty('--available-max-width', `${availableWidth}px`);
      }
      if (applyMaxWidth && widthOverflow) {
        elements.floating.setAttribute('data-popper-scroll-x', '');
      }

      if (applyMaxHeight) {
        elements.floating.style.setProperty('--available-max-height', `${availableHeight}px`);
      }
      if (applyMaxHeight && heightOverflow) {
        elements.floating.setAttribute('data-popper-scroll-y', '');
      }
    },
  });
}
