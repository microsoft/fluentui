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
  const { swatch, disabled = false, id, ...rest } = props;
  const { shape, size, selectedId } = useSwatchPickerContext_unstable();
  const radio = useRadio_unstable(props, ref);

  const selected = selectedId === props.value;
  return {
    components: {
      root: 'span',
      input: 'input',
    },
    root: getNativeElementProps('input', {
      ref,
      ...rest,
    }),
    input: {
      ...radio.input,
    },
    swatch,
    shape,
    size,
    selected,
    disabled,
  };
};
