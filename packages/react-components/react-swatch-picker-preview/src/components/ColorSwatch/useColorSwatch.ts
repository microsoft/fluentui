import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs, useControllableState } from '@fluentui/react-utilities';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { useColorSwatchState_unstable } from './useColorSwatchState';
import { useFocusWithin } from '@fluentui/react-tabster';
import { Color, useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';

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
  ref: React.Ref<HTMLButtonElement>,
): ColorSwatchState => {
  const { icon, disabled } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });
  const [selected, setSelected] = useControllableState({
    state: props.selected,
    defaultState: props.defaultSelected,
    initialState: false,
  });
  const disabledIcon = slot.optional(props.disabledIcon, {
    renderByDefault: true,
    defaultProps: {
      // children: <Prohibited20Filled />,
    },
    elementType: 'span',
  });
  const pickerContext = useSwatchPickerContextValue_unstable();
  const selectedColor = pickerContext.selectedColor;

  const state: ColorSwatchState = {
    components: {
      root: 'button',
      icon: 'span',
      disabledIcon: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        ...props,
        role: props.role ?? 'radio',
        tabIndex: 0,
        'aria-selected': selected,
        onClick: () => {
          pickerContext.notifySelected(props);
          !selected && setSelected(true);
        },
        onMouseOver: () => {
          pickerContext.notifyPreview(props, true);
        },
        onMouseOut: () => {
          pickerContext.notifyPreview(props, false);
        },
      }),
      { elementType: 'button' },
    ),
    icon: iconShorthand,
    disabledIcon,
    disabled,
    size: pickerContext.size,
    shape: pickerContext.shape,
  };

  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLButtonElement>());
  state.selected = selected;

  if (selected && selectedColor !== props.hex) {
    setSelected(false);
  }

  useColorSwatchState_unstable(state, props);
  return state;
};
