'use client';

import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { getPartitionedNativeProps, slot, useId, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusWithin } from '@fluentui/react-tabster';
import { useRangeSliderState_unstable } from './useRangeSliderState';
import type { RangeSliderProps, RangeSliderState } from './RangeSlider.types';

/**
 * Create the state required to render RangeSlider.
 *
 * The returned state can be modified with hooks such as useRangeSliderStyles_unstable,
 * before being passed to renderRangeSlider_unstable.
 *
 * @param props - props from this instance of RangeSlider
 * @param ref - reference to root HTMLDivElement of RangeSlider
 */
export const useRangeSlider_unstable = (props: RangeSliderProps, ref: React.Ref<HTMLDivElement>): RangeSliderState => {
  // supportsLabelFor is false because RangeSlider has two <input> elements, so htmlFor cannot target both.
  // Consumers should pass aria-labelledby directly to the RangeSlider.
  props = useFieldControlProps_unstable(props, { supportsLabelFor: false });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange', 'size', 'defaultValue', 'value', 'id'],
  });

  const { disabled, vertical = false, size = 'medium', root, rail, startThumb, endThumb, startInput, endInput } = props;

  const startInputId = useId('rangeslider-start-', props.id);
  const endInputId = useId('rangeslider-end-', props.id);

  const state: RangeSliderState = {
    disabled,
    size,
    vertical,
    activeThumb: 'start',
    value: { start: 0, end: 0 },
    components: {
      root: 'div',
      rail: 'div',
      startThumb: 'div',
      endThumb: 'div',
      startInput: 'input',
      endInput: 'input',
    },
    root: slot.always(root, {
      defaultProps: { ...nativeProps.root, ref },
      elementType: 'div',
    }),
    rail: slot.always(rail, { elementType: 'div' }),
    startThumb: slot.always(startThumb, { defaultProps: { role: 'presentation' }, elementType: 'div' }),
    endThumb: slot.always(endThumb, { defaultProps: { role: 'presentation' }, elementType: 'div' }),
    startInput: slot.always(startInput, {
      defaultProps: {
        id: startInputId,
        ...nativeProps.primary,
        type: 'range',
        orient: vertical ? 'vertical' : undefined,
        'aria-orientation': vertical ? 'vertical' : 'horizontal',
      },
      elementType: 'input',
    }),
    endInput: slot.always(endInput, {
      defaultProps: {
        id: endInputId,
        ...nativeProps.primary,
        type: 'range',
        orient: vertical ? 'vertical' : undefined,
        'aria-orientation': vertical ? 'vertical' : 'horizontal',
      },
      elementType: 'input',
    }),
  };

  state.startThumb.ref = useMergedRefs(state.startThumb.ref, useFocusWithin<HTMLDivElement>());
  state.endThumb.ref = useMergedRefs(state.endThumb.ref, useFocusWithin<HTMLDivElement>());

  useRangeSliderState_unstable(state, props);

  return state;
};
