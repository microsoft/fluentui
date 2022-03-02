import { Middleware, offset as _offset } from '@floating-ui/dom';
import { Offset } from '../types';

interface OffsetMiddewareOptions {
  value: Offset;
}

export function offset(options: OffsetMiddewareOptions): Middleware {
  const { value } = options;

  return {
    name: 'offset',
    options: value,
    fn(args) {
      const {
        rects: { floating, reference },
        placement,
      } = args;
      if (typeof value === 'number') {
        return _offset(value).fn(args);
      }

      if (typeof value === 'object' && value.crossAxis) {
        return _offset({
          mainAxis: value.mainAxis,
          crossAxis: placement.endsWith('end') ? value.crossAxis * -1 : value.crossAxis,
        }).fn(args);
      }

      if (typeof value === 'function') {
        const { mainAxis, crossAxis } = value({ floating, reference, placement });
        return _offset({
          mainAxis,
          crossAxis: placement.endsWith('end') && crossAxis ? crossAxis * -1 : crossAxis,
        }).fn(args);
      }

      // this should never happen
      return {};
    },
  };
}
