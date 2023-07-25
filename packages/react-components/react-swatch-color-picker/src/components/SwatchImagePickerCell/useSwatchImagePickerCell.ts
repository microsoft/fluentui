import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SwatchImagePickerCellProps, SwatchImagePickerCellState } from './SwatchImagePickerCell.types';

/**
 * Create the state required to render SwatchImagePickerCell.
 *
 * The returned state can be modified with hooks such as useSwatchImagePickerCellStyles_unstable,
 * before being passed to renderSwatchImagePickerCell_unstable.
 *
 * @param props - props from this instance of SwatchImagePickerCell
 * @param ref - reference to root HTMLElement of SwatchImagePickerCell
 */
export const useSwatchImagePickerCell_unstable = (
  props: SwatchImagePickerCellProps,
  ref: React.Ref<HTMLElement>,
): SwatchImagePickerCellState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
