'use client';

import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import type { PositioningOptions } from './types';
import { usePositioningConfiguration } from './PositioningConfigurationContext';
import { resolvePositioningOptions } from './resolvePositioningOptions';
import type { ResolvedPositioningOptions } from './resolvePositioningOptions';

/**
 * @internal
 */
export function usePositioningOptions(
  options: PositioningOptions,
): (container: HTMLElement, arrow: HTMLElement | null) => ResolvedPositioningOptions {
  const { dir, targetDocument } = useFluent();
  const isRtl = dir === 'rtl';
  const configFn = usePositioningConfiguration();

  // Individual options are listed as dependencies (rather than the `options` object) so that a new
  // options object with the same values does not recreate the position manager.
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
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionFixed,
  } = options;

  return React.useCallback(
    (container: HTMLElement, arrow: HTMLElement | null) =>
      resolvePositioningOptions({
        container,
        arrow,
        isRtl,
        targetDocument,
        configFn,
        options: {
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
          positionFixed,
        },
      }),
    [
      isRtl,
      targetDocument,
      configFn,
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
      unstable_disableTether,
      strategy,
      overflowBoundaryPadding,
      fallbackPositions,
      useTransform,
      matchTargetSize,
      shiftToCoverTarget,
      positionFixed,
    ],
  );
}
