import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SwatchImagePickerCellProps, SwatchImagePickerCellState } from './SwatchImagePickerCell.types';
import { Radio, useRadio_unstable } from '@fluentui/react-components';
import { useSwatchPickerContext_unstable } from '../SwatchPicker/SwatchPickerContext';

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
  const { color, uri, ...rest } = props;
  const { shape, size } = useSwatchPickerContext_unstable();

  const radio = useRadio_unstable(props, ref);
  return {
    components: {
      // TODO add each slot's element type or component
      root: 'span',
      input: 'input',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('input', {
      ref,
      ...rest,
    }),
    input: {
      ...radio.input,
    },
    color,
    shape,
    size,
    uri,
  };
};
