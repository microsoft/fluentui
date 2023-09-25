import { flip as baseFlip, Placement } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getBoundary, resolvePositioningShorthand, toFloatingUIPlacement } from '../utils/index';

export interface FlipMiddlewareOptions extends Pick<PositioningOptions, 'flipBoundary' | 'fallbackPositions'> {
  hasScrollableElement?: boolean;
  container: HTMLElement | null;
  isRtl?: boolean;
}

export function flip(options: FlipMiddlewareOptions) {
  const { hasScrollableElement, flipBoundary, container, fallbackPositions = [], isRtl } = options;

  const fallbackPlacements = fallbackPositions.reduce<Placement[]>((acc, shorthand) => {
    const { position, align } = resolvePositioningShorthand(shorthand);
    const placement = toFloatingUIPlacement(align, position, isRtl);
    if (placement) {
      acc.push(placement);
    }
    return acc;
  }, []);

  return baseFlip({
    ...(hasScrollableElement && { boundary: 'clippingAncestors' }),
    ...(flipBoundary && { altBoundary: true, boundary: getBoundary(container, flipBoundary) }),
    fallbackStrategy: 'bestFit',
    ...(fallbackPlacements.length && { fallbackPlacements }),
  });
}
