'use client';

import type { PositioningShorthandValue } from '@fluentui/react-positioning';
import { resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import type { ComboboxBaseProps } from './ComboboxBase.types';
import type * as React from 'react';

// Stable module-level constants prevent new object/array references on every render.
// Without these constants, new references would cause usePositioningConfigFn's useCallback
// to recreate on every render, which disposes and recreates the position manager, triggering
// autoSize middleware (resetMaxSize) that temporarily removes height constraints from the listbox
// and resets scrollTop to 0. See: https://github.com/microsoft/fluentui/issues/35731
const DEFAULT_FALLBACK_POSITIONS: PositioningShorthandValue[] = ['above', 'after', 'after-top', 'before', 'before-top'];
const DEFAULT_OFFSET = { crossAxis: 0, mainAxis: 2 } as const;

export function useComboboxPositioning(props: ComboboxBaseProps): [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-deprecated
  listboxRef: React.MutableRefObject<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-deprecated
  triggerRef: React.MutableRefObject<any>,
] {
  const { positioning } = props;

  // popper options
  const popperOptions = {
    position: 'below' as const,
    align: 'start' as const,
    offset: DEFAULT_OFFSET,
    fallbackPositions: DEFAULT_FALLBACK_POSITIONS,
    matchTargetSize: 'width' as const,
    autoSize: true,
    ...resolvePositioningShorthand(positioning),
  };

  const { targetRef, containerRef } = usePositioning(popperOptions);

  return [containerRef, targetRef];
}
