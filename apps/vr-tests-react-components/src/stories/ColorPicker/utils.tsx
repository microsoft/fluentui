import * as React from 'react';
import {
  ColorPicker,
  ColorArea,
  AlphaSlider,
  ColorSlider,
  type ColorPickerProps,
} from '@fluentui/react-color-picker-preview';

export const SampleColorPicker = (props: ColorPickerProps) => (
  <ColorPicker {...props}>
    <ColorArea />
    <ColorSlider />
    <AlphaSlider />
  </ColorPicker>
);
