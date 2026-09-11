import * as React from 'react';
import {
  ColorSwatch,
  EmptySwatch,
  FluentProvider,
  ImageSwatch,
  SwatchPicker,
  SwatchPickerRow,
  webLightTheme,
} from '@fluentui/react-components';

import { SwatchPickerVrScene } from './SwatchPickerVrScene';

export const SwatchPickerGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <SwatchPickerVrScene
      SwatchPicker={SwatchPicker}
      SwatchPickerRow={SwatchPickerRow}
      ColorSwatch={ColorSwatch}
      ImageSwatch={ImageSwatch}
      EmptySwatch={EmptySwatch}
    />
  </FluentProvider>
);
