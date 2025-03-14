import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback } from '@fluentui/react-utilities';
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
  const { color, onColorChange, shape, ...rest } = props;

  const requestChange: ColorPickerState['requestChange'] = useEventCallback((event, data) => {
    onColorChange?.(event, {
      type: 'change',
      event,
      color: data.color,
    });
  });

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...rest,
      }),
      { elementType: 'div' },
    ),
    color,
    requestChange,
    shape,
  };
};
