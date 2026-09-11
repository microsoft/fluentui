import * as React from 'react';
import { AlphaSlider, ColorArea, ColorPicker, ColorSlider } from '@fluentui/react-windmod-preview/color-picker';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { ColorPickerVrScene } from './ColorPickerVrScene';

export const ColorPickerWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ColorPickerVrScene
      AlphaSlider={AlphaSlider}
      ColorArea={ColorArea}
      ColorPicker={ColorPicker}
      ColorSlider={ColorSlider}
      Provider={FluentProvider}
    />
  </FluentProvider>
);
