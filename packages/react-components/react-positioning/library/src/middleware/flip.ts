import type { Placement, Middleware } from '@floating-ui/dom';
import { flip as baseFlip } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getBoundary, resolvePositioningShorthand, toFloatingUIPadding, toFloatingUIPlacement } from '../utils/index';

export interface FlipMiddlewareOptions
  extends Pick<PositioningOptions, 'flipBoundary' | 'flipBoundaryPadding' | 'fallbackPositions'> {
  hasScrollableElement?: boolean;
  container: HTMLElement | null;
  isRtl?: boolean;
}

export function flip(options: FlipMiddlewareOptions): Middleware {
  const { hasScrollableElement, flipBoundary, flipBoundaryPadding, container, fallbackPositions = [], isRtl } = options;

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
    ...(flipBoundaryPadding !== undefined && { padding: toFloatingUIPadding(flipBoundaryPadding, isRtl ?? false) }),
    fallbackStrategy: 'bestFit',
    ...(fallbackPlacements.length && { fallbackPlacements }),
  });
}
