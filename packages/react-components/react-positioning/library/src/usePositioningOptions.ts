'use client';

import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import { resolvePositioningOptions, type ResolvedPositioningOptions } from './resolvePositioningOptions';
import type { PositioningOptions } from './types';
import { usePositioningConfiguration } from './PositioningConfigurationContext';

/**
 * @internal
 */
export function usePositioningOptions(
  options: PositioningOptions,
): (container: HTMLElement, arrow: HTMLElement | null) => ResolvedPositioningOptions {
  const { dir, targetDocument } = useFluent();
  const isRtl = dir === 'rtl';
  const positioningConfiguration = usePositioningConfiguration();
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
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionFixed,
    shiftToCoverTarget,
    strategy,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_disableTether,
    useTransform,
  } = options;

  return React.useCallback(
    (container: HTMLElement, arrow: HTMLElement | null) =>
      resolvePositioningOptions({
        align,
        arrow,
        arrowPadding,
        autoSize,
        container,
        coverTarget,
        disableUpdateOnResize,
        fallbackPositions,
        flipBoundary,
        isRtl,
        matchTargetSize,
        offset,
        overflowBoundary,
        overflowBoundaryPadding,
        pinned,
        position,
        positionFixed,
        positioningConfiguration,
        shiftToCoverTarget,
        strategy,
        targetDocument,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        unstable_disableTether,
        useTransform,
      }),
    [
      align,
      arrowPadding,
      autoSize,
      coverTarget,
      disableUpdateOnResize,
      fallbackPositions,
      flipBoundary,
      isRtl,
      matchTargetSize,
      offset,
      overflowBoundary,
      overflowBoundaryPadding,
      pinned,
      position,
      positionFixed,
      positioningConfiguration,
      shiftToCoverTarget,
      strategy,
      targetDocument,
      unstable_disableTether,
      useTransform,
    ],
  );
}
