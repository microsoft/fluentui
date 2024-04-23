import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { SwatchPickerRowProps, SwatchPickerRowState } from './SwatchPickerRow.types';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';

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
  const { style, ...rest } = props;
  const spacing = useSwatchPickerContextValue_unstable(ctx => ctx.spacing);

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'row',
        ...rest,
      }),
      { elementType: 'div' },
    ),
    spacing,
  };
};
