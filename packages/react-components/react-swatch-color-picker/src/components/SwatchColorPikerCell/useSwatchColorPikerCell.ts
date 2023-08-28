import * as React from 'react';
import type { SwatchColorPikerCellProps, SwatchColorPikerCellState } from './SwatchColorPikerCell.types';
import { Radio, useRadio_unstable } from '@fluentui/react-components';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useSwatchPickerContext_unstable } from '../SwatchPicker/SwatchPickerContext';

/**
 * Create the state required to render BreadcrumbButton.
 *
 * The returned state can be modified with hooks such as useBreadcrumbButtonStyles_unstable,
 * before being passed to renderBreadcrumbButton_unstable.
 *
 * @param props - props from this instance of BreadcrumbButton
 * @param ref - reference to root HTMLElement of BreadcrumbButton
 */
export const useSwatchColorPikerCell_unstable = (
  props: SwatchColorPikerCellProps,
  ref: React.Ref<HTMLInputElement>,
): SwatchColorPikerCellState => {
  const { color, ...rest } = props;
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
  };
};
