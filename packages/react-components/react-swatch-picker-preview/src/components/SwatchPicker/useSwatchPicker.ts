import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

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
  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    // axis: layout === 'row' ? 'both' : 'grid-linear',
    axis: 'grid-linear',
    memorizeCurrent: true,
  });
  return {
    components: {
      root: 'div',
      row: 'div',
      swatch: 'button',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...focusAttributes,
        ...props,
        role: 'grid',
      }),
      { elementType: 'div' },
    ),
    row: {
      role: 'row',
    },
    swatch: {
      role: 'gridcell',
      tabIndex: 0,
      'aria-selected': false,
    },
  };
};
