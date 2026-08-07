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
import type {
  PositioningConfigurationFn,
  PositioningConfigurationFnOptions,
  PositioningFlipFallbackStrategy_unstable,
  PositioningOptions,
} from './types';
import { toFloatingUIPlacement, hasScrollParent, normalizeAutoSize } from './utils';
import { devtoolsCallback } from './utils/devtools';

const defaultPositioningConfiguration: PositioningConfigurationFn = ({ options }) => options;

type ResolvePositioningOptionsInput = PositioningConfigurationFnOptions & {
  container: HTMLElement;
  arrow: HTMLElement | null;
  targetDocument?: Document;
  isRtl: boolean;
  positioningConfiguration?: PositioningConfigurationFn;
  positionFixed?: PositioningOptions['positionFixed'];
  unstable_disableShift?: boolean;
  unstable_flipFallbackStrategy?: PositioningFlipFallbackStrategy_unstable;
};

export type ResolvedPositioningOptions = {
  placement: Placement | undefined;
  middleware: Middleware[];
  strategy: Strategy;
  disableUpdateOnResize?: boolean;
  useTransform?: boolean;
};

export function resolvePositioningOptions(input: ResolvePositioningOptionsInput): ResolvedPositioningOptions {
  const {
    container,
    arrow,
    targetDocument,
    isRtl,
    positioningConfiguration = defaultPositioningConfiguration,
    positionFixed,
    unstable_disableShift = false,
    unstable_flipFallbackStrategy = 'bestFit',
    ...options
  } = input;

  const hasScrollableElement = hasScrollParent(container);
  const optionsAfterEnhancement = positioningConfiguration({ container, arrow, options });
  const {
    autoSize,
    disableUpdateOnResize,
    matchTargetSize,
    offset,
    coverTarget,
    flipBoundary,
    overflowBoundary,
    useTransform,
    overflowBoundaryPadding,
    pinned,
    position,
    arrowPadding,
    strategy,
    align,
    fallbackPositions,
    shiftToCoverTarget,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_disableTether,
  } = optionsAfterEnhancement;
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
        fallbackStrategy: unstable_flipFallbackStrategy,
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
      devtools(targetDocument, devtoolsCallback(optionsAfterEnhancement)),
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
