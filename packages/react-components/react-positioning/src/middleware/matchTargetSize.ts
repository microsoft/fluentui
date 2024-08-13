import type { Middleware } from '@floating-ui/dom';

export const matchTargetSizeCssVar = '--fui-match-target-size';

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
      floatingElement.style.setProperty(matchTargetSizeCssVar, `${width}px`);
      if (!floatingElement.style.width) {
        floatingElement.style.width = `var(${matchTargetSizeCssVar})`;
      }

      return {
        data: { matchTargetSizeAttempt: true },
        reset: {
          rects: true,
        },
      };
    },
  };
}
