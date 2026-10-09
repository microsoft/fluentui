import type { Middleware } from '../floating';

export function coverTarget(): Middleware {
  return {
    name: 'coverTarget',
    fn: ({ placement, rects: { reference }, x, y }) => {
      const side = placement.split('-')[0];

      return {
        x: x + (side === 'left' ? reference.width : side === 'right' ? -reference.width : 0),
        y: y + (side === 'top' ? reference.height : side === 'bottom' ? -reference.height : 0),
      };
    },
  };
}
