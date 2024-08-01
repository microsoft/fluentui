import * as React from 'react';
import { getIntrinsicElementProps, slot, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { ColorPickerProps, ColorPickerState } from './ColorPicker.types';
import { tinycolor } from '@ctrl/tinycolor';

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
  const { defaultColor, color, onChange, ...rest } = props;
  const hslColor = tinycolor(color).toHsl();

  const [selectedValue, setSelectedValue] = useControllableState({
    state: hslColor.h,
    initialState: 0,
  });

  const [channel, setSelectedChannel] = useControllableState({
    state: 'hue',
    initialState: '',
  });

  const [selectedColor, setSelectedColor] = React.useState(color);

  const requestChange: ColorPickerState['requestChange'] = useEventCallback((event, data) => {
    onChange?.(event, {
      type: 'change',
      event,
      value: data.value,
      channel: data.channel,
    });

    setSelectedValue(data.value);
    setSelectedChannel(data.channel);

    const newColor = tinycolor({ h: data.value, s: hslColor.s, l: hslColor.l }).toHex();
    setSelectedColor(newColor);
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
    color: selectedColor,
    requestChange,
    onChange,
    channel,
    value: selectedValue,
  };
};
