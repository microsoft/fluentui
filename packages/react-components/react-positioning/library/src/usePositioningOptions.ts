'use client';

import type { Middleware, Placement, Strategy } from './floating';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import type { PositioningPlugin, PositioningPluginMiddleware } from './plugins/types';
import type { PositioningConfigurationFn, PositioningConfigurationFnOptions, PositioningOptions } from './types';
import { toFloatingUIPlacement } from './utils';
import { usePositioningConfiguration } from './PositioningConfigurationContext';

/**
 * This is redundant and exists only to manage React dependencies properly & avoid leaking individual options to the
 * scope of `usePositioningOptions`.
 *
 * @internal
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
export function usePositioningOptions(
  options: PositioningOptions,
  plugins: readonly PositioningPlugin[],
): (
  container: HTMLElement,
  arrow: HTMLElement | null,
) => {
  placement: Placement | undefined;
  middleware: Middleware[];
  strategy: Strategy;
  disableUpdateOnResize?: boolean;
  useTransform?: boolean;
} {
  const { dir } = useFluent();
  const isRtl = dir === 'rtl';

  const configFn = usePositioningConfigFn(usePositioningConfiguration(), options);
  const {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionFixed,
  } = options;

  return React.useCallback(
    (container: HTMLElement, arrow: HTMLElement | null) => {
      const optionsAfterEnhancement = configFn(container, arrow);
      const { align, position, strategy, disableUpdateOnResize, useTransform } = optionsAfterEnhancement;

      const entries: PositioningPluginMiddleware[] = [];
      plugins.forEach(plugin => {
        const created = plugin({ container, arrow, options: optionsAfterEnhancement, isRtl });
        if (created) {
          entries.push(...(Array.isArray(created) ? created : [created]));
        }
      });
      const middleware = entries.sort((a, b) => a.order - b.order).map(entry => entry.middleware);

      const placement = toFloatingUIPlacement(align, position, isRtl);

      return {
        placement,
        middleware,
        strategy: strategy ?? positionFixed ? ('fixed' as const) : ('absolute' as const),

        disableUpdateOnResize,
        useTransform,
      };
    },
    [configFn, isRtl, positionFixed, plugins],
  );
}
