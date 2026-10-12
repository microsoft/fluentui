'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type {
  SwatchPickerRowBaseProps,
  SwatchPickerRowBaseState,
  SwatchPickerRowProps,
  SwatchPickerRowState,
} from './SwatchPickerRow.types';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';

/**
 * Create the base state required to render unstyled SwatchPickerRow.
 *
 * The returned state can be modified with hooks before being passed to renderSwatchPickerRow_unstable.
 *
 * @param props - props from this instance of SwatchPickerRow
 * @param ref - reference to root HTMLDivElement of SwatchPickerRow
 */
export const useSwatchPickerRowBase_unstable = (
  props: SwatchPickerRowBaseProps,
  ref: React.Ref<HTMLDivElement>,
): SwatchPickerRowBaseState => {
  const { style, ...rest } = props;

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
  };
};

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
  const baseState = useSwatchPickerRowBase_unstable(props, ref);

  return {
    ...baseState,
    spacing,
  };
};
