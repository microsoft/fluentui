import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs, useEventCallback } from '@fluentui/react-utilities';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { SwatchPickerSelectEvent } from '../SwatchPicker/SwatchPicker.types';
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
  const { icon, disabled, color } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });

  const context = useSwatchPickerContextValue_unstable();
  const notifySelected = context.notifySelected;
  const selected = context.selectedValue === color;
  const onClick = useEventCallback((event: SwatchPickerSelectEvent) => notifySelected({ selectedValue: color }));

  const disabledIcon = slot.optional(props.disabledIcon, {
    renderByDefault: true,
    defaultProps: {
      // children: <Prohibited20Filled />,
    },
    elementType: 'span',
  });

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
        onClick,
      }),
      { elementType: 'button' },
    ),
    icon: iconShorthand,
    disabledIcon,
    disabled,
    size: context.size,
    shape: context.shape,
    selected,
  };

  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLButtonElement>());

  useColorSwatchState_unstable(state, props);
  return state;
};
