import { detectOverflow, Middleware } from '@floating-ui/core';

export function intersectionObserver(): Middleware {
  return {
    name: 'intersectionObserver',
    fn: async middlewareArguments => {
      const floatingRect = middlewareArguments.rects.floating;
      const altOverflow = await detectOverflow(middlewareArguments, { altBoundary: true });

      const isIntersectingTop = altOverflow.top < floatingRect.height && altOverflow.top > 0;
      const isIntersectingBottom = altOverflow.bottom < floatingRect.height && altOverflow.bottom > 0;

      const intersecting = isIntersectingTop || isIntersectingBottom;

      return {
        data: {
          intersecting,
        },
      };
    },
  };
}
