'use client';

import { useMergedRefs } from '@fluentui/react-utilities';
import { useTagPickerBase_unstable } from '@fluentui/react-tag-picker';

import { resolvePositioningShorthand, usePositioning } from '../../positioning';
import type { PositioningShorthandValue } from '../../positioning';
import type { TagPickerProps, TagPickerState } from './TagPicker.types';

// Mirror the styled TagPicker defaults while allowing props.positioning to override the full configuration.
const fallbackPositions: PositioningShorthandValue[] = ['above', 'after', 'after-top', 'before', 'before-top'];

/**
 * Returns the state for a headless TagPicker.
 */
export const useTagPicker = (props: TagPickerProps): TagPickerState => {
  const { positioning, ...baseProps } = props;
  const { targetRef, containerRef } = usePositioning({
    position: 'below',
    align: 'start',
    offset: { crossAxis: 0, mainAxis: 2 },
    fallbackPositions,
    matchTargetSize: 'width',
    ...resolvePositioningShorthand(positioning),
  });

  const baseState = useTagPickerBase_unstable(baseProps);

  return {
    ...baseState,
    appearance: 'outline',
    inline: true,
    size: 'medium',
    // The headless positioning hook exposes callback refs, while TagPicker context currently
    // models these refs as RefObjects. Both are valid React refs for the rendered div elements.
    targetRef: targetRef as unknown as TagPickerState['targetRef'],
    popoverRef: useMergedRefs(baseState.popoverRef, containerRef) as unknown as TagPickerState['popoverRef'],
  };
};
