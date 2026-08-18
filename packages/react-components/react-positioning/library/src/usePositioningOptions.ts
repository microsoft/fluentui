'use client';

import type { Middleware, Placement, Strategy } from '@floating-ui/dom';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import type { PositioningConfigurationFn, PositioningConfigurationFnOptions, PositioningOptions } from './types';
import { usePositioningConfiguration } from './PositioningConfigurationContext';
import { resolvePositioningOptions } from './resolvePositioningOptions';

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
    unstable_disableShift,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_disableTether,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_flipFallbackStrategy,
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
          unstable_disableShift,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          unstable_disableTether,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          unstable_flipFallbackStrategy,
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
      unstable_disableShift,
      unstable_flipFallbackStrategy,
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

  const configFn = usePositioningConfigFn(usePositioningConfiguration(), options);
  const {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionFixed,
  } = options;

  return React.useCallback(
    (container: HTMLElement, arrow: HTMLElement | null) => {
      const optionsAfterEnhancement = configFn(container, arrow);
      return resolvePositioningOptions({
        container,
        arrow,
        dir,
        targetDocument,
        positionFixed,
        ...optionsAfterEnhancement,
      });
    },
    [configFn, dir, targetDocument, positionFixed],
  );
}
