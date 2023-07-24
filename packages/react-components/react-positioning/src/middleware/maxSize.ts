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
      const widthOverflow = rects.floating.width > availableWidth && (autoSize === true || autoSize === 'width');

      const applyMaxHeight = autoSize === 'always' || autoSize === 'height-always';
      const heightOverflow = rects.floating.height > availableHeight && (autoSize === true || autoSize === 'height');

      if (applyMaxHeight || heightOverflow) {
        Object.assign<CSSStyleDeclaration, Partial<CSSStyleDeclaration>>(elements.floating.style, {
          maxHeight: `${availableHeight}px`,
          boxSizing: 'border-box',
        });
      }
      if (heightOverflow) {
        elements.floating.style.setProperty('height', `${availableHeight}px`);
        elements.floating.style.setProperty('overflow-y', 'auto');
      }

      if (applyMaxWidth || widthOverflow) {
        Object.assign<CSSStyleDeclaration, Partial<CSSStyleDeclaration>>(elements.floating.style, {
          maxWidth: `${availableWidth}px`,
          boxSizing: 'border-box',
        });
      }
      if (widthOverflow) {
        elements.floating.style.setProperty('width', `${availableWidth}px`);
        elements.floating.style.setProperty('overflow-x', 'auto');
      }
    },
  });
}
