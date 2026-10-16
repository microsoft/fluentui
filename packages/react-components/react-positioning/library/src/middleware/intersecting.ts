import type { Middleware } from '../floating';
import { detectOverflow } from '../floating';

export function intersecting(): Middleware {
  return {
    name: 'intersectionObserver',
    fn: middlewareArguments => {
      const floatingRect = middlewareArguments.rects.floating;
      const altOverflow = detectOverflow(middlewareArguments, { altBoundary: true });

      const isIntersectingTop = altOverflow.top < floatingRect.height && altOverflow.top > 0;
      const isIntersectingBottom = altOverflow.bottom < floatingRect.height && altOverflow.bottom > 0;

      const isIntersecting = isIntersectingTop || isIntersectingBottom;

      return {
        data: {
          intersecting: isIntersecting,
        },
      };
    },
  };
}
