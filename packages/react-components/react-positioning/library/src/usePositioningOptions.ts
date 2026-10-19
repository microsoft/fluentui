'use client';

import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';
import type { PositioningOptions, PositioningPlacement } from './types';
import { toFloatingUIPlacement } from './utils';
import { usePositioningConfiguration } from './PositioningConfigurationContext';

/** Keep callback/ref rerenders out of the manager lifecycle, including removed options. */
export function usePositioningOptions(options: PositioningOptions): (
  container: HTMLElement,
  arrow: HTMLElement | null,
) => {
  placement: PositioningPlacement | undefined;
  positioningOptions: PositioningOptions;
  strategy: 'absolute' | 'fixed';
  isRtl: boolean;
  disableUpdateOnResize?: boolean;
  useTransform?: boolean;
} {
  const { dir } = useFluent();
  const configFn = usePositioningConfiguration();
  const {
    align,
    arrowPadding,
    autoSize,
    coverTarget,
    disableUpdateOnResize,
    fallbackPositions,
    flipBoundary,
    matchTargetSize,
    offset,
    overflowBoundary,
    overflowBoundaryPadding,
    pinned,
    position,
    shiftToCoverTarget,
    strategy,
    useTransform,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_disableTether,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionFixed,
  } = options;
  const isRtl = dir === 'rtl';
  return React.useCallback(
    (container: HTMLElement, arrow: HTMLElement | null) => {
      const resolved = configFn({
        container,
        arrow,
        options: {
          align,
          arrowPadding,
          autoSize,
          coverTarget,
          disableUpdateOnResize,
          fallbackPositions,
          flipBoundary,
          matchTargetSize,
          offset,
          overflowBoundary,
          overflowBoundaryPadding,
          pinned,
          position,
          shiftToCoverTarget,
          strategy,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          unstable_disableTether,
          useTransform,
        },
      });
      return {
        placement: toFloatingUIPlacement(resolved.align, resolved.position, isRtl),
        positioningOptions: resolved,
        isRtl,
        // Preserve the baseline precedence: an explicit absolute strategy also resolves to fixed.
        strategy: resolved.strategy ?? positionFixed ? ('fixed' as const) : ('absolute' as const),
        disableUpdateOnResize: resolved.disableUpdateOnResize,
        useTransform: resolved.useTransform,
      };
    },
    [
      configFn,
      isRtl,
      positionFixed,
      align,
      arrowPadding,
      autoSize,
      coverTarget,
      disableUpdateOnResize,
      fallbackPositions,
      flipBoundary,
      matchTargetSize,
      offset,
      overflowBoundary,
      overflowBoundaryPadding,
      pinned,
      position,
      shiftToCoverTarget,
      strategy,
      unstable_disableTether,
      useTransform,
    ],
  );
}
