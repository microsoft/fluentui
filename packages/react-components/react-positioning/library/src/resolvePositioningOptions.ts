'use client';

import { devtools } from '@floating-ui/devtools';
import { hide as hideMiddleware, arrow as arrowMiddleware } from '@floating-ui/dom';
import type { Middleware, Placement, Strategy } from '@floating-ui/dom';

import {
  shift as shiftMiddleware,
  flip as flipMiddleware,
  coverTarget as coverTargetMiddleware,
  maxSize as maxSizeMiddleware,
  resetMaxSize as resetMaxSizeMiddleware,
  offset as offsetMiddleware,
  intersecting as intersectingMiddleware,
  matchTargetSize as matchTargetSizeMiddleware,
} from './middleware';
import type { PositioningConfigurationFnOptions, PositioningOptions } from './types';
import { toFloatingUIPlacement, hasScrollParent, normalizeAutoSize } from './utils';
import { devtoolsCallback } from './utils/devtools';

type ResolvePositioningOptionsInput = PositioningConfigurationFnOptions &
  Pick<PositioningOptions, 'positionFixed'> & {
    container: HTMLElement;
    arrow: HTMLElement | null;
    dir?: 'ltr' | 'rtl';
    targetDocument?: Document;
  };

/**
 * @internal
 */
export function resolvePositioningOptions(
  options: ResolvePositioningOptionsInput,
): {
  placement: Placement | undefined;
  middleware: Middleware[];
  strategy: Strategy;
  disableUpdateOnResize?: boolean;
  useTransform?: boolean;
} {
  const {
    align,
    arrow,
    arrowPadding,
    autoSize,
    container,
    coverTarget,
    dir,
    disableUpdateOnResize,
    fallbackPositions,
    flipBoundary,
    matchTargetSize,
    offset,
    overflowBoundary,
    overflowBoundaryPadding,
    pinned,
    position,
    positionFixed,
    shiftToCoverTarget,
    strategy,
    targetDocument,
    unstable_disableShift,
    unstable_disableTether,
    unstable_flipFallbackStrategy,
    useTransform,
  } = options;
  const hasScrollableElement = hasScrollParent(container);
  const isRtl = dir === 'rtl';
  const normalizedAutoSize = normalizeAutoSize(autoSize);

  const middleware = [
    normalizedAutoSize && resetMaxSizeMiddleware(normalizedAutoSize),
    matchTargetSize && matchTargetSizeMiddleware(),
    offset && offsetMiddleware(offset),
    coverTarget && coverTargetMiddleware(),
    !pinned &&
      flipMiddleware({
        container,
        flipBoundary,
        hasScrollableElement,
        isRtl,
        fallbackPositions,
        fallbackStrategy: unstable_flipFallbackStrategy ?? 'bestFit',
      }),
    !unstable_disableShift &&
      shiftMiddleware({
        container,
        hasScrollableElement,
        overflowBoundary,
        disableTether: unstable_disableTether,
        overflowBoundaryPadding,
        isRtl,
        shiftToCoverTarget,
      }),
    normalizedAutoSize &&
      maxSizeMiddleware(normalizedAutoSize, { container, overflowBoundary, overflowBoundaryPadding, isRtl }),
    intersectingMiddleware(),
    arrow && arrowMiddleware({ element: arrow, padding: arrowPadding }),
    hideMiddleware({ strategy: 'referenceHidden' }),
    hideMiddleware({ strategy: 'escaped' }),
    process.env.NODE_ENV !== 'production' &&
      targetDocument &&
      devtools(targetDocument, devtoolsCallback({ flipBoundary, overflowBoundary })),
  ].filter(Boolean) as Middleware[];

  const placement = toFloatingUIPlacement(align, position, isRtl);

  return {
    placement,
    middleware,
    strategy: strategy ?? (positionFixed ? ('fixed' as const) : ('absolute' as const)),
    disableUpdateOnResize,
    useTransform,
  };
}
