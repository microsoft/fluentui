import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ColorPickerProps, ColorPickerState } from './ColorPicker.types';

/**
 * Create the state required to render ColorPicker.
 *
 * The returned state can be modified with hooks such as useColorPickerStyles_unstable,
 * before being passed to renderColorPicker_unstable.
 *
 * @param props - props from this instance of ColorPicker
 * @param ref - reference to root HTMLDivElement of ColorPicker
 */
export const useColorPicker_unstable = (props: ColorPickerProps, ref: React.Ref<HTMLDivElement>): ColorPickerState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
