'use client';

import { useMergedRefs } from '@fluentui/react-utilities';
import { useTagPickerBase_unstable } from '@fluentui/react-tag-picker';

import { resolvePositioningShorthand, usePositioning } from '../../positioning';
import type { PositioningShorthandValue } from '../../positioning';
import type { TagPickerProps, TagPickerState } from './TagPicker.types';

const fallbackPositions: PositioningShorthandValue[] = ['above', 'after', 'after-top', 'before', 'before-top'];

/**
 * Returns the state for a headless TagPicker.
 */
export const useTagPicker = (props: TagPickerProps): TagPickerState => {
  const { targetRef, containerRef } = usePositioning({
    position: 'below',
    align: 'start',
    offset: { crossAxis: 0, mainAxis: 2 },
    fallbackPositions,
    matchTargetSize: 'width',
    ...resolvePositioningShorthand(props.positioning),
  });

  const baseState = useTagPickerBase_unstable({ ...props, inline: true });

  return {
    ...baseState,
    targetRef: targetRef as unknown as TagPickerState['targetRef'],
    popoverRef: useMergedRefs(baseState.popoverRef, containerRef) as unknown as TagPickerState['popoverRef'],
  };
};
