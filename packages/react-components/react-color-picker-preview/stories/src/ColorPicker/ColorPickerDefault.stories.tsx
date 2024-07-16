import * as React from 'react';
import { ColorPicker, ColorPickerProps, ColorArea, ColorSlider } from '@fluentui/react-color-picker-preview';

export const Default = (props: Partial<ColorPickerProps>) => (
  <ColorPicker {...props}>
    <ColorArea />
    <ColorSlider />
  </ColorPicker>
);
