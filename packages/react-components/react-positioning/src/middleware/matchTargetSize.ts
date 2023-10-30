import type { Middleware } from '@floating-ui/dom';

export function matchTargetSize(): Middleware {
  return {
    name: 'matchTargetSize',
    fn: async middlewareArguments => {
      const {
        rects: { reference: referenceRect, floating: floatingRect },
        elements: { floating: floatingElement },
        middlewareData: { matchTargetSizeAttempt = 0 },
      } = middlewareArguments;

      if (referenceRect.width === floatingRect.width || matchTargetSizeAttempt > 2) {
        if (matchTargetSizeAttempt > 2 && process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error(
            '@fluentui/react-positioning: matchTargetSize middleware could be running in a loop. Please report this error',
          );
        }
        return {};
      }

      const { width } = referenceRect;
      floatingElement.style.width = `${width}px`;
      floatingElement.style.boxSizing = 'border-box';

      return {
        data: { matchTargetSizeAttempt: matchTargetSizeAttempt + 1 },
        reset: {
          rects: true,
        },
      };
    },
  };
}
