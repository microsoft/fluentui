import { detectOverflow } from '@floating-ui/dom';
import type { Middleware, Side } from '../floating-ui.types';
import type { FloatingUIOptions } from '../types';
import { getSide } from '../utils/getSide';

export function maxSize(autoSize: FloatingUIOptions['autoSize']): Middleware {
  return {
    name: 'maxSize',
    fn: async middlewareArguments => {
      const { placement, rects, elements, middlewareData } = middlewareArguments;
      const basePlacement = getSide(placement);

      const overflow = await detectOverflow(middlewareArguments);
      const { x, y } = middlewareData.shift || { x: 0, y: 0 };
      const { width, height } = rects.floating;

      const widthProp: Side = basePlacement === 'left' ? 'left' : 'right';
      const heightProp: Side = basePlacement === 'top' ? 'top' : 'bottom';

      const applyMaxWidth =
        autoSize === 'always' ||
        autoSize === 'width-always' ||
        (overflow[widthProp] > 0 && (autoSize === true || autoSize === 'width'));
      const applyMaxHeight =
        autoSize === 'always' ||
        autoSize === 'height-always' ||
        (overflow[heightProp] > 0 && (autoSize === true || autoSize === 'height'));

      if (applyMaxWidth) {
        elements.floating.style.maxWidth = `${width - overflow[widthProp] - x}px`;
      }
      if (applyMaxHeight) {
        elements.floating.style.maxHeight = `${height - overflow[heightProp] - y}px`;
      }

      return {};
    },
  };
}
