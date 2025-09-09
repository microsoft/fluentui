import { devtools } from '@floating-ui/devtools';
import { hide as hideMiddleware, arrow as arrowMiddleware } from '@floating-ui/dom';
import type { Middleware, Placement, Strategy } from '@floating-ui/dom';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

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
import { usePositioningConfiguration } from './PositioningConfigurationContext';

/**
 * @internal
 *
 * This is redundant and exists only to manage React dependencies properly & avoid leaking individual options to the
 * scope of `usePositioningOptions`.
 */
function usePositioningConfigFn(
  configFn: PositioningConfigurationFn,
  options: PositioningOptions,
): (container: HTMLElement, arrow: HTMLElement | null) => PositioningConfigurationFnOptions {
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

  return React.useCallback(
    (container: HTMLElement, arrow: HTMLElement | null) => {
      return configFn({
        container,
        arrow,
        options: {
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
        },
      });
    },
    [
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
      unstable_disableTether,
      configFn,
    ],
  );
}

/**
 * @internal
 */
export function usePositioningOptions(options: PositioningOptions): (
  container: HTMLElement,
  arrow: HTMLElement | null,
) => {
  placement: Placement | undefined;
  middleware: Middleware[];
  strategy: Strategy;
  disableUpdateOnResize?: boolean;
  useTransform?: boolean;
} {
  const { dir, targetDocument } = useFluent();
  const isRtl = dir === 'rtl';

  const configFn = usePositioningConfigFn(usePositioningConfiguration(), options);
  const {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionFixed,
  } = options;

  return React.useCallback(
    (container: HTMLElement, arrow: HTMLElement | null) => {
      const hasScrollableElement = hasScrollParent(container);

      const optionsAfterEnhancement = configFn(container, arrow);
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
    },
    [configFn, isRtl, targetDocument, positionFixed],
  );
}
