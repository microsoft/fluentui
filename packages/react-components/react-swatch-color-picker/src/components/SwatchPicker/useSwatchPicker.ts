import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';
import { RadioGroup, useRadioGroup_unstable } from '@fluentui/react-components';

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
  const { layout = 'row', size = 'medium', shape = 'square', ...rest } = props;
  return {
    // TODO add appropriate props/defaults
    // components: {
    //   // TODO add each slot's element type or component
    //   root: RadioGroup,
    // },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    // root: slot.always(
    //   getNativeElementProps('div', {
    //     ref,
    //     ...props,
    //   }),
    //   { elementType: 'div' },
    // ),
    // root: getNativeElementProps('div', {
    //   ref,
    //   ...props,
    // }),
    ...useRadioGroup_unstable(
      {
        ...rest,
      },
      ref,
    ),
    layout,
    size,
    shape,
  };
};
