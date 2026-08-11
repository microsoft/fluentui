import type { Placement, Middleware } from '@floating-ui/dom';
import { flip as baseFlip } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getBoundary, resolvePositioningShorthand, toFloatingUIPlacement } from '../utils/index';

export interface FlipMiddlewareOptions extends Pick<PositioningOptions, 'flipBoundary' | 'fallbackPositions'> {
  hasScrollableElement?: boolean;
  container: HTMLElement | null;
  isRtl?: boolean;
  fallbackStrategy?: 'bestFit' | 'initialPlacement';
}

export function flip(options: FlipMiddlewareOptions): Middleware {
  const {
    hasScrollableElement,
    flipBoundary,
    container,
    fallbackPositions = [],
    isRtl,
    fallbackStrategy = 'bestFit',
  } = options;

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
    fallbackStrategy,
    ...(fallbackPlacements.length && { fallbackPlacements }),
  });
}
