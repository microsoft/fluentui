import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { SwatchPickerRowProps, SwatchPickerRowState } from './SwatchPickerRow.types';
import { swatchPickerCSSVars } from './useSwatchPickerRowStyles.styles';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';
import { spacingMap } from '../SwatchPicker/useSwatchPicker';

const { rowGap } = swatchPickerCSSVars;

/**
 * Create the state required to render SwatchPickerRow.
 *
 * The returned state can be modified with hooks such as useSwatchPickerRowStyles_unstable,
 * before being passed to renderSwatchPickerRow_unstable.
 *
 * @param props - props from this instance of SwatchPickerRow
 * @param ref - reference to root HTMLDivElement of SwatchPickerRow
 */
export const useSwatchPickerRow_unstable = (
  props: SwatchPickerRowProps,
  ref: React.Ref<HTMLDivElement>,
): SwatchPickerRowState => {
  const spacing = useSwatchPickerContextValue_unstable(ctx => ctx.spacing);
  const state: SwatchPickerRowState = {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: props.role ?? 'row',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
  // Root props
  state.root.style = {
    [rowGap]: spacingMap[spacing ?? 'medium'],
    ...state.root.style,
  };

  return state;
};
