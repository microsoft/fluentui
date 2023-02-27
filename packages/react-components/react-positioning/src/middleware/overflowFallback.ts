import { detectOverflow, Middleware } from '@floating-ui/dom';
import { PositioningProps, PositioningShorthandValue } from '../types';
import { getBoundary } from '../utils/getBoundary';
import { resolvePositioningShorthand } from '../utils/resolvePositioningShorthand';
import { toFloatingUIPlacement } from '../utils/toFloatingUIPlacement';

export interface OverflowFallbackOptions extends Pick<PositioningProps, 'overflowBoundary'> {
  container: HTMLElement | null;
  positioning: PositioningShorthandValue;
  isRtl: boolean;
}

export function overflowFallback(options: OverflowFallbackOptions): Middleware {
  const { overflowBoundary, container, positioning, isRtl } = options;
  const boundary = getBoundary(container, overflowBoundary ?? undefined);
  const { position, align } = resolvePositioningShorthand(positioning);
  const placement = toFloatingUIPlacement(align, position, isRtl);

  return {
    name: 'overflowFallback',
    fn: async middlewareArguments => {
      const overflow = await detectOverflow(middlewareArguments, { boundary });
      const isOverflowing = Object.values(overflow).some(side => side > 0);

      if (!isOverflowing) {
        return {};
      }

      return {
        reset: {
          placement,
        },
      };
    },
  };
}
