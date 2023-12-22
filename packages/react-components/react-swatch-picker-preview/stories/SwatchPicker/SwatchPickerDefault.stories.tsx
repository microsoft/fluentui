import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, ColorSwatch } from '@fluentui/react-swatch-picker-preview';

export const Default = (props: Partial<SwatchPickerProps>) => (
  <SwatchPicker>
    <ColorSwatch color="red" />
    <ColorSwatch color="yellow" />
    <ColorSwatch color="green" />
  </SwatchPicker>
);
