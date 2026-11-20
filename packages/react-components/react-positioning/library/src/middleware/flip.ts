import type { Placement, Middleware } from '@floating-ui/dom';
import { flip as baseFlip } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getBoundary, resolvePositioningShorthand, toFloatingUIPlacement } from '../utils/index';

export interface FlipMiddlewareOptions extends Pick<PositioningOptions, 'flipBoundary' | 'fallbackPositions'> {
  container: HTMLElement | null;
  isRtl?: boolean;
}

export function flip(options: FlipMiddlewareOptions): Middleware {
  const { flipBoundary, container, fallbackPositions = [], isRtl } = options;

  const fallbackPlacements = fallbackPositions.reduce<Placement[]>((acc, shorthand) => {
    const { position, align } = resolvePositioningShorthand(shorthand);
    const placement = toFloatingUIPlacement(align, position, isRtl);
    if (placement) {
      acc.push(placement);
    }
    return acc;
  }, []);

  // Without `flipBoundary`, Floating UI's default boundary ('clippingAncestors') already accounts for scroll parents.
  return baseFlip({
    ...(flipBoundary && { altBoundary: true, boundary: getBoundary(container, flipBoundary) }),
    fallbackStrategy: 'bestFit',
    ...(fallbackPlacements.length && { fallbackPlacements }),
  });
}
