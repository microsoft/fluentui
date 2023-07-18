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
      const applyMaxWidth = autoSize === 'always' || autoSize === 'width-always';
      const applyWidth = rects.floating.width > availableWidth && (autoSize === true || autoSize === 'width');

      const applyMaxHeight = autoSize === 'always' || autoSize === 'height-always';
      const applyHeight = rects.floating.height > availableHeight && (autoSize === true || autoSize === 'height');

      if (applyMaxWidth) {
        elements.floating.style.setProperty('--available-max-width', `${availableWidth}px`);
        elements.floating.style.setProperty('--overflow-x', 'auto');
      }
      if (applyWidth) {
        elements.floating.style.setProperty('--available-width', `${availableWidth}px`);
        elements.floating.style.setProperty('--overflow-x', 'auto');
      }

      if (applyMaxHeight) {
        elements.floating.style.setProperty('--available-max-height', `${availableHeight}px`);
        elements.floating.style.setProperty('--overflow-y', 'auto');
      }
      if (applyHeight) {
        elements.floating.style.setProperty('--available-height', `${availableHeight}px`);
        elements.floating.style.setProperty('--overflow-y', 'auto');
      }
    },
  });
}
