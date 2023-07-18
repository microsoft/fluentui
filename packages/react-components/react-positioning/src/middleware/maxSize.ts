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
      const applyMaxWidth =
        autoSize === 'always' ||
        autoSize === 'width-always' ||
        (rects.floating.width > availableWidth && (autoSize === true || autoSize === 'width'));

      const applyMaxHeight = autoSize === 'always' || autoSize === 'height-always';

      const applyHeight = rects.floating.height > availableHeight && (autoSize === true || autoSize === 'height');

      if (applyMaxHeight) {
        Object.assign<CSSStyleDeclaration, Partial<CSSStyleDeclaration>>(elements.floating.style, {
          maxHeight: `${availableHeight}px`,
          boxSizing: 'border-box',
          overflowY: 'auto',
          overflowX: applyMaxWidth ? undefined : 'hidden',
        });
      }
      if (applyHeight) {
        Object.assign<CSSStyleDeclaration, Partial<CSSStyleDeclaration>>(elements.floating.style, {
          height: `${availableHeight}px`,
          boxSizing: 'border-box',
          overflowY: 'auto',
          overflowX: applyMaxWidth ? undefined : 'hidden',
        });
      }

      if (applyMaxWidth) {
        Object.assign<CSSStyleDeclaration, Partial<CSSStyleDeclaration>>(elements.floating.style, {
          maxWidth: `${availableWidth}px`,
          boxSizing: 'border-box',
          overflowX: 'auto',
          overflowY: applyMaxHeight || applyHeight ? undefined : 'hidden',
        });
      }
    },
  });
}
