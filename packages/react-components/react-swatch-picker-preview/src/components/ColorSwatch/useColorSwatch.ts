import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs, useEventCallback } from '@fluentui/react-utilities';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { SwatchPickerOnSelectionChangeEvent } from '../SwatchPicker/SwatchPicker.types';
import { useColorSwatchState_unstable } from './useColorSwatchState';
import { useFocusWithin } from '@fluentui/react-tabster';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';

/**
 * Create the state required to render ColorSwatch.
 *
 * The returned state can be modified with hooks such as useColorSwatchStyles_unstable,
 * before being passed to renderColorSwatch_unstable.
 *
 * @param props - props from this instance of ColorSwatch
 * @param ref - reference to root HTMLDivElement of ColorSwatch
 */
export const useColorSwatch_unstable = (
  props: ColorSwatchProps,
  ref: React.Ref<HTMLButtonElement>,
): ColorSwatchState => {
  const { color, value } = props;

  const context = useSwatchPickerContextValue_unstable();
  const requestSelectionChange = context.requestSelectionChange;
  const selected = context.selectedValue === value;
  const onClick = useEventCallback((event: SwatchPickerOnSelectionChangeEvent) =>
    requestSelectionChange({ event, selectedValue: value }),
  );

  const state: ColorSwatchState = {
    components: {
      root: 'button',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        ...props,
        role: props.role ?? 'radio',
        tabIndex: 0,
        'aria-selected': selected,
        onClick,
      }),
      { elementType: 'button' },
    ),
    size: context.size,
    shape: context.shape,
    selected,
    color,
    value,
  };

  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLButtonElement>());

  useColorSwatchState_unstable(state, props);
  return state;
};
