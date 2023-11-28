import type { Middleware } from '@floating-ui/dom';

export function matchTargetSize(): Middleware {
  return {
    name: 'matchTargetSize',
    fn: async middlewareArguments => {
      const {
        rects: { reference: referenceRect, floating: floatingRect },
        elements: { floating: floatingElement },
        middlewareData: { matchTargetSize: { matchTargetSizeAttempt = false } = {} },
      } = middlewareArguments;

      if (referenceRect.width === floatingRect.width || matchTargetSizeAttempt) {
        return {};
      }

      const { width } = referenceRect;
      floatingElement.style.width = `${width}px`;
      floatingElement.style.boxSizing = 'border-box';

      return {
        data: { matchTargetSizeAttempt: true },
        reset: {
          rects: true,
        },
      };
    },
  };
}
