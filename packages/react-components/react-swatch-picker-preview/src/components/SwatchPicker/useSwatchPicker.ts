import * as React from 'react';
import { getIntrinsicElementProps, useControllableState, useEventCallback, slot } from '@fluentui/react-utilities';
import type {
  SwatchPickerProps,
  SwatchPickerState,
  SwatchPickerModel,
  SwatchPickerSelectData,
} from './SwatchPicker.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { SwatchPickerContextValue } from '../../contexts/swatchPicker';
import { useSwatchPickerState_unstable } from './useSwatchPickerState';

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
  const { layout, role, onColorChange, selected, defaultSelected, ...rest } = props;

  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: layout === 'grid' ? 'grid-linear' : 'both',
    memorizeCurrent: true,
  });

  const [selectedSwatch, setSelectedSwatch] = useControllableState({
    state: selected,
    defaultState: defaultSelected,
    initialState: '',
  });

  const notifySelected = useEventCallback((data: SwatchPickerSelectData) => {
    // const selectedUpd = updateOpenItems(data.value, openItems, multiple, collapsible);
    onColorChange?.(data.selectedValue, { selectedValue: data.selectedValue });
    // setSelected(nextOpenItems);
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
    notifySelected,
  };

  useSwatchPickerState_unstable(state, props);

  return state;
};
