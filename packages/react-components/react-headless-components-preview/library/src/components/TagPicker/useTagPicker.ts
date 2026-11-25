'use client';

import { useMergedRefs } from '@fluentui/react-utilities';
import { useTagPickerBase_unstable } from '@fluentui/react-tag-picker';

import { resolvePositioningShorthand, usePositioning } from '../../positioning';
import type { TagPickerProps, TagPickerState } from './TagPicker.types';

/**
 * Returns the state for a headless TagPicker.
 */
export const useTagPicker = (props: TagPickerProps): TagPickerState => {
  const { positioning, ...baseProps } = props;
  const { targetRef, containerRef } = usePositioning(resolvePositioningShorthand(positioning));

  const baseState = useTagPickerBase_unstable(baseProps);
  const popoverRef = useMergedRefs<HTMLDivElement>(baseState.popoverRef, containerRef);

  return {
    ...baseState,
    // Required by the shared styled TagPicker state/context contract. Headless base hooks do not
    // consume these presentation values; inline is behavioral and keeps the popover in DOM order.
    appearance: 'outline',
    inline: true,
    size: 'medium',
    targetRef: targetRef as unknown as TagPickerState['targetRef'],
    popoverRef,
  };
};
