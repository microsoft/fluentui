import * as React from 'react';
import {
  ColorSwatch,
  EmptySwatch,
  FluentProvider,
  ImageSwatch,
  SwatchPicker,
  SwatchPickerRow,
} from '@fluentui/react-windmod-preview';

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
