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
  const { color, onChange, ...rest } = props;
  const hslColor = tinycolor(color).toHsl();
  const overlayColor = tinycolor(`hsl(${hslColor.h}, ${hslColor.s}, ${hslColor.l})`).toHslString();
  const hue = parseInt(hslColor.h.toFixed(), 10);
  const alpha = hslColor.a * 100;

  const [alphaValue, setAlphaValue] = React.useState(alpha);
  const [hueValue, setHueValue] = React.useState(hue);

  const requestChange: ColorPickerState['requestChange'] = useEventCallback((event, data) => {
    onChange?.(event, {
      type: 'change',
      event,
      alpha: data.alpha,
      hue: data.hue,
    });
    setAlphaValue(data.alpha);
    setHueValue(data.hue);
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
    overlayColor,
    hueValue,
    alphaValue,
  };
};
