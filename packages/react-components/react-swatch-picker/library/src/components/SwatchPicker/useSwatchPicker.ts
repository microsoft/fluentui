'use client';

import type * as React from 'react';

import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, useControllableState, useEventCallback, slot } from '@fluentui/react-utilities';

import type {
  SwatchPickerBaseProps,
  SwatchPickerBaseState,
  SwatchPickerProps,
  SwatchPickerState,
} from './SwatchPicker.types';

/**
 * Create the base state required to render unstyled SwatchPicker.
 *
 * The returned state can be modified with hooks before being passed to renderSwatchPicker_unstable.
 *
 * @param props - props from this instance of SwatchPicker
 * @param ref - reference to root HTMLElement of SwatchPicker
 */
export const useSwatchPickerBase_unstable = (
  props: SwatchPickerBaseProps,
  ref: React.Ref<HTMLDivElement>,
): SwatchPickerBaseState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props);

  const { layout, onSelectionChange, style, ...rest } = props;

  const isGrid = layout === 'grid';

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
        ...rest,
      }),
      { elementType: 'div' },
    ),
    isGrid,
    requestSelectionChange,
    selectedValue,
  };
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
  const { focusMode = 'arrow', size = 'medium', shape, spacing = 'medium', ...rest } = props;

  const baseState = useSwatchPickerBase_unstable(rest, ref);

  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: baseState.isGrid ? 'grid-linear' : 'both',
    memorizeCurrent: true,
  });

  return {
    ...baseState,
    root: {
      ...baseState.root,
      ...(focusMode === 'arrow' ? focusAttributes : {}),
    },
    size,
    shape,
    spacing,
  };
};
