'use client';

import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';
import type { PositioningOptions, PositioningPlacement } from './types';
import { toFloatingUIPlacement } from './utils';
import { usePositioningConfiguration } from './PositioningConfigurationContext';

/**
 * Options passed to the configuration function. Callbacks and refs are intentionally absent so that
 * rerenders that only change them do not recreate the position manager.
 */
const OPTION_KEYS = (
  'align arrowPadding autoSize coverTarget disableUpdateOnResize fallbackPositions flipBoundary matchTargetSize ' +
  'offset overflowBoundary overflowBoundaryPadding pinned position shiftToCoverTarget strategy unstable_disableTether ' +
  'useTransform'
).split(' ') as (keyof PositioningOptions)[];

/** Keep callback/ref rerenders out of the manager lifecycle, including removed options. */
export function usePositioningOptions(options: PositioningOptions): (
  container: HTMLElement,
  arrow: HTMLElement | null,
) => {
  placement: PositioningPlacement | undefined;
  /** The positioning options resolved by the configuration context */
  options: PositioningOptions;
  strategy: 'absolute' | 'fixed';
  isRtl: boolean;
} {
  const isRtl = useFluent().dir === 'rtl';
  const configFn = usePositioningConfiguration();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { positionFixed } = options;
  const values = OPTION_KEYS.map(key => options[key]);
  return React.useCallback(
    (container: HTMLElement, arrow: HTMLElement | null) => {
      const resolved = configFn({
        container,
        arrow,
        options: Object.fromEntries(OPTION_KEYS.map((key, index) => [key, values[index]])),
      });
      return {
        placement: toFloatingUIPlacement(resolved.align, resolved.position, isRtl),
        options: resolved,
        isRtl,
        // Preserve the baseline precedence: an explicit absolute strategy also resolves to fixed.
        strategy: resolved.strategy || positionFixed ? ('fixed' as const) : ('absolute' as const),
      };
    },
    // `values` has a fixed length, so the dependencies are still the individual option values
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo
    [configFn, isRtl, positionFixed, ...values],
  );
}
