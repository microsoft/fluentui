import * as React from 'react';
import { getIntrinsicElementProps, useControllableState, useEventCallback, slot } from '@fluentui/react-utilities';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { swatchPickerCSSVars } from './useSwatchPickerStyles.styles';

const { gridGap } = swatchPickerCSSVars;

const spacingMap = {
  small: '2px',
  medium: '4px',
};

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
  const { role, onSelectionChange, size = 'medium', shape, spacing = 'medium', ...rest } = props;

  const isGrid = React.Children.count(props.children) > 1;

  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: isGrid ? 'grid-linear' : 'both',
    memorizeCurrent: true,
  });

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
      selectedColor: data.selectedColor,
    });
    setSelectedValue(data.selectedValue);
  });

  const state: SwatchPickerState = {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: role ?? 'grid',
        ...focusAttributes,
        ...rest,
      }),
      { elementType: 'div' },
    ),
    requestSelectionChange,
    selectedValue,
    size,
    shape,
  };

  // Root props
  state.root.style = {
    [gridGap]: spacingMap[spacing],
    ...state.root.style,
  };

  return state;
};
