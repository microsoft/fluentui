import * as React from 'react';
import { AlphaSlider, ColorArea, ColorPicker, ColorSlider, FluentProvider } from '@fluentui/react-windmod-preview';

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
