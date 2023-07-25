import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, SwatchRow, SwatchColorPikerCell } from '@fluentui/react-swatch-color-picker';

export const Default = (props: Partial<SwatchPickerProps>) => (
  <SwatchPicker>
    <SwatchRow>
      <SwatchColorPikerCell color="red" />
    </SwatchRow>
  </SwatchPicker>
);
