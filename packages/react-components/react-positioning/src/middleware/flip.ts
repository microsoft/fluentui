import { flip as baseFlip, Placement } from '@floating-ui/dom';
import type { PositioningOptions, PositioningShorthandValue } from '../types';
import { getBoundary, resolvePositioningShorthand, toFloatingUIPlacement } from '../utils/index';

export interface FlipMiddlewareOptions extends Pick<PositioningOptions, 'flipBoundary'> {
  hasScrollableElement?: boolean;
  container: HTMLElement | null;
  fallback?: PositioningShorthandValue[];
  isRtl?: boolean;
}

export function flip(options: FlipMiddlewareOptions) {
  const { hasScrollableElement, flipBoundary, container, fallback = [], isRtl } = options;
  const fallbackPlacements = fallback
    .map(shorthand => {
      const { position, align } = resolvePositioningShorthand(shorthand);
      return toFloatingUIPlacement(align, position, isRtl);
    })
    .filter(Boolean) as Placement[];

  return baseFlip({
    ...(hasScrollableElement && { boundary: 'clippingAncestors' }),
    ...(flipBoundary && { altBoundary: true, boundary: getBoundary(container, flipBoundary) }),
    fallbackStrategy: 'bestFit',
    fallbackPlacements,
  });
}
