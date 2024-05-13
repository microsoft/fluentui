import * as React from 'react';
import { getIntrinsicElementProps, useControllableState, useEventCallback, slot } from '@fluentui/react-utilities';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

/**
 * Create the state required to render SwatchPicker.
 *
 * The returned state can be modified with hooks such as useSwatchPickerStyles_unstable,
 * before being passed to renderSwatchPicker_unstable.
 *
 * @param props - props from this instance of SwatchPicker
 * @param ref - reference to root HTMLElement of SwatchPicker
 */
export const useSwatchPicker_unstable = (
  props: SwatchPickerProps,
  ref: React.Ref<HTMLDivElement>,
): SwatchPickerState => {
  const { layout, onSelectionChange, size = 'medium', shape, spacing = 'medium', style, ...rest } = props;

  const isGrid = layout === 'grid';
  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: isGrid ? 'grid-linear' : 'both',
    memorizeCurrent: true,
  });

  const role = isGrid ? 'grid' : 'radiogroup';

  const [selectedValue, setSelectedValue] = useControllableState({
    state: props.selectedValue,
    defaultState: props.defaultSelectedValue,
    initialState: '',
  });

  const requestSelectionChange: SwatchPickerState['requestSelectionChange'] = useEventCallback((event, data) => {
    onSelectionChange?.(event, {
      type: 'click',
      event,
      selectedValue: data.selectedValue,
      selectedSwatch: data.selectedSwatch,
    });
    setSelectedValue(data.selectedValue);
  });

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role,
        ...focusAttributes,
        ...rest,
      }),
      { elementType: 'div' },
    ),
    isGrid,
    requestSelectionChange,
    selectedValue,
    size,
    shape,
    spacing,
  };
};
