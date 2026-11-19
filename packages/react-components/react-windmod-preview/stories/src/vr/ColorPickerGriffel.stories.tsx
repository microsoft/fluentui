import * as React from 'react';
import {
  AlphaSlider,
  ColorArea,
  ColorPicker,
  ColorSlider,
  FluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import { ColorPickerVrScene } from './ColorPickerVrScene';

export const ColorPickerGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <ColorPickerVrScene
      AlphaSlider={AlphaSlider}
      ColorArea={ColorArea}
      ColorPicker={ColorPicker}
      ColorSlider={ColorSlider}
      Provider={FluentProvider}
    />
  </FluentProvider>
);
