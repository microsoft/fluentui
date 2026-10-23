import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  ColorSwatch,
  EmptySwatch,
  ImageSwatch,
  SwatchPicker,
  SwatchPickerRow,
} from '@fluentui/react-windmod-preview/swatch-picker';

import { SwatchPickerVrScene } from './SwatchPickerVrScene';

export const SwatchPickerWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SwatchPickerVrScene
      SwatchPicker={SwatchPicker}
      SwatchPickerRow={SwatchPickerRow}
      ColorSwatch={ColorSwatch}
      ImageSwatch={ImageSwatch}
      EmptySwatch={EmptySwatch}
    />
  </FluentProvider>
);
