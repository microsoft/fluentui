import * as React from 'react';
import { getIntrinsicElementProps, useControllableState, useEventCallback, slot } from '@fluentui/react-utilities';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { useSwatchPickerState_unstable } from './useSwatchPickerState';
import { SwatchPickerNotifySelectedData } from '../../contexts/swatchPicker';

/**
 * Create the state required to render SwatchPicker.
 *
 * The returned state can be modified with hooks such as useSwatchPickerStyles_unstable,
 * before being passed to renderSwatchPicker_unstable.
 *
 * @param props - props from this instance of SwatchPicker
 * @param ref - reference to root HTMLElement of SwatchPicker
 */
export const useSwatchPicker_unstable = <T>(
  props: SwatchPickerProps,
  ref: React.Ref<HTMLDivElement>,
): SwatchPickerState => {
  const { defaultSelectedValue, role, onSelectionChange, selectedValue, size, shape, ...rest } = props;
  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: 'both',
    memorizeCurrent: true,
  });

  const [selectedSwatch, setSelectedSwatch] = useControllableState({
    state: selectedValue,
    defaultState: defaultSelectedValue,
    initialState: '',
  });

  const requestSelectionChange = useEventCallback((data: SwatchPickerNotifySelectedData) => {
    onSelectionChange?.(data.event, { selectedValue: data.selectedValue });
    setSelectedSwatch(data.selectedValue);
  });

  const state: SwatchPickerState = {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...rest,
        role: role ?? 'radiogroup',
        ...focusAttributes,
      }),
      { elementType: 'div' },
    ),
    requestSelectionChange,
    selectedValue: selectedSwatch,
    size,
    shape,
  };

  useSwatchPickerState_unstable(state, props);

  return state;
};
