'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback } from '@fluentui/react-utilities';
import type {
  ColorPickerBaseProps,
  ColorPickerBaseState,
  ColorPickerProps,
  ColorPickerState,
} from './ColorPicker.types';
/**
 * Create the state required to render ColorPicker.
 *
 * The returned state can be modified with hooks such as useColorPickerStyles_unstable,
 * before being passed to renderColorPicker_unstable.
 *
 * @param props - props from this instance of ColorPicker
 * @param ref - reference to root HTMLDivElement of ColorPicker
 */
export const useColorPickerBase_unstable = (
  props: ColorPickerBaseProps,
  ref: React.Ref<HTMLDivElement>,
): ColorPickerBaseState => {
  const { color, onColorChange, ...rest } = props;

  const requestChange: ColorPickerBaseState['requestChange'] = useEventCallback((event, data) => {
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
  };
};

export const useColorPicker_unstable = (props: ColorPickerProps, ref: React.Ref<HTMLDivElement>): ColorPickerState => {
  const { shape, ...baseProps } = props;

  return {
    ...useColorPickerBase_unstable(baseProps, ref),
    shape,
  };
};
