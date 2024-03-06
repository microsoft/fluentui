import * as React from 'react';
import { slot, useEventCallback, getIntrinsicElementProps } from '@fluentui/react-utilities';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';
import { swatchCSSVars } from './useColorSwatchStyles.styles';

/**
 * Create the state required to render ColorSwatch.
 *
 * The returned state can be modified with hooks such as useColorSwatchStyles_unstable,
 * before being passed to renderColorSwatch_unstable.
 *
 * @param props - props from this instance of ColorSwatch
 * @param ref - reference to root HTMLButtonElement of ColorSwatch
 */
export const useColorSwatch_unstable = (
  props: ColorSwatchProps,
  ref: React.Ref<HTMLButtonElement>,
): ColorSwatchState => {
  const { color, value, ...rest } = props;
  const size = useSwatchPickerContextValue_unstable(ctx => ctx.size);
  const shape = useSwatchPickerContextValue_unstable(ctx => ctx.shape);
  const isGrid = useSwatchPickerContextValue_unstable(ctx => ctx.grid);

  const requestSelectionChange = useSwatchPickerContextValue_unstable(ctx => ctx.requestSelectionChange);
  const selected = useSwatchPickerContextValue_unstable(ctx => ctx.selectedValue === value);

  const onClick = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) =>
    requestSelectionChange(event, {
      selectedValue: value,
      selectedColor: color,
    }),
  );

  const rootVariables = {
    [swatchCSSVars.color]: color,
  };

  const role = isGrid ? 'gridcell' : 'radio';

  const state: ColorSwatchState = {
    components: {
      root: 'button',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        role,
        'aria-selected': selected,
        onClick,
        type: 'button',
        ...rest,
      }),
      { elementType: 'button' },
    ),
    size,
    shape,
    selected,
    color,
    value,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return state;
};
