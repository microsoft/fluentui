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
import type { PositioningConfigurationFn, PositioningConfigurationFnOptions, PositioningOptions } from './types';
import { toFloatingUIPlacement, hasScrollParent, normalizeAutoSize } from './utils';
import { devtoolsCallback } from './utils/devtools';

/**
 * @internal
 */
export type ResolvedPositioningOptions = {
  placement: Placement | undefined;
  middleware: Middleware[];
  strategy: Strategy;
  disableUpdateOnResize?: boolean;
  useTransform?: boolean;
};

/**
 * @internal
 */
export type ResolvePositioningOptionsParams = {
  container: HTMLElement;
  arrow: HTMLElement | null;
  options: PositioningOptions;
  isRtl: boolean;
  targetDocument: Document | undefined;
  configFn: PositioningConfigurationFn;
};

/**
 * Picks the options that are forwarded to a `PositioningConfigurationFn`. Options that only make sense
 * to the React layer (`enabled`, `onPositioningEnd`, `positionFixed`, `target`, `positioningRef`) are
 * intentionally left out.
 */
function toConfigurationFnOptions(options: PositioningOptions): PositioningConfigurationFnOptions {
  const {
    align,
    arrowPadding,
    autoSize,
    coverTarget,
    disableUpdateOnResize,
    flipBoundary,
    offset,
    overflowBoundary,
    pinned,
    position,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_disableTether,
    strategy,
    overflowBoundaryPadding,
    fallbackPositions,
    useTransform,
    matchTargetSize,
    shiftToCoverTarget,
  } = options;

  return {
    autoSize,
    disableUpdateOnResize,
    matchTargetSize,
    offset,
    strategy,
    coverTarget,
    flipBoundary,
    overflowBoundary,
    useTransform,
    overflowBoundaryPadding,
    pinned,
    arrowPadding,
    align,
    fallbackPositions,
    shiftToCoverTarget,
    position,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_disableTether,
  };
}

/**
 * Translates Fluent positioning options into a Floating UI placement + middleware chain.
 *
 * Pure with respect to React: it can be called from a hook (see `usePositioningOptions`) or from an
 * imperative engine (see `createFloatingUIPositioningEngine`).
 *
 * @internal
 */
export function resolvePositioningOptions(params: ResolvePositioningOptionsParams): ResolvedPositioningOptions {
  const { container, arrow, options, isRtl, targetDocument, configFn } = params;
  const {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionFixed,
  } = options;

  const hasScrollableElement = hasScrollParent(container);

  const optionsAfterEnhancement = configFn({ container, arrow, options: toConfigurationFnOptions(options) });
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
    !pinned && flipMiddleware({ container, flipBoundary, hasScrollableElement, isRtl, fallbackPositions }),
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
    strategy: strategy ?? positionFixed ? ('fixed' as const) : ('absolute' as const),

    disableUpdateOnResize,
    useTransform,
  };
}
