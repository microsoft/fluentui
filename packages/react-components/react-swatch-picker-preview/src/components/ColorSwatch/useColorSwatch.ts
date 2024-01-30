import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { useColorSwatchState_unstable } from './useColorSwatchState';
import { useFocusWithin } from '@fluentui/react-tabster';
import { Color, ColorPickerContext } from '../../contexts/picker';

/**
 * Create the state required to render ColorSwatch.
 *
 * The returned state can be modified with hooks such as useColorSwatchStyles_unstable,
 * before being passed to renderColorSwatch_unstable.
 *
 * @param props - props from this instance of ColorSwatch
 * @param ref - reference to root HTMLDivElement of ColorSwatch
 */
export const useColorSwatch_unstable = <T extends Color>(
  props: ColorSwatchProps<T>,
  pickerCtx: ColorPickerContext<T>,
  ref: React.Ref<HTMLButtonElement>,
): ColorSwatchState => {
  const { selected = false, icon } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });
  const state: ColorSwatchState = {
    components: {
      root: 'button',
      icon: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        ...props,
        role: props.role ?? 'gridcell',
        tabIndex: 0,
        // 'aria-selected': selected,
        onClick: () => {
          pickerCtx.notifySelected(props);
        },
        onMouseOver: () => {
          pickerCtx.notifyPreview(props, true);
        },
        onMouseOut: () => {
          pickerCtx.notifyPreview(props, false);
        },
      }),
      { elementType: 'button' },
    ),
    icon: iconShorthand,
  };

  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLButtonElement>());
  state.selected = props.selected;

  useColorSwatchState_unstable(state, props);
  return state;
};
