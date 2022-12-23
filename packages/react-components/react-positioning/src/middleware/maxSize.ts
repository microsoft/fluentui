import { size } from '@floating-ui/dom';
import type { Middleware } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';

export function maxSize(autoSize: PositioningOptions['autoSize']): Middleware {
  return size({
    apply({ availableHeight, availableWidth, elements, rects }) {
      const applyMaxWidth =
        autoSize === 'always' ||
        autoSize === 'width-always' ||
        (rects.floating.width > availableWidth && (autoSize === true || autoSize === 'width'));

      const applyMaxHeight =
        autoSize === 'always' ||
        autoSize === 'height-always' ||
        (rects.floating.height > availableHeight && (autoSize === true || autoSize === 'height'));

      if (applyMaxHeight) {
        Object.assign(elements.floating.style, {
          maxHeight: `${availableHeight}px`,
          boxSizing: 'border-box',
        });
      }

      if (applyMaxWidth) {
        Object.assign(elements.floating.style, {
          maxWidth: `${availableWidth}px`,
          boxSizing: 'border-box',
        });
      }
    },
  });
}
