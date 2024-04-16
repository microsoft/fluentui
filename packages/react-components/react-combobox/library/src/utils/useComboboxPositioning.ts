import { PositioningShorthandValue, resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import type { ComboboxBaseProps } from './ComboboxBase.types';
import * as React from 'react';

export function useComboboxPositioning(props: ComboboxBaseProps): [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listboxRef: React.MutableRefObject<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  triggerRef: React.MutableRefObject<any>,
] {
  const { positioning } = props;

  // Set a default set of fallback positions to try if the dropdown does not fit on screen
  const fallbackPositions: PositioningShorthandValue[] = ['above', 'after', 'after-top', 'before', 'before-top'];

  // popper options
  const popperOptions = {
    position: 'below' as const,
    align: 'start' as const,
    offset: { crossAxis: 0, mainAxis: 2 },
    fallbackPositions,
    matchTargetSize: 'width' as const,
    ...resolvePositioningShorthand(positioning),
  };

  const { targetRef, containerRef } = usePositioning(popperOptions);

  return [containerRef, targetRef];
}
